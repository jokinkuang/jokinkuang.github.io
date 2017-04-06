1. 分发中心，需要一个Map，存储<事件对象，目标对象数组>：
    HashMap<Object, DestinationSortedList> mConnections = new HashMap<Object, DestinationSortedList>();

2. 目标对象包含：1.线程说明（表示用哪个线程执行）2.Target实例（方法所在的实例）3.Method（方法名或方法对象）
   目标数组：数组是有序的，根据优先级插入数组。

3. 分发中心的Map中，key是要绑定的对象，可以是数值、字符串、或者是某个实例、设置可以是某个Class。
举例：
    1. 定义 E_Login_Success 为 1
    2. 绑定 Map<E_Login_Success, List<实例对象>>
    3. 触发E_Login_Success时，分发中心通过这个key，获取到对应的目标对象数组，然后遍历目标对象。
    4. 遍历目标对象过程，因为目标对象包含了：目标自身、目标的方法、线程说明。所以直接调用目标的对应的方法，完成回调。
    5. 遍历过程可以适当加入策略，比如消息可以被优先级更高的消化过滤、优先级更高的可以修改消息等等。

4. Kvo的实现。
    1. 上面分发中心的Map，存储的是<属性字符串，目标对象数组>。
    2. 对某个属性进行设置时，先判断是否有变化，有变化后触发Key对应的目标对象数组。
    3. 接下来和上面的例子一样。
举例：
    1. 定义分发中心Map<field，目标对象数组>
    2.


### 注解的实现：

1. 定义注解类
@Retention(RetentionPolicy.RUNTIME)
public @interface FwEventAnnotation {
	String event();
	int order() default 0;
	int thread() default ThreadBus.Whatever;
}

2. 如果是方法注解，则通过Method对象的getAnnotation来获取。
public Annotation annotation(Method method){
  return method.getAnnotation(FwEventAnnotation.class);
}

3. 通常，如果为方法注解，需要遍历一个对象的所有方法，对每个方法获取注解信息，注解信息为null表示对应的方法没有注解。
Method[] methods = dst.getClass().getDeclaredMethods();
for (Method method : methods) {
	Annotation annotation = builder.annotation(method);
  // 使用build来抽象，其实就是上面的annotaion方法。调用的是Method对象的getAnnotation。
	if (annotation != null) {
		FwEventDestination destination = builder.buildDestination(dst, method, annotation);
    // 同样使用build来抽象，即将模块差异封装到builder接口里。这种设计，builder需要从参数传递进来。
    // 通常，这种方式只是用了父类来容纳子类的引用，builder内部的实例是具体的某个Builder对象！
		if (destination != null) {
			MethodNode node = new MethodNode();
			node.annotation = annotation;
			node.key = builder.key(annotation);
			node.method = method;
			methodList.add(node);
		}
	}
}
注：这里的builder提取得很棒，正如上面所说，分发中心的key是可以变化的，注解解析时也可能分别对应不同的注解类。
不变的是分发的几大要素：buildDestination(Object target, Method method, Integer thread, Integer order)。

4. 获得注解信息后，将注解中需要的信息封装到分发模块中的Map里面存储，完成注册。
   1. 比如注解中的thread、event字符串、order次序
   2. 注册时是在某个对象发起的，所以能够获取对应的实例（发起注册的实例，即后续事件回调的目标实例）。
   3. 目标实例、方法、线程等等都集齐，所以整个流程完成。
