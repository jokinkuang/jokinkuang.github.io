## 如何关闭APP

## 结束Activity。

### 方案一
1. 在任意Activity里导航到RootActivity。
2. 通过Intent的Extra传递关闭标记。
3. 通过Intent的Flag来清理所有上层的Activity。
4. 在RootActivity里finish，当最后一个Activity被销毁，程序就退出了。

```java
Intent intent = new Intent(this, MainActivity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
intent.putExtra("Exit me", true);
startActivity(intent);   
finish();
```
startActivity后，会先pause自己，启动新的Activity，然后stop自己，自己留在返回栈中，finish是自己在返回栈时调用的。
即虽然不可见，但代码还是可以执行的。

```java
// MainActivity onCreate()

setContentView(R.layout.main_layout);

if( getIntent().getBooleanExtra("Exit me", false)){
    finish();
    return; // add this to prevent from doing unnecessary stuffs
}
```

前提是：RootActivity只有一个实例在返回栈中，且为根位置。
比如：A -> B -> A -> C -> D，A是RootActivity，D是当前Activity，如果使用上述代码是无法完成退出程序的。

### 方案二
在方案一基础上改进，将RootActivity的launchMode设置为singleTask来避免出现多个RootActivity。
因为singleTask在再次返回的时候会触发onNewIntent（如果在栈中被销毁，还会触发onCreate，但onNewIntent还是会有的），然后在onNewIntent里处理。

```java
Intent intent = new Intent(this, MainActivity.class);
intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
intent.putExtra(MainActivity.APP_EXIT, exit);
startActivity(intent);
```

```java
// MainActivity onNewIntent()

protected void onNewIntent(Intent intent) {
    boolean exit = intent != null && intent.getBooleanExtra(APP_EXIT, false);
    if (exit) {
        finish();
    }
}
```

### 方案三
使用BaseActivity管理所有打开的Activity，在退出时遍历调用finish结束Activity。
虽然这个结束可以在任意Activity里调用，但通常也是在RootActivity才进行。
结合上面的代码。

```java
// BaseActivity

class BaseActivity extends Activity {
  private List<Activity> aliveActivities = new LinkedList<>();

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    aliveActivities.add(this);
  }

  @Override
  protected void onDestroy() {
    aliveActivities.remove(this);
  }

  public void finishAllActivity() {
    if (! aliveActivities.isEmpty()) {
        for (Activity a : aliveActivities) {
            a.finish();
        }

        aliveActivities.clear();
    }
  }
}
```
当需要结束App的时候，调用finishAllActivity即可。

#### 方案四
使用Application提供的监听，支持API 14+，可以监听一个APP从前台到后台的状态切换，也可以监听一个APP自身的Activity的状态变更。

```java
public class MyAPP extends Application implements Application.ActivityLifecycleCallbacks {
  private List<Activity> visibleActivities = new LinkedList<>();
  private List<Activity> aliveActivities = new LinkedList<>();

  @Override
  public void onActivityCreated(Activity activity, Bundle bundle) {
     aliveActivities.add(activity);
  }

  @Override
  public void onActivityResumed(Activity activity) {
     visibleActivities.add(activity);
     onActivityChanged();
  }

  @Override
  public void onActivityPaused(Activity activity) {
     visibleActivities.remove(activity);
     onActivityChanged();
  }

  @Override
  public void onActivityDestroyed(Activity activity) {
     aliveActivities.remove(activity);
  }

  private void onActivityChanged() {
     if (isForeground()) {
         MLog.info(this, "onActivityChanged is foreground");
     } else {
         MLog.info(this, "onActivityChanged is background");
     }

     notifyForegroundChange(isForeground());
  }

  public Activity getCurrentVisibleActivity() {
     if (! visibleActivities.isEmpty()) {
         return visibleActivities.get(0);
     }

     return null;
  }

  public boolean isForeground() {
     return visibleActivities.size() > 0;
  }

  public void finishAllActivity() {
     if (! aliveActivities.isEmpty()) {
         for (Activity a : aliveActivities) {
             a.finish();
         }
         aliveActivities.clear();
     }
  }

  private void notifyForegroundChange(boolean isForeground) {
     // 通知APP 前置、后置
  }

  // APP的清理工作
  public void exit() {

  }
}
```

### 资源释放
上面描述了几种清理Activity的方案，通常Activity返回栈被结束后，APP就会退出。但一个复杂的APP除了Activity外，还需要对持有的资源进行释放。
所以，上面清理Activity通常在资源释放后才调用。

除了Activity外，其它组件也需要释放，比如：Fragment、Broadcast、Service、对相机、录音机等系统资源的释放等等。

通常，释放资源放在自定义的Application里面。

```java
// MyApplication

public void exit() {
  // 清理其它资源

  // 清理 Fragment
  getSupportFragmentManager().popBackStackImmediate();

  // 清理 Activity
  finishAllActivity();

  // 结束进程
  gHandler.postDelayed(new Runnable() {
    @Override
    public void run() {
        System.exit(0);
    }
  }, 1000);
}
```
并不建议直接使用System.exit(0)来结束进程。但如果资源释放完全，可以使用。
也可以联合使用下面的两个方法。

```java
/*
 * Notify the system to finalize and collect all objects of the
 * application on exit so that the process running the application can
 * be killed by the system without causing issues. NOTE: If this is set
 * to true then the process will not be killed until all of its threads
 * have closed.
 */
System.runFinalizersOnExit(true);

/*
 * Force the system to close the application down completely instead of
 * retaining it in the background. The process that runs the application
 * will be killed. The application will be completely created as a new
 * application in a new process if the user starts the application
 * again.
 */
System.exit(0);
```

Logcat输出`Process 包名 (pid  xxxxx)  has died.`则表示进程退出。

Android在设计的时候，就没有提供退出APP的方法和流程。
即使APP的所有Activity被结束，应用还是会在内存中，成为后台进程。
如果系统内存不足，Android就会回收后台进程。Android这样做是为了下次启动相同的APP的时候可以加快速度。
但是有个缺点，后台进程虽然会在内存不足时被回收，在内存方面不会有太大影响，但后台进程会消耗CPU，
