## AsyncTask的一个例子：

```java
new AsyncTask<Integer, Integer, String>() {
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected String doInBackground(Integer... params) {
        return checkUpdateData();
    }

    @Override
    protected void onProgressUpdate(Integer... values) {
        super.onProgressUpdate(values);
    }

    @Override
    protected void onPostExecute(String string) {
        onGetUpdateData(autoCheck, string);
    }


    @Override
    protected void onCancelled(String s) {
        super.onCancelled(s);
    }

    @Override
    protected void onCancelled() {
        super.onCancelled();
    }
}.execute();
```
如果需要并行，将execute改为executeOnExecutor。

上面的Integer、Integer、String分别代表什么？

`public abstract class AsyncTask<Params, Progress, Result> `

可见，分别表示 doInBackground后台方法参数类型、onProgressUpdate方法参数类型、onPostExecute方法参数类型。

需要注意的是：AsyncTask是一个泛型类，Params、Progress、Result不是表示一个具体的对象，只是一个指向类型的变量名而已。
和`public class Container<Key, Value>`一样，使用时才确定具体的对象：new Container<String, String>("a","b");
这时候Key表示String类型、Value也表示String类型。
更深入了解可以看一下Java的泛型、泛型方法、泛型接口、泛型抽象类、泛型类。

## AsyncTask初始化
有了上面的基础，可以继续往下看。

```java
// 构造方法
public AsyncTask() {
    // private final WorkerRunnable<Params, Result> mWorker;
    mWorker = new WorkerRunnable<Params, Result>() {
        public Result call() throws Exception {
            mTaskInvoked.set(true);

            Process.setThreadPriority(Process.THREAD_PRIORITY_BACKGROUND);
            //noinspection unchecked
            return postResult(doInBackground(mParams));
        }
    };

    // private final FutureTask<Result> mFuture;
    mFuture = new FutureTask<Result>(mWorker) {
        @Override
        protected void done() {
            try {
                postResultIfNotInvoked(get());
            } catch (InterruptedException e) {
                android.util.Log.w(LOG_TAG, e);
            } catch (ExecutionException e) {
                throw new RuntimeException("An error occured while executing doInBackground()",
                        e.getCause());
            } catch (CancellationException e) {
                postResultIfNotInvoked(null);
            }
        }
    };
}
```
WorkerRunnable最终是一个Callable，配合FutureTask来进行异步调用，且返回结果。
postResult和doInBackground都是在Callable的call方法里，所以是在线程池中的线程执行的，是后台线程。

```java
private static abstract class WorkerRunnable<Params, Result> implements Callable<Result> {
    Params[] mParams;
}
```

上面执行顺序是，mWorker的call执行完毕后，会回调FutureTask的done方法，继而FutureTask可以在done方法里通过get来获取call的返回值。

```java
private void postResultIfNotInvoked(Result result) {
    final boolean wasTaskInvoked = mTaskInvoked.get();
    if (!wasTaskInvoked) {
        postResult(result);
    }
}

private Result postResult(Result result) {
    @SuppressWarnings("unchecked")
    Message message = getHandler().obtainMessage(MESSAGE_POST_RESULT,
            new AsyncTaskResult<Result>(this, result));
    message.sendToTarget();
    return result;
}
```

获取返回值后，直接调用postResultIfNotInvoked。从上面代码可以看到，postResultIfNotInvoked这个方法主要是把Result类型的结果（针对上面的例子，即String类型）通过Handler来传递到主线程。通过查看getHandler()，可以知道Handler是下面这个InternalHandler。

```java
private static class InternalHandler extends Handler {
    public InternalHandler() {
        super(Looper.getMainLooper());
    }

    @SuppressWarnings({"unchecked", "RawUseOfParameterizedType"})
    @Override
    public void handleMessage(Message msg) {
        AsyncTaskResult<?> result = (AsyncTaskResult<?>) msg.obj;
        switch (msg.what) {
            case MESSAGE_POST_RESULT:
                // There is only one result
                result.mTask.finish(result.mData[0]);
                break;
            case MESSAGE_POST_PROGRESS:
                result.mTask.onProgressUpdate(result.mData);
                break;
        }
    }
}
```

上面的result.mTask其实就是this对象，即当前对象。所以mTask.finish()调用的是

```java
private void finish(Result result) {
    if (isCancelled()) {
        onCancelled(result);  // 如果用户已经取消(调用过cancel())，任务已结束，那么触发onCancelled(result)这个回调。
    } else {
        onPostExecute(result);  // 如果任务结束，而用户也没有触发取消(没有调用过cancel())，则正常触发onPostExecute(result)这个回调。
    }
    mStatus = Status.FINISHED;
}

protected void onCancelled(Result result) {
    onCancelled();  // onCancelled() 是由 onCancelled(Result)来间接调用的。也即是说，都是在任务结束后，调用了cancel才会触发。
}    
```

至此，我们可以看到从后台到UI前台的切换。

注意：从上面源码可以看到，onCancelled()系列回调，并不是指任务中断，而是在任务结束后才触发的。通俗地说，onCancelled()系列回调，是在后台线程结束了才触发。
看到这里肯定会有疑问，AsyncTask的cancel()方法难道不是中断了后台任务吗？并不是！！
AsyncTask的cancel()方法主要是标记当前任务被取消了。即上面的isCancelled()返回值。如果任务被标记为取消，那么不会触发onPostExecute()，即使onPostExecute里面有UI的访问，但因为不会访问到，所以不会有问题。但onCancelled()系列方法还是会调用的，所以如果onCancelled()里面有UI访问就需要小心。

下面重新从AsyncTask的执行入口开始跟踪。

```java
private static volatile Executor sDefaultExecutor = SERIAL_EXECUTOR;
public static final Executor SERIAL_EXECUTOR = new SerialExecutor();

public final AsyncTask<Params, Progress, Result> execute(Params... params) {
    return executeOnExecutor(sDefaultExecutor, params);
}
```
可见，execute方法主要是使用sDefaultExecutor来执行。sDefaultExecutor是一个SerialExecutor对象。

```java
private static class SerialExecutor implements Executor {
    // 使用数组实现的双向队列
    final ArrayDeque<Runnable> mTasks = new ArrayDeque<Runnable>();
    Runnable mActive;

    public synchronized void execute(final Runnable r) {
        mTasks.offer(new Runnable() { // 用Runnable对参数中的Runnable再封装一次，因为运行完，需要触发队列下一个。
            public void run() {
                try {
                    r.run();
                } finally { // 使用try..finally来避免某个Runnalbe异常导致整个 任务队列 失效。
                    scheduleNext();
                }
            }
        });
        // 只要有任务在执行，mActive就不为null
        if (mActive == null) {
            scheduleNext();
        }
    }

    // 执行下一个任务
    protected synchronized void scheduleNext() {
        if ((mActive = mTasks.poll()) != null) {
            THREAD_POOL_EXECUTOR.execute(mActive);
        }
    }
}
```
ArrayDeque 是 Deque 接口的一种具体实现，是依赖于可变数组来实现的。
ArrayDeque 没有容量限制，可根据需求自动进行扩容。
ArrayDeque 可以作为栈来使用，效率要高于 Stack；
ArrayDeque 也可以作为队列来使用，效率相较于基于双向链表的 LinkedList 也要更好一些。
注意，ArrayDeque 不支持为 null 的元素。

1. 上面的静态`public static final Executor SERIAL_EXECUTOR = new SerialExecutor();`说明所有AsyncTask共用一个串行队列!!!

再看executeOnExecutor(sDefaultExecutor, params)方法

```java
public final AsyncTask<Params, Progress, Result> executeOnExecutor(Executor exec,
        Params... params) {
    if (mStatus != Status.PENDING) {
        switch (mStatus) {
            case RUNNING:
                throw new IllegalStateException("Cannot execute task:"
                        + " the task is already running.");
            case FINISHED:
                throw new IllegalStateException("Cannot execute task:"
                        + " the task has already been executed "
                        + "(a task can be executed only once)");
        }
    }

    mStatus = Status.RUNNING;

    // 直接回调onPreExecute，说明对AsyncTask的execute()调用必须在主线程。
    onPreExecute();

    // 开头就分析了的Callable和FutureTask。在AsyncTask的构造函数里初始化了FutureTask(mWorker)。
    mWorker.mParams = params;
    exec.execute(mFuture);    // 抛给线程池执行，执行完成后触发 FutureTask的done() 回调。

    return this;
}
```

最后，看一下AsyncTask的cancel(boolean)方法。
参数为true，表示如果线程正在执行中，则中断。
参数为false，表示如果线程正在执行中，则等待线程执行完毕。

这个函数有返回值：
返回true：如果任务还没开始，或者任务被顺利中断。
返回false：如果任务已经被取消过，或者任务已经结束，或者任务无法被结束（这个估计只有出错的时候）。

```java
public final boolean cancel(boolean mayInterruptIfRunning) {
    mCancelled.set(true);
    return mFuture.cancel(mayInterruptIfRunning);
}

// FutureTask cancel();
public boolean cancel(boolean mayInterruptIfRunning) {
    // 你会发现，state不为NEW就会立即返回false。这是因为，如果state不为NEW，说明要么已经完成，要么已经取消。
    if (!(state == NEW &&
          UNSAFE.compareAndSwapInt(this, stateOffset, NEW,
              mayInterruptIfRunning ? INTERRUPTING : CANCELLED)))
        return false;
    try {    // in case call to interrupt throws exception
        if (mayInterruptIfRunning) {
            try {
                Thread t = runner;
                if (t != null)
                    t.interrupt();
            } finally { // final state
                UNSAFE.putOrderedInt(this, stateOffset, INTERRUPTED);
            }
        }
    } finally {
        finishCompletion();
    }
    return true;
}
```
`UNSAFE.compareAndSwapInt(this, stateOffset, NEW, mayInterruptIfRunning ? INTERRUPTING : CANCELLED)`
UNSAFE提供了低级别的并发优化，即机器层面的优化，要比synchronised快得多（前者是纳秒级，后者是毫秒级）。但UNSAFE一般只提供JDK代码使用，上层应用要使用，需要使用反射来获取。

stateOffset：应该是提供线程访问的state，线程根据这个state来了解上层的意图，然后进行后续的逻辑处理。

因为是静态方法，所以需要传递this引用。
整个表达式是：当前线程中的state如果等于new，那么修改为INTERRUPTING 或 CANCELLED，然后返回true表示更改了；否则返回false，表示当前状态不是new。


* Possible state transitions:
* NEW -> COMPLETING -> NORMAL
* NEW -> COMPLETING -> EXCEPTIONAL
* NEW -> CANCELLED
* NEW -> INTERRUPTING -> INTERRUPTED
可见，如果state不为NEW，说明要么已经完成，要么已经取消。

因为后台任务主要通过FutureTask完成，所以cancel通过FutureTask提供的cancel方法结束后台线程的执行。

从官方文档来看，建议开发者在doInBackground里面处理isCancelled()。
因为结束线程的最好的办法是从线程内部是结束，而不是靠外部去中断。
由于AsyncTask的后台任务是开发者建立的，所以由开发者在后台任务里通过判断isCancelled()来立即结束任务执行，结果会更好，也会更快。
但通常，如果AsyncTask里面没有死循环，判断isCancelled()也是没什么必要。

如果像下面的死循环，则应该添加isCancelled判断。

```java
@Override
protected String doInBackground(Integer... params) {
    while(true) {
       if (isCancelled()) {
         return "";
       }
       // do your job
       try {
         Thread.sleep(100L);
       } catch (InterruptedException e) {}
    }
}
```

2. AsyncTask还提供了静态的后台任务方法：

```java
public static void execute(Runnable runnable) {
  sDefaultExecutor.execute(runnable);
}
```

### AsyncTask cancel后还会有内存泄露问题吗
这里的内存泄露主要针对匿名内部类建立AsyncTask的情况。

```java
new AsyncTask<Void, Void, String>() {
    @Override
    protected String doInBackground(Void... params) {
      while(true) {
        try {
          Thread.sleep(100L);
        } catch (InterruptedException e) {}
      }
      return "";
    }
    @Override
    protected void onPostExecute(String updateData) {
        //
    }
}.execute();
```
分析，如果上面的代码在Activity里，会不会导致内存泄露呢？
1. 匿名内部类会隐式持有外部类的实例，也即是说会持有Activity的强引用。
2. 持有Activity的强引用并不要紧，重要的是，Activity释放前，需要结束持有Activity强引用的AsyncTask实例的生命周期。
3. 于是问题变成了，AsyncTask的cancel方法能够结束AsyncTask实例的生命周期吗？（即AsyncTask实例没有被其它生命周期更长的模块持有）
   或者反过来，AsyncTask的生命周期会超过Activity的生命周期吗？
4. AsyncTask的生命周期是否超过Activity的生命周期取决于doInBackground的实现。假如在doInBackground里加入死循环，那么AsyncTask的生命周期确实超过了Activity的生命周期；亦或者doInBackground刚执行的时候，Activity就退出了，AsyncTask的生命周期仍旧超出了Activity的生命周期。
5. 所以，最重要的是Activity要做好AsyncTask的生命周期管控，在Activity退出前，通知AsyncTask结束生命周期，或者主动结束AsyncTask的生命周期，等到AsyncTask结束后才退出Activity。
6. 那么，AsyncTask的cancel能够做到这点吗？
7. 通过查看上面的代码，AsyncTask的cancel(true)会执行到FutureTask的cancel(true)，继而对线程执行interrupt。
8. 由于都是在主线程执行，所以不需要等待。

AsyncTask有很多坑，这主要也是因为多线程引起的。
1. 当且仅当AsyncTask在创建的时候，isCancelled()为false，如果调用过一次cancel()，则isCancelled()永远将会是true。AsyncTask对象不能重置这个状态。
2. 续1，当AsyncTask调用execute()启动后，就不能再次execute()，否则抛出异常。一个AsyncTask仅能使用一次!
3. cancel()方法不是一劳永逸的，它只是给doInBackground线程发出一个中断信号，如果doInBackground是一个死循环，并且在收到中断信号时没有退出线程，那么doInBackground线程会一直在后台运行。这是多线程中的特性。
4. 续3，一个线程仅能收到一次InterruptedException或其它中断信号！这意味着，如果收到InterruptedException等中断信号而不处理时，线程将不能被外界结束，只能由内部逻辑去结束。
5. 据说线程内部可以主动发起中断：Thread.currentThread().interrupt(); //再次中断线程
6. 发起中断时，Sleep会马上产生InterruptException，也即是说Sleep会马上结束。
7. 通过判断Thread.currentThread().isInterrupted()来结束线程需要小心，如果线程内有Sleep，Wait等等，线程在等待时，会消化掉中断信号，导致中断信号被重置为false，继而导致通过isInterrupted()判断失效。为了正常退出，一个方式是在Sleep等消化掉中断信号后，主动触发一个中断。见下面代码。

```java
public void run() {
  while(!Thread.currentThread().isInterrupted()) {
    System.out.println("thread running");
    try {
      Thread.sleep(100);
    } catch(InterruptedException e)  // 外部的中断被异常消化掉，重置为false
    {
      System.out.println("InterruptedException");
      Thread.currentThread().interrupt(); // 再次中断线程，使while判断生效。
    }
  }
  System.out.println("thread interrupted");
}
```

总结：
1. 严格来说，AsyncTask的初始化并不需要在主线程初始化，只是execute方法需要在主线程执行（因为execute里直接执行了onPreExecute）。
2. 所有AsyncTask实例共用一个串行队列!!!
   `public static final Executor SERIAL_EXECUTOR = new SerialExecutor();`
3. AsyncTask的内存泄露问题
4. 用于保存AsyncTask的变量，需要相同的类型，否则会出现运行时错误，Caused by: java.lang.ClassCastException: java.lang.Object[] cannot be cast to java.lang.Void[]
    使用`private AsyncTask<Void, Void, Void> mTask`而不是`private AsyncTask mTask`。
5. 注意上面的Void是对象，而不是void返回值。Void对象可以返回null。
