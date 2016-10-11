---
layout: post
title: 如何搭建ios的开发环境
categories:
date: 2016-9-27 15:30:35
pid: 20160927-153035
image: ios/ios.png
# you can override the settings in _config.yml here !!
---
空白的电脑下搭建ios的开发环境

{% include toc %}



## 安装Xcode
在appStore里搜索Xcode然后安装即可



## 安装CocoaPods工具
[CocoaPods](https://cocoapods.org/)是第三方插件管理工具，安装很简单：

`sudo gem install cocoapods`

下面是官网提供的针对不同的Xcode版本的安装命令：

```
# Xcode 7 + 8
$ sudo gem install cocoapods --pre

# Xcode 7
sudo gem install activesupport -v 4.2.6
sudo gem install cocoapods
```
如果没有提示版本太低，则可以略过下面。

### 更新ruby
上面安装cocoapods错误，提示activesupport要求的ruby版本不能低于2.2.2。

mac系统自带的ruby很可能不到2.2.2，而且由于ruby所在的/usr/bin/开启了写保护(EI Capitan)，即使root权限也无法修改，所以需要安装在/usr/local/bin下，这样会优先加载/usr/local/bin下面的程序，而用户对于/usr/local/bin是有写权限的。

要程序能在/usr/local/bin下，只需要创建一个软链接(windows下的快捷方式)：

`ln -s /the-absolute-path /usr/local/bin/your-shell`

因为网上的教程实在是有点摸不着头（只有命令没有解释），所以重新整理了一下。

**思路一**

直接安装ruby的更高版本，然后链接到/usr/local/bin下面。可以使用github下载源码：

`git clone git://github.com/ruby/ruby.git 或 https://github.com/ruby/ruby.git`

本地编译时发现要使用autoconf和automake，就放弃了。

你也可以安装[Homebrew](http://brew.sh)，Homebrew相当于ubuntu下的apt-get工具，安装的时候会安装autoconf、automake等源码编译工具，然后通过`brew install ruby`安装最新版的ruby。

安装Homebrew也很简单，官网也有教程：

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

因为之前试过使用Homebrew安装的ruby是在其它目录，所以得手动链接到/usr/local/bin目录里面。

ruby源码安装

```
cd ruby
autoconf
./configure
make
make install
```
不过，因为源码和当前的mac系统不兼容，所以编译是失败的，除非checkout旧版本的ruby源码。

**思路二**

通过rvm对ruby版本进行管理，可以使多个ruby版本共存。rvm的安装在官网[rvm.io](http://rvm.io/)也有教程：

`\curl -sSL https://get.rvm.io | bash -s stable`

安装完毕后，重启终端才会生效，执行下面命令自动安装ruby：

`rvm install ruby`

没想到找不到二进制格式，rvm需要下载源码本地编译，于是rvm自动提示安装Homebrew。Homebrew安装完后就开始自动编译ruby2.3.0，但最后由于ruby2.3.0版本还不兼容当前的mac版本，所以编译失败而导致安装ruby2.3.0失败。

虽然高版本的ruby安装失败，但是我们可以试着安装它提示的版本2.2.2：

`rvm install 2.2.2` 这就是安装ruby2.2.2的命令

安装成功！

> 关于上面的rvm命令，可以使用rvm help install命令查看帮助，很详细！



## CocoaPods的使用

### pod setup
运行`pod setup`进行本地设置。

#### 卡住了
`pod setup`的时间其实也算比较长，所以看起来像卡住，但其实不一定。

- 在执行时，加上`--verbose`/`-V`/`-v`选项。
- 在执行时，切换到~/.cocoapods，然后不定时的查看文件夹的容量`du -sh`，如果容量在变大说明正在工作中，整个大概300M。

如果真的卡住了，可能是下载太慢。
可以前往<https://github.com/CocoaPods/Specs>，下载所有文件，然后拷进~/.cocoapods/repos/master/里面。据说都是第三方插件的索引文件。

### pod install
在Xcode项目内找到Podfile所在，然后执行`pod install`即能进行第三方插件的安装和配置。

pod install过程也会有各种坑。

1. git的缓存太小问题，导致git下载时失败。运行`git config -e`编辑设置更大的值。
    [http]
        postBuffer = 1648576000
        maxRequestBuffer = 884857600000000
2. curl进行http下载时超时失败。这个没办法，网络问题，只有不断重试。



## Protobuf的安装
Mac下安装protobuf的简单教程，不同时期，安装方式可能不一样，现在的已经非常简单

### 下载源码
`git clone https://github.com/google/protobuf.git`

### 编译
`cd protobuf`
`./autogen.sh`
`./configure`
`make`

### 安装
`make install`

### 查看
`protoc --version`

> 一如既往的configure、make、make install。

### 旧版本
[github-protobuf](https://github.com/google/protobuf) - [commit/branches/releases/contributors] - 点击[releases](https://github.com/google/protobuf/releases) - 点击[tags](https://github.com/google/protobuf/tags) - 找到需要的旧版本即可

### Points

1. ./autogen.sh是获取GoogleMock，并生成对应的configure脚本
2. ./configure是进行环境检测，并生成对应的makefile或Makefile
    `--prefix=/usr/local`可以指定安装路径
3. make，按照makefile编译工程
4. make install，执行makefile里面的install部分，进行安装
    `--prefix=/usr/local`可以指定安装路径
