---
layout: post
title: ios真机测试教程
categories:
date: 2016-10-10 16:01:45
pid: 20161010-160145
image:
# you can override the settings in _config.yml here !!
---
真机测试是ios开发中非常重要的一步，会涉及到麻烦的证书问题，还会遇到一堆错误  

{% include toc %}

## 选项设置
无非是这几个选项

### Preferences
Xcode - Xcode菜单 - Preferences

![preferences][preferences]

### Account
Preferences - Account

![account][account]

### Devices
Xcode - Window - Devices

![devices][devices]

### keychain
Command+Space - 输入keychain - 打开钥匙串访问(keychain access)

![keychain][keychain]

### General

### Build Settings

### Capabilities

### Targets

以上四个选项见下图：

![settings][settings]

## Bundle Identifier字符串
这个字符串和Apple ID绑定，并签发一个有效期为7天的证书，如果该字符串被别人的Apple ID占用了，则无法使用！除非7天有效期过期才可以重新使用！如果字符串被占用，会提示:Failed to create provisioning profile.The app ID cannot be registered to your development team。另外，一个Apple ID可以创建多个不同Bundle Identifier字符串的证书，但可能只有最新的有效（没有测试）。

Bundle Identifier设置：

![identifier][identifier]

自动生成的相对应的证书和有效期：

![sign][sign]

## Xcode7.0以上真机测试
Xcode7以上版本不再需要自己管理麻烦的证书，Xcode提供了自动管理功能，只需要一个Apple ID就能轻易完成真机测试。

1. 连接iPhone手机
2. 选择调试的机器为连接的手机
    ![realdevice][realdevice]
3. 设置BundleIdentifier字符串
4. 勾选Automatically manager signing
5. 输入AppleID并选中
    ![realdevicesetting][realdevicesetting]
6. 编译即完成真机调试

### 出现错误：Could not find Developer Disk Image
出现这个错误是因为iPhone真机的IOS版本比Xcode支持的IOS版本要高，导致Xcode无法识别手机。

修复方案：

1. 下载并添加对应的IOS版本的SDK。

    查看iPhone真机的IOS版本

    ![device-not-found][device-not-found]

    下载对应的SDK放到目录`/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport`下
    
    ![devicesupport][devicesupport]

    > 打开目录有两种方式：
    > 1. 终端里使用open命令打开
    > 2. Finder - 应用程序 - Xcode - 右键 - 查看包内容 - Contents...

2. 更新Xcode。

### 出现错误：Failed to create provisioning profile The app ID cannot be registered
出现这个错误是由于字符串已经被别的Apple ID占用，使用别的BundleIdentifier字符串即可。错误提示里也有此修复方案的说明。

### 出现错误：The "In-App Purchase" feature is only avaliable to users enrolled
这个错误提示是，"In-App Purchase"特性是付费用户的特性，当前账号是免费开发者账号。出现这个错误，是因为项目使用了Apple的付费相关的接口。只需要禁用这个接口即可修复这个错误。

在项目设置里，选择General页，拉到最下面的Linked Frameworks and Libraries，选中StoreKit.framework并删除。

删除StoreKit.framework即可。
![storekit][storekit]

[preferences]: {{ site.images_url }}ios/preferences.jpg
[account]: {{ site.images_url }}ios/account.jpg
[devices]: {{ site.images_url }}ios/devices.jpg
[keychain]: {{ site.images_url }}ios/keychain.jpg
[settings]: {{ site.images_url }}ios/settings.jpg

[identifier]: {{ site.images_url }}ios/identifier.jpg
[sign]: {{ site.images_url }}ios/sign.jpg

[realdevice]: {{ site.images_url }}ios/realdevice.jpg
[realdevicesetting]: {{ site.images_url }}ios/realdevicesetting.jpg

[device-not-found]: {{ site.images_url }}ios/device-not-found.jpg
[devicesupport]: {{ site.images_url }}ios/devicesupport.jpg

[storekit]: {{ site.images_url }}ios/storekit.jpg
