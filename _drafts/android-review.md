
## Android四大组件
- Activity
- Service
- Broadcast
- ContentProvider

## Android版本对照表
见<https://developer.android.com/reference/android/os/Build.VERSION_CODES.html>(还有简明的版本变化)
或参考Wiki<https://zh.wikipedia.org/wiki/Android%E6%AD%B7%E5%8F%B2%E7%89%88%E6%9C%AC>
__________________________________________________________________________________
2011.10           14                  4.0                          IceCreamSandwish
__________________________________________________________________________________
2011.12           15                  4.0.3-4.0.4                  ICE_CREAM_SANDWICH_MR1
__________________________________________________________________________________
2012.06           16                  4.1.x                        Jellybean
__________________________________________________________________________________
2012.11           17                  4.2.x                        JELLY_BEAN_MR1
__________________________________________________________________________________
2013.07           18                  4.3.x                        JELLY_BEAN_MR2
__________________________________________________________________________________
2013.10           19                  4.4-4.4.4                    KitKat
__________________________________________________________________________________
2014.06           20                  4.4W                         KITKAT_WATCH
__________________________________________________________________________________
2014.11           21                  5.0.x                        Lollipop
__________________________________________________________________________________
2015.03           22                  5.1.x                        LOLLIPOP_MR1
__________________________________________________________________________________
2015.05           23                  6.0.x                        Marshmallow（M）
__________________________________________________________________________________
2016.03           24                  7.0                          Nougat（N）
__________________________________________________________________________________
2016.12           25                  7.1.1                        Nougat++（N_MR1）

## 显式Intent与隐式Intent

## StartActivity与StartActivityForResult

## Manifest
具体参考：<https://developer.android.google.cn/guide/topics/manifest/>

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest>
    <uses-permission />
    <permission />
    <permission-tree />
    <permission-group />
    <instrumentation />
    <uses-sdk />
    <uses-configuration />  
    <uses-feature />  
    <supports-screens />  
    <compatible-screens />  
    <supports-gl-texture />  

    <application>
        <activity>
            <intent-filter>
                <action />
                <category />
                <data />
            </intent-filter>
            <meta-data />
        </activity>

        <activity-alias>
            <intent-filter> . . . </intent-filter>
            <meta-data />
        </activity-alias>

        <service>
            <intent-filter> . . . </intent-filter>
            <meta-data/>
        </service>

        <receiver>
            <intent-filter> . . . </intent-filter>
            <meta-data />
        </receiver>

        <provider>
            <grant-uri-permission />
            <meta-data />
            <path-permission />
        </provider>

        <uses-library />

    </application>
</manifest>
```
### manifest

- package="string"
- android:sharedUserId="string"
- android:sharedUserLabel="string resource"
- android:versionCode="integer"
- android:versionName="string"
- android:installLocation=["auto" | "internalOnly" | "preferExternal"]

Note: By default, your application will be installed on the internal storage and cannot be installed on the external storage unless you define this attribute to be either "auto" or "preferExternal".

实例：
package="com.xxx.mimi"
android:versionCode="1"
android:versionName="1.0.0-SnapShot"

### uses-permission

- android:name="string"
- android:maxSdkVersion="integer" 如果应用需要的权限从某个 API 级别开始不再需要，则设置此属性很有用。

实例：
<uses-permission android:name="android.permission.INTERNET" />

### uses-feature

- android:name="string"
- android:required=["true" | "false"] 默认为true
- android:glEsVersion="integer"

声明的 <uses-feature> 元素仅供参考，这意味着 Android 系统本身在安装应用前不会检查设备是否提供相应的功能支持。
声明 android:required="true" 时，即是规定当设备不具有该指定功能时，应用无法正常工作，或设计为无法正常工作。
声明 android:required="false" 时，则意味着如果设备具有该功能，应用会在必要时优先使用该功能，但应用设计为不使用该指定功能也可正常工作。

实例：
<uses-feature android:name="android.hardware.camera" />

### application

- android:allowTaskReparenting=["true" | "false"]  默认false
* android:allowBackup=["true" | "false"]  默认true
- android:backupAgent="string"
- android:backupInForeground=["true" | "false"]  默认false
- android:banner="drawable resource"
* android:debuggable=["true" | "false"]  默认false
* android:description="string resource"
- android:directBootAware=["true" | "false"]  默认false
- android:enabled=["true" | "false"]  默认true
* android:extractNativeLibs=["true" | "false"]  默认true
- android:fullBackupContent="string"
- android:fullBackupOnly=["true" | "false"]  默认false
- android:hasCode=["true" | "false"]  默认true（很少用到）
- android:hardwareAccelerated=["true" | "false"] API14以上默认true，反之默认false
* android:icon="drawable resource"
* android:isGame=["true" | "false"]  默认false（用于归类）
- android:killAfterRestore=["true" | "false"]  默认true
- android:largeHeap=["true" | "false"]  不要设置，除非if you're using a shared user ID to allow multiple applications to use a process, they all must use this option consistently or they will have unpredictable results.
* android:label="string resource"  
* android:logo="drawable resource"
- android:manageSpaceActivity="string"
* android:name="string"
- android:networkSecurityConfig="xml resource" This attribute was added in API level 24.
- android:permission="string" This attribute is a convenient way to set a permission that applies to all of the application's components.
* android:persistent=["true" | "false"] 是否永久驻留（其实高版本是没效的，高版本只支持系统应用）默认false
- android:process="string" The name of a process where all components of the application should run.
- android:restoreAnyVersion=["true" | "false"]  默认false
- android:requiredAccountType="string"  API18以上
* android:resizeableActivity=["true" | "false"]  API24以上，默认true，是否支持多窗口模式
- android:restrictedAccountType="string" API18以上
* android:supportsRtl=["true" | "false"] API17以上，默认false，是否支持右到左(RTL)布局
* android:taskAffinity="string"  返回栈
* android:testOnly=["true" | "false"]  只用于测试。This kind of application can be installed only through adb.
* android:theme="resource or theme"  
- android:uiOptions=["none" | "splitActionBarWhenNarrow"]  API14以上，默认none
- android:usesCleartextTraffic=["true" | "false"]  默认true，是否使用明文传输。API23加入，API24移走了。
- android:vmSafeMode=["true" | "false"]  默认false。API22为"true" disabled the ART ahead-of-time (AOT) compiler.

实例：
android:name=".MainApp"
android:allowBackup="true"
android:icon="@mipmap/ic_launcher"   # 图标
android:label="${APP_NAME}"          # 名称
android:largeHeap="true"
android:theme="@style/XgameAppTheme"
tools:replace="android:icon,android:label,android:theme"  # 表示属性icon、label等可以被Gradle构建脚本覆盖。

### activity

* android:allowEmbedded=["true" | "false"]  默认false（用于 Wear 自定义通知的 Activity 必须声明此项）

* android:allowTaskReparenting=["true" | "false"]  不是repeat，是parent。默认false（可以通过taskAffinity设置）仅用于（standard和singleTop模式）
这个属性挺有意思的。表示当前Activity是否允许转移到别的任务栈。
比如：默认情况下，应用A启动应用B的ActivityC，C会依附在应用A的任务栈中，点击Home键再返回应用A，你会发现ActivityC还存在。反之，如果你希望点击Home键后（即ActivityC不可见后），C依附回应用B，就需要设置为true，表示ActivityC会依附在与它最亲近的应用，也即是应用B。（这个属性是在Activity在下一次前置时才会生效，所以需要使用Home键来达到效果：when that task is next brought to the front，如果直接在Activity中直接返回而没有切换到后台，那么它仍旧属于打开它的应用！而一旦打开最近任务列表时，就能看到它转移到亲和关系最亲密的应用了）

这个属性对于singleTask和singleInstance是没效的，因为他们已表明自己的任务栈，他们的任务栈是不能被转移的。

* android:alwaysRetainTaskState=["true" | "false"]  默认false，是否保存Activity状态。系统是否始终保持 Activity 所在任务的状态 —“true”表示保持，“false”表示允许系统在特定情况下将任务重置到其初始状态。 默认值为“false”。该属性只对任务的【根 Activity】有意义；对于所有其他 Activity，均忽略该属性。

* android:autoRemoveFromRecents=["true" | "false"]  是否自动从最近中移除
- android:banner="drawable resource"
- android:clearTaskOnLaunch=["true" | "false"]  默认false，点击启动图标，是否清除已存在的任务栈
* android:configChanges=["mcc", "mnc", "locale",
                       "touchscreen", "keyboard", "keyboardHidden",
                       "navigation", "screenLayout", "fontScale",
                       "uiMode", "orientation", "screenSize",
                       "smallestScreenSize"]
非常有用的一项！在运行时发生配置更改时（比如旋转屏幕），默认情况下会关闭 Activity 然后将其重新启动，但使用该属性声明配置将阻止 Activity 重新启动。
如果屏幕发生旋转等，会触发Activity的 onConfigurationChanged() 回调。

- android:documentLaunchMode=["intoExisting" | "always" |
                        "none" | "never"]
- android:enabled=["true" | "false"]  默认true
* android:excludeFromRecents=["true" | "false"]  默认false，是否出现在最近任务列表中。true表示不加入最近任务列表中。
* android:exported=["true" | "false"]  默认true，是否暴露给别的应用，即别的应用是否能启动此Activity。
- android:finishOnTaskLaunch=["true" | "false"]  
Whether or not an existing instance of the activity should be shut down (finished) whenever the user again launches its task (chooses the task on the home screen) — "true" if it should be shut down, and "false" if not. The default value is "false".
默认false，如果该属性和 allowTaskReparenting 均为“true”，则优先使用该属性。 Activity 的亲和关系会被忽略。 系统不是更改 Activity 的父项，而是将其销毁。

* android:hardwareAccelerated=["true" | "false"]  默认false，是否启用硬件加速渲染。
- android:icon="drawable resource"  一个表示 Activity 的图标。该图标会在需要在屏幕上表示 Activity 时显示给用户。如果未设置该属性，则改为使用为应用整体指定的图标。
- android:label="string resource"  同上。

* android:launchMode=["standard" | "singleTop" |
                    "singleTask" | "singleInstance"]
最重要的。任务栈。
“standard或singleTop”Activity 可以通过IntentFlag来改变它要启动的Activity的行为，比如FLAG_ACTIVITY_NEW_TASK就会为打开的Activity创建新的任务栈。
“singleTask”Activity 允许其他 Activity 成为其任务的组成部分。它始终位于其任务的根位置。也即是说singleTask的Activity会是新的任务栈中的根。
“singleInstance”Activity 则不允许其他 Activity 成为其任务的组成部分。它是任务中唯一的 Activity。如果它启动另一个 Activity，系统会将该 Activity 分配给其他任务 — 就好像 Intent 中包含 FLAG_ACTIVITY_NEW_TASK 一样。

singleTask和singleInstance一样，是在新的任务栈中打开，且都是新的任务栈的根。不同的是，singleTask的Activity启动另一个Activity时，可以在当前栈打开。而singleInstance启动另一个Activity时，无论Intent的Flag怎么设置，都会创建新的任务栈来启动。

- android:maxRecents="integer"  控制最近列表的数目，默认为16。（但好像一个app就只能出现在最近列表一次吧）
- android:multiprocess=["true" | "false"]  默认false，即Activity在同一进程内。为“true”，Activity 实例便可在多个进程内运行（不知有没有效）。
- android:name="string"  实现 Activity 的类的名称，是 Activity 的子类。为了简便起见，如果名称的第一个字符是句点（例如，“.ExtracurricularActivity”），则名称将追加到 <manifest> 元素中指定的软件包名称。

* android:noHistory=["true" | "false"]  默认false，当用户离开 Activity 并且其在屏幕上不再可见时，是否应从 Activity 堆栈中将其移除并结束（调用其 finish() 方法）—“true”表示应将其结束，“false”表示不应将其结束。“true”一值表示 Activity 不会留下历史轨迹。 它不会留在任务的 Activity 堆栈内，因此用户将无法返回该Activity。 在此情况下，如果在这个Activity使用startActivityForResult，将得不到回调onActivityResult()，因为启动另一个Activity时，它自己已经finish了。

* android:parentActivityName="string" Activity 逻辑父项的类名称。系统会读取该属性，以确定当用户按下操作栏中的“向上”按钮时应该启动哪一个 Activity。 系统还可以利用这些信息通过 TaskStackBuilder 合成 Activity 的返回栈。（自定义逻辑返回栈）
* android:permission="string"  Activity也可以指定permission。客户端启动 Activity 或以其他方式令其响应 Intent 而必须具备的权限的名称。 如果系统尚未向 startActivity() 或 startActivityForResult() 的调用方授予指定权限，其 Intent 将不会传递给 Activity。也即是说，没有权限，发起启动Activity的Intent会被忽略，那意思是Activity无法启动，还是会抛出异常？
* android:process="string"  您无需使用该属性。 但在必要时，您可以使用该属性替换默认进程名称，以便让应用组件散布到多个进程中。
如果为该属性分配的名称以冒号（“:”）开头，则会在需要时创建应用专用的新进程，并且 Activity 会在该进程中运行。如果进程名称以小写字符开头，Activity 将在该名称的全局进程中运行，前提是它拥有相应的权限。这可以让不同应用中的组件共享一个进程，从而减少资源占用。

- android:relinquishTaskIdentity=["true" | "false"]  Activity 是否将其任务标识符交给任务栈中在其之上的 Activity
* android:resizeableActivity=["true" | "false"]  指定应用是否支持多窗口显示。Application也有这个属性。API24以上添加。
* android:screenOrientation=["unspecified" | "behind" |
                           "landscape" | "portrait" |
                           "reverseLandscape" | "reversePortrait" |
                           "sensorLandscape" | "sensorPortrait" |
                           "userLandscape" | "userPortrait" |
                           "sensor" | "fullSensor" | "nosensor" |
                           "user" | "fullUser" | "locked"]
Activity 在设备上的显示方向。如果 Activity 是在多窗口模式下运行，系统会忽略该属性。也即是说API24以上还要禁用多窗口模式。
通过这个设置可以禁用旋转屏幕。通常设置为“portrait”，纵向。

* android:stateNotNeeded=["true" | "false"]  默认false。能否在不保存 Activity 状态的情况下将其终止并成功重新启动 —“true”表示可在不考虑其之前状态的情况下【重新启动】。表示需要之前的状态，即正常情况下，为保存资源而暂时关闭 Activity 前，系统会调用其 onSaveInstanceState() 方法，保存默认的数据，后续恢复时自动恢复。如果状态不重要，可以设置为true，设置true后， 这与Activity 首次启动时完全一样，Bundle是null。那么Activity在后台被回收后，再回到前台，一些默认保存的数据也会丢失。
“true”设置可确保 Activity 能够在未保留状态时重新启动。 例如，显示主屏幕的 Activity 可以使用该设置来确保其由于某种原因崩溃时不会被移除。

* android:supportsPictureInPicture=["true" | "false"]  指定 Activity 是否支持画中画 显示。API24以后添加。
* android:taskAffinity="string"  默认情况下，应用中的所有 Activity 都具有相同的亲和关系。要指定 Activity 与任何任务均无亲和关系，请将其设置为空字符串。
* android:theme="resource or theme"  如果未设置该属性，则 Activity 继承通过 <application> 元素的 theme 属性为应用整体设置的主题。 如果该属性也未设置，则使用默认系统主题。
- android:uiOptions=["none" | "splitActionBarWhenNarrow"]
* android:windowSoftInputMode=["stateUnspecified",
                             "stateUnchanged", "stateHidden",
                             "stateAlwaysHidden", "stateVisible",
                             "stateAlwaysVisible", "adjustUnspecified",
                             "adjustResize", "adjustPan"]
非常有用。Activity 的主窗口与包含屏幕软键盘的窗口的交互方式。
当 Activity 成为用户注意的焦点时软键盘的状态 — 隐藏还是可见。
对 Activity 主窗口所做的调整 — 是否将其尺寸调小以为软键盘腾出空间，或者当窗口部分被软键盘遮挡时是否平移其内容以使当前焦点可见。

<activity android:windowSoftInputMode="stateVisible|adjustResize" . . . >

"stateUnspecified"	不指定软键盘的状态（隐藏还是可见）。 将由系统选择合适的状态，或依赖主题中的设置。这是对软键盘行为的默认设置（adjustPan或adjustResize)。
“stateUnchanged”	当 Activity 转至前台时保留软键盘最后所处的任何状态，无论是可见还是隐藏。
“stateHidden”	当用户选择 Activity 时，也就是说，当用户确实是向前导航到Activity，而不是要离开或返回另一个Activity时，隐藏软键盘。
“stateAlwaysHidden”	当 Activity 的主窗口有输入焦点时始终隐藏软键盘（即永远不显示软键盘）。
“stateVisible”	在正常的适宜情况下（当用户向前导航到 Activity 的主窗口时）显示软键盘。
“stateAlwaysVisible”	当用户选择 Activity 时 — 也就是说，当用户确实是向前导航到 Activity，而不是要离开或返回另一个Activity时 — 显示软键盘。
“adjustUnspecified”	不指定 Activity 的主窗口是否调整尺寸以为软键盘腾出空间，或者窗口内容是否进行平移以在屏幕上显露当前焦点。 系统会根据窗口的内容是否存在任何可滚动其内容的布局视图来自动选择其中一种模式。 如果存在这样的视图，窗口将进行尺寸调整，前提是可通过滚动在较小区域内看到窗口的所有内容。这是对主窗口行为的默认设置。
“adjustResize”	始终调整 Activity 主窗口的尺寸来为屏幕上的软键盘腾出空间（即窗口大小变化）。
“adjustPan”	不调整 Activity 主窗口的尺寸来为软键盘腾出空间（即窗口大小固定不变，只是内容布局偏移）， 而是自动平移窗口的内容，使当前焦点永远不被键盘遮盖，让用户始终都能看到其输入的内容。 这通常不如尺寸调正可取，因为用户可能需要关闭软键盘以到达被遮盖的窗口部分或与这些部分进行交互。
“adjustNothing” 这个没有出现在文档，但实际项目又有使用，表示软件盘弹出时，不调整窗口任何东西。但设置了这个选项，keyboardDidShow and keyboardDidHide键盘事件会无法收到。

注意，窗口变化时，会影响到窗口的背景和元素的背景变化。

实例：
<activity
    android:name=".activity.ActivityC"   // package+“.activity.ActivityC”
    android:label="Activity">            // 默认的标题栏会显示这个名称，没有设置则显示Application的名称。
</activity>


### activity-alias 别名
注：Activity别名必须在对应的Activity后面！

- android:enabled=["true" | "false"]
- android:exported=["true" | "false"]
- android:icon="drawable resource"
* android:label="string resource"
* android:name="string"
- android:permission="string"
* android:targetActivity="string"  目标Activity的名称，必须和对方的name一致。

别名的用途：
1. 别名可以作为Activity的另一个入口。比如ActivityA只声明了VIEW的intent-filter，ActivityA的别名可以声明为SEARCH的intent-filter来提供另一个功能。
2. 别名里设置的属性如果和原始设置冲突，以别名里为准；但如果原始设置在别名中没有出现，则别名会继承原始配置。
3. 据说如果像下面把程序的入口设置别名，则相当于打开的是两个独立的应用。但实际上我测试的时候，只有一个进程！！
4. 可以在Activity中通过getIntent().getComponent().getClassName()来获取别名来区分来源。但实际上测试的时候，用哪个入口先打开，则内存中显示的是对应的Activity，即使用另一个入口打开，只是起到快捷方式的作用，而不会再改变应用的状态。这个可能跟系统有关。

实例：一个程序多个启动入口
<activity   
    android:name=".TestAndroid"  
    android:icon="@drawable/ic_menu_mark">  
        <intent-filter>  
            <action android:name="android.intent.action.MAIN" />  
            <category android:name="android.intent.category.LAUNCHER" />  
        </intent-filter>  
</activity>
// 必须在原始Activity后面声明
<activity-alias   
    android:name="TestAndroidAlias"  
    android:targetActivity=".TestAndroid"  
    android:label="testAndroidlias"  
    android:icon="@drawable/ic_launcher_phone">  
        <intent-filter>  
            <action android:name="android.intent.action.MAIN" />  
            <category android:name="android.intent.category.DEFAULT" />  
            <category android:name="android.intent.category.LAUNCHER" />  
        </intent-filter>  
</activity-alias>



### service

android:description="string resource"
android:directBootAware=["true" | "false"]
android:enabled=["true" | "false"]
android:exported=["true" | "false"]  其它应用是否可以启动此Service。即是否暴露。
android:icon="drawable resource"
android:isolatedProcess=["true" | "false"]  是否孤立。如果为True，会在系统特别的独立的进程中运行，当前应用没有直接访问权，只能通过ServiceAPI进行通信（binding、starting）
android:label="string resource"
android:name="string"
android:permission="string"
android:process="string" The name of the process where the service is to run. 同上。
If the name assigned to this attribute begins with a colon (':'), a new process, private to the application, is created when it's needed and the service runs in that process.
If the process name begins with a lowercase character, the service will run in a global process of that name, provided that it has permission to do so. This allows components in different applications to share a process, reducing resource usage.

如果被设置的进程名是以一个冒号开头的，则这个新的进程对于这个应用来说是私有的，当它被需要或者这个服务需要在新进程中运行的时候，这个新进程将会被创建。如果这个进程的名字是以字符开头，并且符合 android 包名规范(如 com.roger 等)，则这个服务将运行在一个以这个名字命名的全局的进程中，当然前提是它有相应的权限。

新建进程将允许在不同应用中的各种组件可以共享一个进程，从而减少资源的占用（比如百度的定位进程、第三方推送等等）。

例子：
<service android:name="com.mozillaonline.providers.downloads.DownloadService" />
<service
    android:name="com.baidu.location.f"
    android:enabled="true"
    android:process=":remote" />

假设项目Package为net.oschina.demo，并设置android:process=":remote_1",
那么App运行时, 通过

```shell
D:\Android-SDK\platform-tools\adb.exe shell
ps | grep net.oschina.demo
```
可以看到有两个进程:
* net.oschina.demo
* net.oschina.demo:remote_1

如果没有加冒号，改为"com.remote"(remote安装不了)，会得到下面的两个进程。
u0_a98    10061 1673  927156 49424 ffffffff b76e107b S com.yuanhh.appbinderdemo
u0_a98    10074 1673  920848 39120 ffffffff b76e107b S com.remote

注意：在当前应用使用android:process=":remote"方式创建的进程相当于另一个应用程序，每创建一个进程，都会执行一次Application的onCreate方法。这意味着，如果不根据当前进程区分初始化代码，每创建一个进程就执行一次当前应用的Application:onCreate初始化。通过android:name="com.xxx"可以指定具体要在新进程里执行的任务。可以指定Activity、Service等。

### apk，task，android:process与android:sharedUserId的区别

<http://blog.csdn.net/lynn0708/article/details/13624403>
apk一般占一个dalvik,一个进程，一个task。通过设置也可以多个进程,占多个task。
task是一个activity的栈，其中"可能"含有来自多个App的activity（应用间互相调用Activity）

android:process我们可以通过设置这个属性，让每个组件运行在它自己的进程中，也可以只让某些组件共享一个进程。我们要可以通过设置“android:process”属性，让不同应用程序中的组件运行在相同的进程中，这些应用程序共享相同的Linux用户ID，拥有相同的证书。
当可用内存数量低，而一些与用户即时交互的进程又需要内存时，Android随时可能会终止某个进程。运行在被终止的进程中的组件会因此被销毁，但是，当再次需要这些组件工作时，就会再启动一个进程。

如果不能将两个activity放入同一个application中的话，可以通过在各自的manifest中设置以下属性，让这两个activity强制运行在同一个进程中，从而可以充分利用进程内共享的资源，减少内存占用：
```java
两步，缺一不可。
1.设置相同的User Id：  
<manifest android:sharedUserId="aaa.bbb"  

2.被调用的activity设置以下属性：
<activity android:multiprocess="true"  
或者  
<activity android:process="com.cienet.test"
```
以上是APK共享进程的两个条件。
对于3D OpenGL程序，修改以上属性后，被调用的activity的内存占用会明显减少

### receiver

android:directBootAware=["true" | "false"]
android:enabled=["true" | "false"]
android:exported=["true" | "false"]
android:icon="drawable resource"
android:label="string resource"
android:name="string"
android:permission="string"
android:process="string"

和Service差不多，少了description

### provider

android:authorities="list"
android:directBootAware=["true" | "false"]
android:enabled=["true" | "false"]
android:exported=["true" | "false"]
android:grantUriPermissions=["true" | "false"]
android:icon="drawable resource"
android:initOrder="integer"
android:label="string resource"
android:multiprocess=["true" | "false"]
android:name="string"
android:permission="string"
android:process="string"
android:readPermission="string"
android:syncable=["true" | "false"]
android:writePermission="string"

### intent-filter
隐式Intent，或者叫Intent声明，声明当前组件可以响应的Intent。

一定要包含：action
可以包含：category、data
被包含：activity、activity-alias、service、receiver

android:icon="drawable resource"
android:label="string resource"
android:priority="integer"

主要用于隐式Intent。

例子：
// 声明可以让系统启动的Activity
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
// 声明可以打开Http协议的Activity
<activity android:name=".WebActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:scheme="http"/>
    </intent-filter>
</activity>

### action
行为、动作。
<action android:name="string" />

系统行为、自定义行为：
android.intent.action.VIEW/MAIN/SEARCH等等一系列动作类型。

例子：
ACTION_MAIN
  <action android:name="android.intent.action.MAIN" />
ACTION_WEB_SEARCH
  <action android:name="android.intent.action.WEB_SEARCH" />
自定义Action
  <action android:name="com.example.project.TRANSMOGRIFY" />

其实就是创建隐式Intent的参数之一。比如new Intent(Intent.ACTION_VIEW)其实等价于new Intent("android.intent.action.VIEW")。
完整的例子可以看下面。

### category
<category android:name="string" />

系统Category前缀是"android.intent.category.XXX"

Note: In order to receive implicit intents（隐式Intent）, you must include the CATEGORY_DEFAULT category in the intent filter. The methods startActivity() and startActivityForResult() treat all intents as if they declared the CATEGORY_DEFAULT category. If you do not declare it in your intent filter, no implicit intents will resolve to your activity.
如果Activity要响应隐式Intent（即应用允许被第三方启动），必须包含"android.intent.category.DEFAULT"，使用startActivity或startActivityForResult发送一个隐式Intent时，默认会带上DEFAULT这个category，所以不用自己添加。

比如，
// 自定义可以处理隐式Intent的Activity
<activity android:name=".MyActivity">
    <intent-filter>
        <action android:name="com.example.myactivity.ACTION"/>
        // DEFAULT必须加上！否则只能使用显式Intent。
        <category android:name="android.intent.category.DEFAULT"/>
        // 自定义类别
        <category android:name="com.example.myactivity.MY_CATEGORY"/>
        <data android:scheme="http"/>
    </intent-filter>
</activity>

// 发送一个隐式Intent
Intent intent = new Intent("com.example.myactivity.ACTION"); // 通过action name来初始化Intent。
// 默认的DEFAULT的category会自动加入。
intent.addCategory("com.example.myactivity.MY_CATEGORY"); // 加入MY_CATEGORY的category
startActivity(intent);

注：如果没有找到响应的Activity，应用会崩溃！所以最后包在try...catch里。

例子：
<category android:name="android.intent.category.LAUNCHER" /> 对应CATEGORY_LAUNCHER
<category android:name="android.intent.category.DEFAULT" /> 对应CATEGORY_DEFAULT
<category android:name="android.intent.category.COM_XXX_CATEGORY" /> 自定义

### data
数据协议。主要是scheme和mimeType比较重要。
<data android:scheme="string"
      android:host="string"
      android:port="string"
      android:path="string"
      android:pathPattern="string"
      android:pathPrefix="string"
      android:mimeType="string" />

`intent.setData(Uri.parse("http://www.baidu.com"));`将字符串转换为data

* scheme 指定数据的协议部分，比如上面的http
- host 指定数据的主机名部分，比如上面的www.baidu.com
- port 指定数据的端口部分，通常在主机名后面。比如www.baidu.com:8080中的8080
- path 指定主机名和端口之后的部分，全字匹配。比如www.baidu.com/xxx中的/xxx（注：路径一定以/开头！）
- pathPattern 同上，表示正则表达式的路径匹配
- pathPrefix 同上，表示路径前缀匹配
* mimeType 指定数据类型，比如image/jpeg、video/mp4、audio/mpeg


例子：
<data android:scheme="something" android:host="project.example.com" />
<data android:scheme="something" />
<data android:host="project.example.com" />

### meta-data
元数据。
<meta-data android:name="string"
           android:resource="resource specification"
           android:value="string" />

<meta-data android:name="mTag" android:value="@string/meta_service"></meta-data>  
<meta-data android:name="mTag" android:value="@string/meta_broadcast"></meta-data>

#### Activity中获取Mainifest.xml中的元数据：
// application节点
ApplicationInfo appInfo = this.getPackageManager().getApplicationInfo(getPackageName(), PackageManager.GET_META_DATA);  
// activity节点
ActivityInfo info = this.getPackageManager().getActivityInfo(getComponentName(), PackageManager.GET_META_DATA);  
// broadcast节点
ActivityInfo info = this.getPackageManager().getReceiverInfo(new ComponentName(this, DemoReceiver.class), PackageManager.GET_META_DATA);  
// service节点
ServiceInfo info = this.getPackageManager().getServiceInfo(new ComponentName(this, DemoService.class), PackageManager.GET_META_DATA);
String mTag = info.metaData.getString("mTag");


## Activity


### Activity生命周期
onCreate - onStart - onResume - running... - onPause - onStop - onDestroy
running... - onPause - onResume - running...
running... - onStop - onRestart - onStart - onResume - running...

其中：
onCreate会紧接着触发onStart - onResume。
onPause之后，如果是退出，则会触发onStop - onDestroy。如果不是退出，则只会触发onPause。
然后根据后续用户操作来决定。如果用户返回，则会触发onResume。如果用户导致页面不可见，则会触发onStop。

#### 对于当前一个页面

如果用户打开当前页：
onCreate - onStart - onResume

如果用户按返回键退出当前页：
onPause - onStop - onDestroy

如果用户切换到最近列表又返回当前页面：
onPause - onStop - onRestart - onStart - onResume

#### 对于两个页面

如果用户在当前页ActivityA打开ActivityB：
ActivityA_onPause - [ActivityB_onCreate - ActivityB_onStart - ActivityB_onResume] - ActivityA_onStop

从ActivityB返回：
ActivityB_onPause - [ActivityA_onRestart - ActivityA_onStart - ActivityA_onResume] - ActivityB_onStop - ActivityB_onDestroy

可见，启动一个新的Activity，是先暂停当前Activity，然后执行新Activity的回调后，才执行当前Activity的停止回调。
即，启动一个新的Activity，始于自己的onPause，新建Activity，结束于自己的onStop。
返回也是，始于自己的onPause，恢复旧的Activity，结束于自己的onStop和onDestroy。

//==================
注：以上打印与Log和super之间先后调用无关。即log(xxx);super.XXX();与super.XXX();log(xxx);顺序无关，因为这个顺序只是针对当前实例A，与实例B是无关的。继承关系中的调用，仅仅是指当前实例先执行自己的代码，还是先执行父类代码，一般不会影响到另一个相同的实例。除非父类代码中操作了类共享属性。

如果ActivityB是singleInstance/singleTask，且ActivityB已经存在内存中，那么从ActivityA打开ActivityB：
ActivityA_onPause - [ActivityB_onNewIntent - ActivityB_onRestart - ActivityB_onStart - ActivityB_onResume] - ActivityA_onStop
// 除了回调了onNewIntent外，因为是获得前置显示的过程，所以同样会执行onRestart - onStart - onResume。
// 对于singleTask，还在任务栈中，如果kill掉当前应用，再次打开singleTask是完全创建新的实例，估计依附在该应用的任务栈被清除了。
// 对于singleInstance，还在任务栈中，如果kill掉当前应用，再次打开singleInstance，会执行onCreate，然后执行onNewIntent!!!。系统会记录着，因为singleInstance的任务栈独立于当前应用，不会随应用kill而被清除。但因为实例已经不再存在，所以会再触发一次onCreate，就好像内存被回收了再次恢复。但逻辑上，它和前一个实例一样。


注意：以上触发onNewIntent是在StartActivity新启动一个ActivityB，而不是通过返回键返回。通过返回键返回一律只触发正常的流程，不分singleTask或singleInstance，所谓“启动模式”就是特指“启动”这个动作，而不是指返回操作。

#### 对于SingleTask的出栈。
SingleTaskO - A - B - C - D - SingleTaskO：
1. 从D跳转到SingleTaskO，在D到SingleTaskO之间的栈遍历出栈：A_onDestroy - B_onDestroy - C_onDestroy (在入栈的时候，ABC的onStop已经执行)
2. 中间的出栈后，还是从D开始，暂停自己，启动SingleTaskO，停止自己：D_onPause - O_onNewIntent - O_Restart-Start-Resume - D_onStop
3. 由于D也是在SingleTaskO之上，所以最后执行D_onDestroy.

整理就是：A~C_onDestroy - D_onPause - O_onNewIntent-Restart-Start-Resume - D_onStop - D_onDestroy
当跳转到singleTask时，会先将自己和singleTask之间的任务出栈，然后就相当于从自己启动singleTask的流程一样，然后最后自己销毁。

### Activity四种启动模式：standard、singleTop、singleTask、singleInstance
注：“启动模式”是指使用StartActivity等“启动”一个Activity时的效果，而不是返回键返回操作！！！
无论当前Activity是哪种启动模式，如果在当前Activity按返回键，都会销毁当前Activity！！！

standard  标准模式，新启动的Activity会重新创建。
singleTop 如果新启动的Activity和当前栈顶的Activity是同一个类，那么不创建新的实例。
注意：可以通过IntentFlag来改变它要启动的Activity的行为，比如FLAG_ACTIVITY_NEW_TASK就会为打开的Activity创建新的任务栈。

singleTask 允许其他 Activity 成为其任务的组成部分。它始终位于其任务的根位置。也即是说singleTask的Activity会是新的任务栈中的根。
singleInstance 不允许其他 Activity 成为其任务的组成部分。它是任务中唯一的 Activity。如果它启动另一个 Activity，系统会将该 Activity 分配给其他任务 — 就好像 Intent 中包含 FLAG_ACTIVITY_NEW_TASK 一样。

singleTask和singleInstance一样，是在新的任务栈中打开，且都是新的任务栈的根。不同的是，singleTask的Activity启动另一个Activity时，可以在当前栈打开。而singleInstance启动另一个Activity时，无论Intent的Flag怎么设置，都会创建新的任务栈来启动。

关于从应用A跳到应用B后，各种模式的任务栈的分析，可以参考<http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0520/2897.html>

standard模式：
比如应用A中分享内容到应用B，打开的是应用B的Activity，此时：
旧的Android版本，新打开的Activity会在应用A的任务栈中，所以Home键后再切换到应用A，会仍旧显示那个新打开的Activity，会显得奇怪（这个可以使用上面的allowTaskReparenting转移）。
新的Android版本，新打开的Activity默认会在应用B的任务栈中，如果应用B没启动过，那么是任务B的任务栈的根。看起来就正常点。这时Home键返回应用A，看到的是应用A的操作界面。
如果重复分享来启动应用B，那么每次触发都会产生一个新的历史记录，即最近的应用列表中有多个应用B的记录。

singleTop模式：
和standard类似，区别只在于创建Activity实例。
如果栈顶已经有一个相同类型的Activity实例，Intent不会再创建一个Activity，而是通过onNewIntent()被发送到现有的Activity。即当前的Activity是singleTop模式，那么第一次会触发onCreate()，如果新打开的Activity还是当前的Activity，那么会触发onNewIntent()方法而不是创新创建一个Activity。如果要针对不同的情况做不同的处理，就可以在这两个回调中处理。
singleTop可用于搜索结果Activity、图片展示Activity等等，从当前页面点击信息后，展现的还是当前页面，只是信息内容改变。

singleTask模式：
首先更正官方文档里的说法，官方文档说：系统会创建一个新的任务，并将这个Activity实例化为新任务的根部（root）。但实际上并不会！除非更改亲和关系taskAffinity（改为空""）。更改亲和关系对standard和singleTop模式也有效。不更改亲和关系，默认是当前应用，所以standard、singleTop、singleTask的Activity都会进入默认的任务栈。
singleTask的Activity只会存在一个实例，比如singleTask的ActivityA启动了ActivityB、ActivityC，然后ActivityC再次启动ActivityA，那么ActivityA以上的ActivityB、ActivityC都会出栈（finish），ActivityA会收到一个onNewIntent()触发。（假如由于内存低，栈中的ActivityA被回收，那么ActivityB、C出栈，ActivityA只会执行onCreate()方法。这个是猜想，虽然Activity被回收，但返回栈中应该会记录着对应的Activity，因为返回栈好像不会因内存低被回收。）
案例：邮件客户端的收件箱、社交网络的时间轴等等。案例比较少。

singleInstance模式：
这个模式非常接近于singleTask，系统中只允许一个Activity的实例存在。区别在于持有这个Activity的任务中只能有一个Activity：即这个单例本身。
如果ActivityA启动了一个singleInstance的ActivityB，ActivityB启动ActivityC，那么ActivityC返回的时候，会跳过B直接显示ActivityA，ActivityA返回的时候直接退出应用。
ActivityC是标准模式，默认依附到原来的ActivityA的任务栈中，所以ActivityC返回时显示的是ActivityA。
而ActivityB是独立的任务栈，启动ActivityC后，ActivityB进入后台，但由于ActivityB的任务栈只有它自己，所以没办法通过返回来恢复ActivityB，只能重新启动ActivityB来切换到前台。
（注：之前测试的时候，应用退出后不会自动前置singleInstance的ActivityB，但后来测试的时候，应用退出后会自动前置singleInstance的ActivityB。虽然这里有点差异，但不影响singleInstance的特性。）

应用退出后，使用`dumpsys activity`还是能看到ActivityB任务栈还存在。只是没有办法调用出来。
TaskRecord{4ab94f94 #20 A=com.yuanhh.appbinderdemo U=0 sz=1}
     Intent { cmp=com.yuanhh.appbinderdemo/.BActivity }
       Hist #0: ActivityRecord{4aa17580 u0 com.yuanhh.appbinderdemo/.BActivity t20}
         Intent { cmp=com.yuanhh.appbinderdemo/.BActivity }
         ProcessRecord{4a9d3c64 11990:com.yuanhh.appbinderdemo/u0a99}
// 地址和上面一样，说明打印的是同一种情况，就是表示任务栈
TaskRecord{4ab94f94 #20 A=com.yuanhh.appbinderdemo U=0 sz=1}
 Run #1: ActivityRecord{4aa17580 u0 com.yuanhh.appbinderdemo/.BActivity t20}

再次打开ActivityA，然后启动ActivityB，此时因为ActivityB的任务栈还存在，所以ActivityB这时会重新被恢复出来。打印信息如下：
TaskRecord{4ab94f94 #20 A=com.yuanhh.appbinderdemo U=0 sz=1}
      Intent { flg=0x400000 cmp=com.yuanhh.appbinderdemo/.BActivity }
        Hist #0: ActivityRecord{4aa17580 u0 com.yuanhh.appbinderdemo/.BActivity t20}
          Intent { cmp=com.yuanhh.appbinderdemo/.BActivity }
          ProcessRecord{4a9d3c64 11990:com.yuanhh.appbinderdemo/u0a99}
TaskRecord{4ab94f94 #20 A=com.yuanhh.appbinderdemo U=0 sz=1}
  Run #2: ActivityRecord{4aa17580 u0 com.yuanhh.appbinderdemo/.BActivity t20}

可见，再次启动应用，再次打开singleInstance的ActivityB，并没有创建新的ActivityB，而是使用任务栈中已存在的ActivityB（两者地址一样）。
同理，此时ActivityB不会触发onCreate，但会触发onNewIntent。需要在onNewIntent中重新更新信息。

问题：如何将singleInstance的任务栈清除？
很简单，返回键默认就是将当前Activity从任务栈中移除。所以，当ActivityB恢复到前端显示，此时点击返回键，ActivityB就会从任务栈中清除，继而整个任务栈被清除。
比如：
ActivityA -> ActivityB -> 返回。 ActivityB被清除，任务栈也不存在。所以要singleInstance的Activity留存在内存，需要导航到别的Activity。
ActivityA -> ActivityB -> ActivityC -> 返回 -> 返回。程序退出，ActivityB任务栈还存在于内存中。
再次打开程序ActivityA -> ActivityB -> 返回。此时留存在内存的ActivityB任务栈就会被清除。

singleInstance的这种特性，可用于第三方分享APP的Activity。多个应用间都能共享内存中同一个分享Activity。

问题：可否通过最近应用列表打开singleInstance的Activity。
当singleInstance的Activity留存在内存中，除了再次启动应用，导航到对应的Activity外，还可以使这个singleInstance的Activity出现在最近任务列表中。
上面有提及，设置Activity的taskAffinity亲和关系，设置为空""，Activity就能独立，然后显示在最近应用列表中，可以通过最近应用应用列表恢复Activity。

通过最近应用打开singleInstance的ActivityB，然后返回。ActivityB的任务栈会被清除，但最近应用列表中还存在：
下面是打印出的信息

* Recent #2: TaskRecord{4aa9bdc4 #29 I=com.yuanhh.appbinderdemo/.BActivity U=0 sz=0}
* Recent #3: TaskRecord{4a9b18e8 #26 A=com.yuanhh.appbinderdemo U=0 sz=1}

这样用户就可以随时打开singleInstance的ActivityB，但不好的点是，除非用户主动从最近列表中删除记录，否则ActivityB会像其它应用程序一样持续存在在最近列表中。

注：除了以上通过Manifest设置Activity的启动模式外，还可以在代码中，启动Activity时，通过修改Intent的Flag参数来动态改变一个Activity的启动模式。
比如，
通过Intent.FLAG_ACTIVITY_SINGLE_TOP来实现singleTop这种模式
通过Intent.FLAG_ACTIVITY_CLEAR_TOP来实现singleTask这种模式，从栈中寻找实例，实例以上的都出栈。
通过Intent.FLAG_ACTIVITY_NEW_TASK来把新Activity放到新的任务栈。
以上Flag可以同时使用。

据说，在onNewIntent里要把参数中的Intent调用setIntent(intent)设置，否则getIntent会得到旧的intent，而不是new intent。


## 控件的四种基本布局：LinearLayout、RelativeLayout、FrameLayout、PercentXXXLayout


## Fragment的生命周期

## 广播的两种模式：标准广播、有序广播
## 广播的范围：本地广播、全局广播、系统广播

## 通知

## 服务
### 服务的生命周期
### IntentService服务
### 前台服务

## Binder架构
Binder架构中代表Client的Bp端及代表Server的Bn端。
Java层中Binder实际上也是一个C/S架构，而且其在类的命名上尽量保持与Native层一致，因此可认为，Java层的Binder架构是Native层Binder架构的一个镜像。


BinderProxy     Java层服务      （JAVA）
   |             |
BpBinder    JavaBBinder         （Native）
   \        /
    Binder驱动                   （Kernel）

BpBinder 客户端
JavaBBinder 服务端
通信是双方可来回传递。

### FLAG_ONEWAY
IBinder接口类中定义了一个叫FLAG_ONEWAY的整型，该变量的意义非常重要。
当客户端利用Binder机制发起一个跨进程的函数调用时，调用方（即客户端）一般会阻塞，直到服务端返回结果。这种方式和普通的函数调用是一样的。
但是在调用Binder函数时，在指明了FLAG_ONEWAY标志后，调用方只要把请求发送到Binder驱动即可返回，而不用等待服务端的结果，这就是一种所谓的非阻塞方式。

对于使用FLAG_ONEWAY的函数来说，客户端仅向服务端发出了请求，但是并不能确定服务端是否处理了该请求。所以，客户端一般会向服务端注册一个回调（同样是跨进程的Binder调用），一旦服务端处理了该请求，就会调用此回调来通知客户端处理结果。当然，这种回调函数也大多采用FLAG_ONEWAY的方式。

在Native层中，涉及的Binder调用基本都是阻塞的，但是在Java层的framework中，使用FLAG_ONEWAY进行Binder调用的情况非常多，以后经常会碰到。

- 对于代表客户端的BinderProxy来说，Java层的BinderProxy在Native层对应一个BpBinder对象。凡是从Java层发出的请求，首先从Java层的BinderProxy传递到Native层的BpBinder，继而由BpBinder将请求发送到Binder驱动。

- 对于代表服务端的Service来说，Java层的Binder在Native层有一个JavaBBinder对象。前面介绍过，所有Java层的Binder在Native层都对应为JavaBBinder，而JavaBBinder仅起到中转作用，即把来自客户端的请求从Native层传递到Java层。

- 系统中依然只有一个Native的ServiceManager。

## SystemServer
## PackageManagerService
## PowerManagerService
## ActivityManagerService
## AccountManagerService

## SharedPreferences
## SQLite
## ListView
## RecyclerView
## WebView

## Materail Design

## Socket全双工
Socket全双工表示发送缓冲区和接收缓冲区是独立的，可以同时访问。所以可以一个线程读，一个线程写同一个socket而不需要加锁。
但多个读线程、多个写线程间是需要加锁同步的，但没有这个必要。
另外，虽然已经启用了一个线程读、一个线程写，但如果访问socket的读写类是同步的，那么仍旧限制了全双工，结果还是同步的。
说这点只是提醒注意，虽然启动的时候是多线程，但线程执行期间进行了同步，结果还是有锁定的。
Since the input stream and the output stream are separate objects within the Socket, the only thing you might concern yourself with is, what happens if you had 2 threads trying to read or write (two threads, same input/output stream) at the same time? The read/write methods of the InputStream/OutputStream classes are not synchronized. It is possible, however, that if you're using a sub-class of InputStream/OutputStream, that the reading/writing methods you're calling are synchronized. You can check the javadoc for whatever class/methods you're calling, and find that out pretty quick.
<http://stackoverflow.com/questions/6265731/do-java-sockets-support-full-duplex>

### LruCache
Least Recently Used 把近期最少使用的数据从缓存中移除，保留使用最频繁的数据
public class LruCache<K, V> {
    private final LinkedHashMap<K, V> map;
}

/*实例化LruCache*/
mLruCache = new LruCache<String,Bitmap>(mTotalSize/5){

    /*当缓存大于我们设定的最大值时，会调用这个方法，我们可以用来做内存释放操作*/
    @Override
    protected void entryRemoved(boolean evicted, String key, Bitmap oldValue, Bitmap newValue) {
        super.entryRemoved(evicted, key, oldValue, newValue);
        if (evicted && oldValue != null){
            oldValue.recycle();
        }
    }
    /*创建 bitmap*/
    @Override
    protected Bitmap create(String key) {
        final int resId = mViewPager.getResources().getIdentifier(key,"drawable",
                mViewPager.getContext().getPackageName()) ;
        return BitmapFactory.decodeResource(mViewPager.getResources(),resId) ;
    }
    /*获取每个 value 的大小*/
    @Override
    protected int sizeOf(String key, Bitmap value) {
        return value.getByteCount();
    }
} ;
一般用于图片缓存。

1、LruCache 是基于 Lru算法实现的一种缓存机制；
2、Lru算法的原理是把近期最少使用的数据给移除掉，当然前提是当前数据的量大于设定的最大值。
3、LruCache 没有真正的释放内存，只是从 Map中移除掉数据，真正释放内存还是要用户手动释放。

这里也涉及到对象生命周期的管控：谁创建谁释放


## 性能优化


## 性能优化工具篇

### dumpsys命令

- account 	显示accounts信息
* activity 	显示所有的activities的信息
* cpuinfo	显示CPU信息
* window	显示键盘，窗口和它们的关系
- wifi 	显示wifi信息
- batteryinfo $package_name	电量信息及CPU 使用时长
* package packagename	获取安装包信息
* usagestats	每个界面启动的时间
* statusbar	显示状态栏相关的信息
* meminfo	内存信息（meminfo $package_name or $pid 使用程序的包名或者进程id显示内存信息）
- diskstats 	磁盘相关信息
* battery 	电池信息
* alarm	显示Alarm信息

可以通过dumpsys | grep "DUMP OF SERVICE" 仅显示主要的Service的信息
activity  - 使用`adb shell dumpsys`检测Android的Activity任务栈
window - 通过`adb shell dumpsys`命令获取当前应用的component
statusbar - 找出广告通知属于哪个应用 `dumpsys statusbar | grep notification=Notification`
usagestats 界面启动时间 `dumpsys usagestats | grep com.yua`
输出 com.yuanhh.appbinderdemo.ClientActivity: 6 starts, 0-250ms=1, 250-500ms=3, >=5000ms=1

### DDMS中的TraceView查看函数CPU执行时间
两种方式：
1. 代码中使用。
  `startMethodTracing(String traceName)`指定文件名，也可以不指定。
  `android.os.Debug.startMethodTracing();`和`android.os.Debug.stopMethodTracing();`生成一个trace文件在`/sdcard`目录中。
  从虚拟机中拉取`adb pull /sdcard/test.trace /tmp`，使用`D:\Android-SDK\tools`下面的DDMS工具打开。
2. 直接在AndroidStudio打开AndroidDeviceMonitor即可打开DDMS。
  选中要监控的进程，打开`Start Method Profiling`，操作后，再点`Stop Method Profiling`就能得到一个Trace分析文件。
  操作最好尽量短，针对特定的范围的性能检测。

TraceView中，可以看到方法被执行了多少次，花费了多少CPU，展开方法内部，是对应的子方法对于整个方法消耗的CPU占比。

### DDMS中的HierarchyView查看Layout布局层次
1. `D:\Android-SDK\tools`下面的HierarchyView工具打开
2.  直接在DDMS中打开。


## 内存泄露工具篇

### DDMS中的Dump hprof查看内存泄露
Dump hprof是保存虚拟机当前的堆快照，通过分析堆可以检查内存泄露。
1. 第一次Dump hprof文件
2. 执行一些要检查的模块的操作后，手动调用一次GC
3. 再一次Dump hprof文件

Dump hprof比较容易的是AndroidStudio中Logcat右边的Monitor比较方便。但这个Monitor和DDMS是冲突的。只能打开一个。
另外，该hprof文件格式和Eclipse的MemoryAnalyzer的hprof文件格式不一致，需要使用`D:\Android-SDK\platform-tools\hprof-conv.exe`转换。


## 多个APP运行于一个虚拟机还是一个APP运行于一个独立的虚拟机中
Android中，一个APP运行于一个虚拟机实例。虚拟机实例间底层的访问是透明的，应用层则通过虚拟机进行实例间通信。
<http://android.stackexchange.com/questions/42129/why-each-android-application-runs-on-a-different-dalvik-vm-process>
In Android, every application runs as a separate user. In the Linux kernel, each process is owned by a single user, therefore it is not possible to run multiple Dalvik applications on a single Linux process.

The overhead of running multiple Dalvik VM instance is lightweight because Linux fork() system call is copy-on-write, a write to a shared COW page will cause a "page fault" and that page will be copied; so even though most of the VM's memory region in the RAM is shared there are no "shared state" between VMs.

Forking processes provides only state isolation, but not privilege isolation.

dalvik vm should not be considered a security boundary

That is because the VM cannot enforce a security boundary. The VM is running on user mode (the same mode as the program it's executing), which means a bug in the VM might allow the application to modify VM state in a way that is not intended; the kernel, however, runs in privileged mode and can enforce security boundary.
Each Dalvikvm process runs under a sand-boxed environment owned by the user id (uid) of the application running, it should be noted that upon installation of the application, the uid is allocated and assigned to each installed application.

The net result is that each running application cannot trample another's process due to the different  uid assigned, that grants the protection for the running apps.

Another way of looking at it is this - had there being one common uid for all applications, then a malicious application can really cause havoc, be peering into one's settings, override, intercept another application's running code and do all sorts of bad thingsTM to that application.

## 存储设备
分为内部存储、外部存储。外部存储分为公有目录、私有目录、其它目录。

内部存储：/data/data/包名/   包含：shared_prefs、databases、files、cache
外部存储：/mnt/sdcard 或 /storage/sdcard 下的存储设备（mnt或storage，由厂商决定，通常是storage)。
公有目录：/DOWNLOAD、/DCIM等等，包含：图片、下载、文档、音乐等等九大目录。
私有目录：/storage/sdcard/Android/data/包名/  包含：files、cache
其它目录：/storage/sdcard/xxx  自定义路径

公有目录：存放可以让系统识别的文件。
私有目录：程序私有，不会被系统识别。
比如，APP生成一张图片，如果希望图片被系统图片浏览程序识别，则放到公有目录；如果希望图片仅仅用于APP自身，则放到私有目录。

读写权限区分：
内部存储只能被应用自身读写，其它应用需要Root权限。
外部存储中的私有目录、公有目录、其它目录等都可以直接读写。
即：
/data/data/包名/目录，只有应用自身能读写，第三方读写需要ROOT权限。
而：
/storage/sdcard目录下的所有文件，应用间都可以直接读写！
/storage/sdcard/Android/data/包名/目录，第三方不需要ROOT权限就可以读写。

路径又分为：含有包名，不含包名。
含有包名：因为和APP相关，通常使用Context获取路径。主要用于存放与APP相关的数据，应用卸载时会删除。
    // 内部存储
    - context.getFilesDir()   // </data/data/包名/files目录>
    - context.getCacheDir()   // </data/data/包名/cache目录>
    // 外部存储
    - context.getExternalFilesDir()  // </storage/sdcard/Android/data/包名/files目录>
    - context.getExternalCacheDir()  // </storage/sdcard/Android/data/包名/cache目录>
不含包名：不和APP相关，通常使用Environment获取路径。
    - Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM)

注：含有包名的目录，应用卸载时，都会被删除！所以如果是需要保留的文件，需要放到其它目录。
