---
layout: post
title: Object-C基础教程
categories: ios
date: 2016-9-9 16:08:30
pid: 20160909-160830
# you can override the settings in _config.yml here !!
---
学习object-c的笔记，提取于object-c基础教程第二版

{% include toc %}

## 基本特性

### main

```object-c
#import <Foundation/Foundation.h>
int main (int argc, const char *argv[])
{
  NSLog(@"Hello world!");
  return 0;
}
```

### @
object-c中，@符号是表示对C语言的扩展，以@开头的说明是扩展功能，比如大部分的面向对象特性，@"字符串"等

### import

import和java中的一样，保证头文件只被包含一次

### @string

@符号表示将字符串作为NSString字符串对象处理，而不是普通的c字符串

## NSLog
NSLog(@"%d %@", 5, @"helloworld");
输出参数和c一样，object-c只是扩展了c没有的功能，**c原有的功能仍旧保留着**
%d：整数
%s: 字符串
%lu：long
%@：NSString对象__指针__

尽量使用NSLog来输出日志，而不再使用printf

### Boolean

object-c只有`YES`和`NO`两个BOOL值

> 注：object-c中的BOOL其实是signed char类型，占用8位，1字节，如果将大于1字节的值赋给BOOL类型的变量，那么只取低8位。比如：0x2300得到的BOOL值为0，即NO值

YES为整型1，NO为整型0，和c的true和false是有区别的：
`if (23-5 == YES)`是false，因为`if (18 == 1)`是false
`if (1 == YES)`才是true
但是
`if (23-5)`是true，因为它没有与YES和NO比较，而是传统c语言的条件语句

> 和`YES`和`NO`比较，仅仅是与`(int)0`和`(int)1`的比较

### m、mm和cpp
object-c的源文件后缀可以是c、cpp、m、mm，很容易理解：
c是只支持c语言
cpp是c语言扩展了c++，所以支持c++和c语言
m是c语言扩展了object-c，所以支持object-c和c语言
mm是object-c扩展了c++，所以支持object-c和c++和c语言

### @class
类前置声明，头文件可以使用@class声明，然后在源文件中#import所需的头文件。
但是如果用于继承，只能使用#import，因为继承编译器需要立即获取父类的详细结构。

> 这个类似于c语言隐藏结构体的方式，只有仅使用指针的时候才能隐藏，使用结构体变量时必须在声明前暴露结构体的结构定义。

在A类引用B类，B类引用A类的情况下，不能使用#import，只能使用@class声明。
即A类中@class B，B类中@class A。

## 面向对象特性

### {}花括号
{}花括号表示创建对象时的模板

### 方法声明
+ (void) setColor: (Color)color atIndex: (int)index;
- (Color) getColor;

`+/- (返回值) 方法名: (参数1类型)形参1 参数2描述: (参数2类型)形参2 ;`  勿忘记分号！

+表示静态方法，-表示实例方法，只有这两种。

### 方法实现
+ (void) setColor: (Color)color atIndex: (int)index
{
  //TODO
}

### 方法调用
[myColor setColor: red atIndex: 2];

`[实例名 方法名: 实参1 参数2描述: 实参2] ;`

### get方法
object-c中，get方法一般将参数作为指针来返回值，即对于get方法一般传入指针来获取需要的值。
对于自己设计的get方法一般也要遵循这个规则。

### @interface接口

@interface Circle: NSObject
{
@public
@protected
@private
  Color _color;     //继承NSObject，并添加自己的Color属性
}
- (void) setColor: (Color) color;
- (void) draw;
@end

### @implementation实现

@implementation Circle

- (void) setColor: (Color) c
{
  self._color = c;
}

@end

### 实例化
Circle *shape = [Circle new];
很显然，这里有了new还需要释放！

### 继承
object-c只能单一继承，java也是单一继承，只有C++才有多重继承

### 访问当前对象自己
使用self即可

### 访问父类对象
使用super即可

### 自定义NSLog(对象)的输出信息
重写对象的description即可

- (NSString *) description
{
  return (@"I am a new NSLog output");
}

### if(self = [super init])
为了让父类将所有需要的初始化工作一次完成，需要调用[super init]。init的返回值是一个被初始化对象的id类型数据（即泛型对象指针）。
将[super init]返回值赋给self是object-c的惯例。

## XCode

### 改变源文件头部注释信息
ProjectDocument - Organization文本框 - 输入新的公司名（或个人名字）

### 快捷键

#### 导航栏面板
Command + 1-7   分别选中第一个到第7个面板

#### 段落缩进
Command + [ / ]

#### 自动补全
Command + space 弹出代码补全窗口
Control + . 向后翻页
Control + shift + . 向前翻页
Tab 接受代码补全

#### 创建快照
Command + Control + S 对于重大操作前可以先创建一个快照，失败后也可以恢复过来

#### 全局修改类名

#### Emacs文档编辑快捷键
Control + F   光标前移
Control + B   光标后移
Control + P   光标移到上一行
Control + N   光标移到下一行
Control + A   光标移到行首
Control + E   光标移到行尾
Control + D   删除光标右边的一个字符
Control + K   删除光标右边所有字符
Control + L   光标显示到窗口中间

#### 快速打开文件
Command + Shift + D

#### 文档切换
Command + Control + 向上      打开相配套的文件
Command + Shift + 向左/向右   切换到上一个文档或下一个文档

#### 获取文档帮助
option + 点击类名


## 框架

### Foundation框架
主要是NSXXX对象，比如NSString、NSArray、NSEnumerator、NSNumber等100多个类

### CoreFoundation框架
CoreFoundation是纯C语言编写的，函数或变量以CF开头。
Foundation框架是以CoreFoundation框架为基础创建的，几乎都有CoreFoundation的NS版本。

### CoreGraphics框架
用于处理集合图形，以CG开头的类。

### AppKit
AppKit是基于OS X平台（Mac），比如NSColor

### UIKit
UIKit是基于IOS平台（iPhone），比如UIColor

## 一些有用的数据类型

### NSRange

```c
typedef struct _NSRange
{
  unsigned int location;
  unsigned int length;
} NSRange;
```
表示相关事物的范围，比如`Object-C is a cool language`中，单词cool可以用`NSRange(17, 4)`表示。

创建NSRange有三种方式：
1，字段赋值

```c
NSRange range;
range.location = 17;
range.length = 4;
```

2，结构体赋值
`NSRange range = {17, 4};`

3，Cocoa提供的快捷函数
`NSRange range = NSMakeRange(17, 4);`

NSMakeRange可以在任何函数调洪的地方使用，比如`[obj setWithRange: NSMakeRange(0,10)]`

### CGPoint和CGSize和CGRect

```c
struct CGPoint
{
  float x;
  float y;
}
struct CGSize
{
  float width;
  float height;
}
struct CGRect
{
  CGPoint origin;
  CGSize size;
}
```
同样Cocoa也提供了类似的快捷函数：CGPointMake()、CGSizeMake()、CGRectMake()。

> 据说使用结构而不使用对象是因为可以提高性能，尤其在UI布局的时候

### 字符串

```c
NSString *height;
height = [NSString stringWithFormat:@"Your height is %d feet, %d inches", 5, 11]
// height = "Your height is 5 feet, 11 inches"
```
很显然，stringWithFormat是NSString类的静态方法。
