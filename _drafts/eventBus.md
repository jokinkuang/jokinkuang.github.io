GreenRobot EventBus源码分析

	List<SubscriberMethod> findSubscriberMethods(Class<?> subscriberClass) {
        List<SubscriberMethod> subscriberMethods = METHOD_CACHE.get(subscriberClass);
        if (subscriberMethods != null) {
            return subscriberMethods;
        }

        if (ignoreGeneratedIndex) {
			// 直接通过反射查找
            subscriberMethods = findUsingReflection(subscriberClass);
        } else {
			// 通过索引查找（索引查找不到就会执行反射查找，启用索引是因为反射比较耗时）
            subscriberMethods = findUsingInfo(subscriberClass);
        }
        if (subscriberMethods.isEmpty()) {
            throw new EventBusException("Subscriber " + subscriberClass
                    + " and its super classes have no public methods with the @Subscribe annotation");
        } else {
            METHOD_CACHE.put(subscriberClass, subscriberMethods);
            return subscriberMethods;
        }
    }

    private List<SubscriberMethod> findUsingReflection(Class<?> subscriberClass) {
        FindState findState = prepareFindState();
        findState.initForSubscriber(subscriberClass);
        while (findState.clazz != null) {
            findUsingReflectionInSingleClass(findState);  // 通过findState来传递数据，进行了封装，旧的版本是展开的。
            findState.moveToSuperclass();  // 遍历父类。同样，旧版本是直接在这里遍历的。
        }
        return getMethodsAndRelease(findState);
    }

	## findState结构
	    static class FindState {
        final List<SubscriberMethod> subscriberMethods = new ArrayList<>();
        final Map<Class, Object> anyMethodByEventType = new HashMap<>();
        final Map<String, Class> subscriberClassByMethodKey = new HashMap<>();
        final StringBuilder methodKeyBuilder = new StringBuilder(128);

        Class<?> subscriberClass;
        Class<?> clazz;
        boolean skipSuperClasses;	// 标记是否有父类
        SubscriberInfo subscriberInfo;
	}


	private void findUsingReflectionInSingleClass(FindState findState) {
        Method[] methods;
        try {
            // This is faster than getMethods, especially when subscribers are fat classes like Activities
			// getDeclaredMethods比getMethods要快！
            methods = findState.clazz.getDeclaredMethods();
        } catch (Throwable th) {
            // Workaround for java.lang.NoClassDefFoundError, see https://github.com/greenrobot/EventBus/issues/149
            methods = findState.clazz.getMethods();
            findState.skipSuperClasses = true;
        }
        for (Method method : methods) {
            int modifiers = method.getModifiers();
            if ((modifiers & Modifier.PUBLIC) != 0 && (modifiers & MODIFIERS_IGNORE) == 0) {
                Class<?>[] parameterTypes = method.getParameterTypes();
                if (parameterTypes.length == 1) {
                    Subscribe subscribeAnnotation = method.getAnnotation(Subscribe.class);
                    if (subscribeAnnotation != null) {
                        Class<?> eventType = parameterTypes[0];
                        if (findState.checkAdd(method, eventType)) {
                            ThreadMode threadMode = subscribeAnnotation.threadMode();
                            findState.subscriberMethods.add(new SubscriberMethod(method, eventType, threadMode,
                                    subscribeAnnotation.priority(), subscribeAnnotation.sticky()));
                        }
                    }
                } else if (strictMethodVerification && method.isAnnotationPresent(Subscribe.class)) {
                    String methodName = method.getDeclaringClass().getName() + "." + method.getName();
                    throw new EventBusException("@Subscribe method " + methodName +
                            "must have exactly 1 parameter but has " + parameterTypes.length);
                }
            } else if (strictMethodVerification && method.isAnnotationPresent(Subscribe.class)) {
                String methodName = method.getDeclaringClass().getName() + "." + method.getName();
                throw new EventBusException(methodName +
                        " is a illegal @Subscribe method: must be public, non-static, and non-abstract");
            }
        }
    }

	// 订阅对象数据结构
	final class Subscription {
		final Object subscriber;	// 对对象的引用是强引用！
		final SubscriberMethod subscriberMethod;
		/**
		 * Becomes false as soon as {@link EventBus#unregister(Object)} is called, which is checked by queued event delivery
		 * {@link EventBus#invokeSubscriber(PendingPost)} to prevent race conditions.
		 */
		volatile boolean active;	// 实际上作用仅仅是调用后就设置为false。
	}

	// POST
	private void postToSubscription(Subscription subscription, Object event, boolean isMainThread) {
        switch (subscription.subscriberMethod.threadMode) {
            case POSTING:
				// 目标是POSTING，不管当前是什么线程，都直接在当前线程执行。（默认的行为，即如果不指定）
                invokeSubscriber(subscription, event);
                break;
            case MAIN:
				// 目标是主线程，如果当前是主线程，那么立即执行；否则加入主线程队列
                if (isMainThread) {
                    invokeSubscriber(subscription, event);
                } else {
                    mainThreadPoster.enqueue(subscription, event);
                }
                break;
            case BACKGROUND:
				// 目标是Background线程，如果当前不是主线程，则会立即执行；如果是主线程，才加入队列。
                if (isMainThread) {
                    backgroundPoster.enqueue(subscription, event);
                } else {
                    invokeSubscriber(subscription, event);
                }
                break;
            case ASYNC:
				// 目标是Async线程，不管当前是什么线程，都会加入队列（其实会直接抛给线程池直接执行）
                asyncPoster.enqueue(subscription, event);
                break;
            default:
                throw new IllegalStateException("Unknown thread mode: " + subscription.subscriberMethod.threadMode);
        }
    }

注解分析：

1. 运行时注解

@Subscribe(threadMode = ThreadMode.MAIN, priority = -1, sticky = true)
public void onEventMainThreadM1(IntTestEvent event) {
    handleEvent(-1, event);
}

```java

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Subscribe {
    ThreadMode threadMode() default ThreadMode.POSTING;

    /**
     * If true, delivers the most recent sticky event (posted with
     * {@link EventBus#postSticky(Object)}) to this subscriber (if event available).
     */
    boolean sticky() default false;

    /** Subscriber priority to influence the order of event delivery.
     * Within the same delivery thread ({@link ThreadMode}), higher priority subscribers will receive events before
     * others with a lower priority. The default priority is 0. Note: the priority does *NOT* affect the order of
     * delivery among subscribers with different {@link ThreadMode}s! */
    int priority() default 0;
}

```
注解的接口，RUNTIME，所以是运行时注解。

2. 编译时注解

查看EventBus源码的时候，还会发现编译时注解的出现，就是
@SupportedAnnotationTypes("org.greenrobot.eventbus.Subscribe")
@SupportedOptions(value = {"eventBusIndex", "verbose"})
public class EventBusAnnotationProcessor extends AbstractProcessor {
  private boolean checkHasNoErrors(ExecutableElement element, Messager messager) {
        if (element.getModifiers().contains(Modifier.STATIC)) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Subscriber method must not be static", element);
            return false;
        }

        if (!element.getModifiers().contains(Modifier.PUBLIC)) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Subscriber method must be public", element);
            return false;
        }

        List<? extends VariableElement> parameters = ((ExecutableElement) element).getParameters();
        if (parameters.size() != 1) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Subscriber method must have exactly 1 parameter", element);
            return false;
        }
        return true;
    }
}

继承于AbstractProcessor的注解处理器表示编译时注解，编译时注解可以用来进行语法分析、命名规范检查、语法合法性等等分析。
EventBus的编译时注解器中可以发现，这个编译时注解主要是用来检查运行时注解的使用是否合法。
比如上面的代码，就是判断@Subscriber注解所在的方法的关键字是否合法，不合法则在编译期提示错误。

所以，EventBus的编译时注解不是用来提速，而是用来进行语法检查。

3. sticky的作用。
如果sticky表示true，则事件会保存最近的结果。开发者可以访问这个事件最近的结果。
应用场景：
1. 检查某个模块的初始化是否完毕。如果模块初始化先于事件绑定，那么一般的事件会无法感知模块是否已经初始化，如果将其声明为sticky，事件绑定的时候可以通过查看最近的值来检查模块是否初始化完毕。
2. 可以起到缓存的作用。
