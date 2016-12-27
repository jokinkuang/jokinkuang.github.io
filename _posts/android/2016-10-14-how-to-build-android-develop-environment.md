---
layout: post
title: 如何搭建Android的开发环境
categories:
date: 2016-10-14 16:31:35
pid: 20161014-163135
image: android/android.jpg
# you can override the settings in _config.yml here !!
---
初接触Android需要了解的一系列东西

{% include toc %}

## 基本术语

### IDE
IDE (Integrated Development Environment)，中文为集成开发环境，通俗来说就是开发工具。
常见的IDE有：

* Visual Studio `windows`
* Android Studio `android`
* Xcode `ios`
* Eclipse
* MyEclipse

### JRE
JRE (Java Runtime Environment)，中文为Java运行时环境，通俗来说是运行Java程序的环境。

### JDK
JDK (Java Development Kit)，中文为Java开发工具包，通俗来说是开发Java程序的环境。

### SDK
SDK (Software Development Kit)，中文为软件开发工具包，Android SDK指开发安卓软件的工具包。

> 通常，IDE与SDK是独立的，因为IDE会支持各种语言的SDK，但为了方便，一般都有集成了某个SDK的IDE版本

### API
API (Application Programming Interface)，中文为应用程序编程接口，通俗来说，其实就是一系列的函数而已。开发者通过调用API来使用平台的功能。API也算是SDK里提供的接口，不同版本的SDK提供的API有可能不同。

### JNI
Android项目里会看到不少jni，JNI (Java Native Interface)，中文为Java本地接口，提供了若干的API实现了Java和其他语言的通信（主要是C&C++），允许Java代码与其它代码进行交互。

### NDK
JNI的开发工具包即是NDK (Native Development Kit)，所以如果需要使用C++等语言开发Android，则需要NDK工具包，AndroidStudio插件管理可以安装。AndroidStudio默认不安装NDK，因为如果使用JAVA开发Android是不需要NDK工具包的。

### Android SDK
安卓开发工具包，Android的SDK管理工具叫SDK Manager，在Android SDK根目录下。为什么不像JDK一样，Android SDK叫ADK呢~

Android SDK目录：

![sdk-folder][sdk-folder]

Android SDK Manager界面：

![sdk-manager][sdk-manager]

Android SDK是一个统称，包含着以下这些东西：

* Android SDK `开发工具包`
* AVD `安卓模拟器`
* ADB `安卓调试连接桥`
* Build-Tools `编译构建工具集`
* Platform-Tools

> 所以，如果编译运行期间出现缺失某个组件的错误，可以通过Android SDK Manager来下载修复。

### AVD
AVD (Android Virtual Devices)，中文为安卓虚拟设备，即安卓模拟器设备。AVD管理工具叫AVD Manager，在Android SDK根目录下，也算是Android SDK的一部分。

![avd-manager][avd-manager]

### ADB
ADB (Android Debug Bridge)，中文为安卓调试桥，用于与安卓模拟器通信，是`Android-SDK/Platform-Tools/adb.exe`。

### Build Tools
Build Tools也是Android SDK的一部分，如果打开一个工程提示`failed to find Build Tools revision XXX`表示当前系统没有下载对应的Build Tools

![build-tools-not-found][build-tools-not-found]

Build Tools管理也在Android SDK管理工具里：

![build-tools-manager][build-tools-manager]

### Platform Tools
同样Platform Tools也可以通过Android SDK管理器管理。



[sdk-folder]: {{ site.images_url }}android/sdk-folder.jpg
[sdk-manager]: {{ site.images_url }}android/sdk-manager.jpg
[avd-manager]: {{ site.images_url }}android/avd-manager.jpg
[build-tools-not-found]: {{ site.images_url }}android/build-tools-not-found.jpg
[build-tools-manager]: {{ site.images_url }}android/build-tools-manager.jpg

### Gradle
Gradle是自动构建工具，用于描述项目的构建过程，并提供项目自动构建。Gradle的版本不同可能会导致项目编译构建失败。

## 安装Android Studio
网上搜索下载一个集成了Android SDK的Android Studio的安装文件，选择目录时建议使用**英文且无空格的路径**，这是为了避免后续不必要的麻烦（据说某个组件的路径不能含空格）。

Android Studio和Android SDK是独立的，所以也可以单独下载。

Android Studio启动导入Android项目时，会自动执行Gradle同步项目配置，期间出现错误几乎都有对应的修复提示，所以不用担心。

## Android Studio的使用
以下只列举遇到过的问题

### 更改项目的Android-SDK目录

### 更改项目的JDK版本

以上两个更改可以通过：`File -> Project-Structure`更改

![project-structure-inner][project-structure-inner]

### 当前项目的Compile SDK Version和Build Tools Version查看与设置
`File -> Project-Structure - Modules - app`

![compile-sdk-setting][compile-sdk-setting]

### Gradle设置
Gradle可以选择默认版本或手动指定版本，在`File - Settings - Build/Execution/Deployment - Build-Tools - Gradle`设置。

![gradle-setting][gradle-setting]

Gradle分为Gradle版本和AS Gradle Plugin插件版本，两者是不同的，前者是Gradle工具的版本，后者是AS的Gradle插件版本，`build.gradle`里`com.android.tools.build:gradle:2.1.2`指的是AS插件版本。

当前项目的Gradle版本和插件版本查看与设置：

![gradle-setting2][gradle-setting2]

分别对应于根目录的`build.gradle`里的：

```
dependencies {
    classpath 'com.android.tools.build:gradle:2.1.2'
}
```
与根目录下`gradle\wrapper\gradle-wrapper.properties`里的：

```
distributionUrl=https\://services.gradle.org/distributions/gradle-2.10-all.zip
```

> 一般来说，修改了Gradle设置，就需要调用Sync Project with Gradle Files操作。曾经试过修改版本号，导致The APK file not exist on disk错误，清理项目重新编译都不行，直到同步Gradle后。


### 字体设置
字体设置很重要，因为习惯了大字体看代码，在`File - Settings - Editor - Colors&Fonts - Font`设置。
**注意**，需要先将默认方案另存为才能设置，默认的不支持改变。

![font-setting][font-setting]

### Tab文件面板设置
`Settings - Editor - General - EditorTabs`可以设置Tab的限制数目、打开文件的策略、布局等。

还有另外一个地方设置，这里有一个上面不支持的选项：`Open New Tabs At The End`
`Window - EditorTabs - 勾选Open New Tabs At The End`个人觉得这个选项挺好用

### Build Variants设置
`View - Tool Windows - Build Variants`可以选择项目编译的方案是Debug还是Release，对应于项目的`build.gradle`中的：

```
productFlavors {
    instant {
        minSdkVersion 21
    }
}
```
上面的配置在`Build - Make Project`操作后，将生成两个Build Variants：`instantDebug`与`instantRelease`。你可以在对应的Build Variants定制编译方案。

### 设置文件头的作者信息
`Settings - Editor - File and Code Templates - Includes - File Header`默认是

```
/**
 * Created by ${USER} on ${DATE}.
 */
```
修改为自己的名字即可

### 插件管理
`Settings - Plugins`这里可以禁用或启用Gradle插件。

### 快捷键查看
`Help - Default Keymap Reference`

## 错误与解决方案

### 查看是否有错误
AS右下角的感叹号符号如果为红色，则表示出现了错误。出现错误后，Event-Log也会有对应的错误输出。但是，**注意**，出现了错误后在修复前最好先清空日志，因为这样才知道问题是否已经修复，否则历史错误信息会一直存在在窗口中，混淆视线。

### adb.exe (拒绝访问)
出现这个问题，是因为有程序占用了`Android-SDK\platform-tools`目录，导致AS无法访问。关闭可能占用该目录的程序即可。或者下载Unlocker查看哪个进程占用了该目录。
我这边出现这个问题是因为另一个第三方的模拟器没有关闭，仍旧占用着ADB。

### 开启了Instant Run导致的错误
Instant Run也是一个会影响编译成功与否的选项，下面是其中一个错误：

Error running app: Instant Run requires ‘Tool - Android - Enable ADB integration’ to be enabled。

![adb-enable][adb-enable]
按照提示操作即能解决。

另一个引起的错误是，Gradle同步失败：`Unsupported method: AndroidProject.getPluginGeneration()`.

解决方案是：`File - Settings - Build/Execution/Deployment - InstantRun` 禁用即可。

![instant-run-setting][instant-run-setting]


[project-structure-inner]: {{ site.images_url }}android/project-structure-inner.jpg
[compile-sdk-setting]: {{ site.images_url }}android/compile-sdk-setting.jpg
[adb-enable]: {{ site.images_url }}android/adb-enable.jpg
[gradle-setting]: {{ site.images_url }}android/gradle-setting.jpg
[gradle-setting2]: {{ site.images_url }}android/gradle-setting2.jpg
[font-setting]: {{ site.images_url }}android/font-setting.jpg

[instant-run-setting]: {{ site.images_url }}android/instant-run-setting.jpg
