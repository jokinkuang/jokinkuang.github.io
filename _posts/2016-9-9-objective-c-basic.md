---
layout: post
title: Objective-C基础教程
categories: Mac ios
date: 2016-9-9 16:08:30
pid: 20160909-160830
# you can override the settings in _config.yml here !!
---
学习Objective-C的笔记，提取于Objective-C基础教程第二版

{% include toc %}

## 基本特性

### main

```objective_c
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

### NSLog

```objective_c
NSLog(@"%d %@", 5, @"helloworld");
```
输出参数和c一样，object-c只是扩展了c没有的功能，**c原有的功能仍旧保留着**
%d：整数
%s: 字符串
%lu：long
%@：NSString对象_指针_

尽量使用NSLog来输出日志，而不再使用printf

### BOOL

object-c只有`YES`和`NO`两个BOOL值

> 注：object-c中的BOOL其实是signed char类型，占用8位，1字节，如果将大于1字节的值赋给BOOL类型的变量，那么只取低8位。比如：0x2300得到的BOOL值为0，即NO值

YES为整型1，NO为整型0，和c的true和false是有区别的：
`if (23-5 == YES)`是false，因为`if (18 == 1)`是false
`if (1 == YES)`才是true
但是
`if (23-5)`是true，因为它没有与YES和NO比较，而是传统c语言的条件语句

> 和`YES`和`NO`比较，仅仅是与`(int)0`和`(int)1`的比较

### nil值
nil值表示空对象或NULL值，可以作为对象参数传递，也可以作为指针传递。

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

```objective_c
+ (void) setColor: (Color)color atIndex: (int)index;
- (Color) getColor;
```

`+/- (返回值) 方法名: (参数1类型)形参1 参数2描述: (参数2类型)形参2 ;`  勿忘记分号！

+表示静态方法，-表示实例方法，只有这两种。

### 方法实现

```objective_c
+ (void) setColor: (Color)color atIndex: (int)index
{
  //TODO
}
```

### 方法调用
[myColor setColor: red atIndex: 2];

`[实例名 方法名: 实参1 参数2描述: 实参2] ;`

### get方法
object-c中，get方法一般将参数作为指针来返回值，即对于get方法一般传入指针来获取需要的值。
对于自己设计的get方法一般也要遵循这个规则。

### @interface接口

```objective_c
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
```

### @implementation实现

```objective_c
@implementation Circle

- (void) setColor: (Color) c
{
  self._color = c;
}

@end
```

### 实例化

```objective_c
Circle *shape = [Circle new];
```
很显然，这里有了new还需要释放！

### 继承
object-c只能单一继承，java也是单一继承，只有C++才有多重继承

### 访问当前对象自己
使用self即可

### 访问父类对象
使用super即可

### 自定义NSLog(对象)的输出信息
重写对象的description即可

```objective_c
- (NSString *) description
{
  return (@"I am a new NSLog output");
}
```

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

## 一些有用的数据结构而不是对象

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
> 另外，因为是结构体，所以存储到集合里面，必须先转换为对象！

### 便捷的转换为对象的方法
`+ (NSValue *) valueWithPoint: (NSPoint)aPoint;`
`+ (NSValue *) valueWithSize: (NSSize)size;`
`+ (NSValue *) valueWithRect: (NSRect)rect;`
`- (NSPoint) pointValue;`
`- (NSSize) sizeValue;`
`- (NSRect) rectValue;`

```objective_c
NSValue *value;
value = [NSValue valueWithRect: rect];
[array addObject: value];

value = array[0];
NSRect aRect = [value rectValue];
```

## 字符串

### 字符串不可变！
NSString和java中的String一样，是不可变的，只能重新构造。
正如java中有StringBuffer一样，如果你需要可变字符串，则使用NSString的子类NSMutableString。

### 格式化字符串

```c
NSString *height;
height = [NSString stringWithFormat:@"Your height is %d feet, %d inches", 5, 11];
// height = "Your height is 5 feet, 11 inches"
```
很显然，stringWithFormat是NSString类的静态方法。

### 字符串长度
`- (NSUInteger) length;`
NSUInteger length = [height length];

### 字符串比较

* 判断字符串是否相等
    `- (BOOL) isEqualToString: (NSString *)aString;`
* 区分大小写比较
    `- (NSComparisionResult) compare: (NSString *) aString`
* 设置参数的比较
    `- (NSComparisionResult) compare: (NSString *) aString options: (NSStringCompareOptions) mask;`

```objective_c
if ([height1 isEqualToString: height2])  // 没有和YES或NO比较，是传统的c语言if格式
{
  NSLog(@"They are the same!")
}

enum
{
  NSOrderedAscending = -1,
  NSOrderedSame,
  NSOrderedDescending
};
typedef NSUInteger NSComparisionResult;
// 其实和c的compare差不多，只不过用枚举值作为比较结果

// 不区分大小比较
if ([height1 compare: height2 options: NSCaseInsensitiveSearch])
{
  /* code */
}

options：
NSCaseInsensitiveSearch: 不区分大小写字符
NSLiteralSearch：区分大小写字符
NSNumericSearch: 比较字符串字符个数而不是字符串值（没有这个选项，字符串100会比99小）

// Eg. 忽略大小写并按字符个数进行排序：
if ( [str_val1 compare: str_val2 options: NSCaseInsensitiveSearch | NSNumericSearch] == NSOrderedSame)
{
  NSLog(@"They match!");
}
```

### 字符串查找

* 查找字符串前缀
    `- (BOOL) hasPrefix: (NSString *) aString;`
* 查找字符串后缀
    `- (BOOL) hasSuffix: (NSString *) aString;`
* 字符串包含
    `- (NSRange) rangeOfString: (NSString *) aString;`

```objective_c
// 字符串前后缀查找
NSString *fileName = @"draft-chapter.pages";
if ([fileName hasPrefix: @"draft"]) {
  NSLog(@"The fileName start with \"draft\"");
}
else if ([fileName hasSuffix: @".mov"])
{
  NSLog(@"The fileName end with \".mov\"");
}

// 字符串包含，注意返回值是NSRange结构体而不是BOOL，所以不要直接判断真假
NSRange range = [fileName rangeOfString: @"draft"];
if (range.location != NSNotFound) {
  NSLog(@"The fileName contains \"draft\"");
}
// 上面得到的range为{location = 6, length = 7}
```

### NSMutableString
可变字符串，常用方法：

1. 初始化
    `+ (id) stringWithCapacity: (NSUInteger) capacity;` 预设字符串容量
2. 增加
    `- (void) appendString: (NSString *) aString;`
    `- (void) appendFormat: (NSString *) format,...;`
3. 删除
    `- (void) deleteCharactersInRange: (NSRange) aRange;`


## 集合

### NSArray
NSArray是**有序**列表，可放入**任意类型**的对象，但一旦创建就不可变，只能重新构建！

> NSArray只能存储Objective-C对象，不能存储如int、float、enum、struct等c语言类型数据。而且不能存储nil值。

```objective_c
NSArray *array = [NSArray arrayWithObjects: @"one", @"two", @"three", nil];
NSArray *array1 = @[@"one", @"two", @"three"];
```
1. 因为nil是作为arrayWithObjects的列表结束符，所以这是NSArray不能存储nil的原因之一。
2. 字面值初始化NSArray数组，以@[]形式，@开头的表示object-c扩展，表示在c数组初始化上的扩展。

NSArray访问越界会抛出异常。

常用方法：

1. 数组长度
    `- (NSUInteger) count;`
2. 索引
    `- (id) objectAtIndex: (NSUInteger) index;`
3. 字符串切换成数组

   ```objective_c
   NSString *string = @"oop:ack:bork:greeble:ponies";
   NSArray *chunks = [string componentsSeparatedByString: @":"];
   string = [chunks componentsJoinedByString: @":-)"];
   // chunk为 ["oop", "ack", "bork", "greeble", "ponies"]
   // string为 "oop:-)ack:-)bork:-)greeble:-)ponies"
   ```

### NSMutableArray
NSMutableArray和NSArray几乎一样，除了数据长度可变外。

常用方法：

1. 初始化
    `+ (id) arrayWithCapacity: (NSUInteger) numItems;` 预设数组容量
2. 增加
    `- (void) addObject: (id) anObject;`
3. 删除
    `- (void) removeObjectAtIndex: (NSUInteger) index;`

### 枚举
遍历集合除了下标遍历外，还可以使用枚举器遍历。

1. 从集合得到枚举器
    `- (NSEnumerator *) objectEnumerator;`
    `- (NSEnumerator *) reverseObjectEnumerator;` 从后往前的枚举器
2. 访问下一个对象
    `- (id) nextObject;`
3. 如果nextObject为nil表示循环结束（这也是为什么NSArray的元素不能为nil的另一个原因）

> 如果你正在对可变数组进行枚举遍历，需要注意，枚举过程不要修改数组，否则枚举器会出错。

### 快速枚举
Objective-C 2.0添加了快速枚举。

```objective_c
for (NSString *string in array)
{
  NSLog(@"string in array: %@", string);
}
```

Objective-C 2.0之前，不能用快速递归，不过可以使用代码块：
`- (void) enumerateObjectsUsingBlock: (void (^)(id obj, NSUInteger idx, BOOL *stop)) block;`
block其实是一个函数指针

```objective_c
[array enumerateObjectsUsingBlock: ^(NSString *string, NSUInteger index, BOOL *stop){
  NSLog(@"string in array: %@", string);
}]
//匿名函数作为实参
```

### NSDictionary
字典，也叫Map、散列表、关联数组。同样，NSDictionary不可变！

常用方法：

1. 初始化
    `+ (id) dictionaryWithObjectsAndKeys: (id) firstObject, ...;`
    NSDictionary *tires = [NSDictionary dictionaryWithObjectsAndKeys: t1, @"first", t2, "second", nil];
    或
    NSDictionary *tires = @{ @"first":t1, @"second":t2 };
2. 访问
    `- (id) objectForKey: (id) aKey;`
    或
    `dictionary[aKey];`
    字典中没有该值，返回nil值。

### NSMutableDictionary
可变字典。

常用方法：

1. 初始化
    `+ (id) dictionaryWithCapacity: (NSUInteger) numItems;` 预设字典容量
2. 增加
    `- (void) setObject: (id)anObject forKey: (id)aKey;`
    如果key存在，将覆盖对应的值
3. 删除
    `- (void) removeObjectForKey: (id)aKey;`

和NSMutableArray一样，NSMutableDictionary没有字面值初始化语法。

### 请不要继承这些集合
Cocoa许多类以类簇(class clusters)实现，即接口一样的多个类。比如创建NSString对象时，实际上获得的可能是NSLiteralString、NSCFString、NSSimpleString、NSBallOfString或者其他未写入文档的与实现相关的对象。
大概就是，对于程序来说是NSString，而Cocoa在内部运行的时候可能会根据不同的场景使用不同的类来代替掉NSString的各种接口。
所以，尽量使用包含而不是继承来使用这些基本集合类。

### 集合总结
一般来说，有4种方式遍历集合：

- 通过索引
- 使用NSEnumerator枚举器
- 使用快速枚举for in
- 使用代码块

可变集合与不可变集合区别：
- 没有`Mutable`的都是不可改变的，而包含`Mutable`的才可以改变。
- 不可变的集合只能重新赋值，而可变集合可以直接增删修改。
- 不可变的集合才有_字面值初始化_，可改变的集合只能使用方法进行初始化。
- 可改变的集合都有对应的WithCapacity方法，用来预设集合容量，可提供效率。

集合都是Objective-C的对象，所以不能存储C语言的基本数据结构，如int、float、struct等，同时也不能存储nil值。

> 但是，你可以将数值转换为NSNumber，将struct转换为NSValue来实现将他们存储到集合中。

## NSNumber
Cocoa提供NSNumber对数值进行封装。

常用方法：

1. `+ (NSNumber *) numberWithChar: (char)  value;`
1. `+ (NSNumber *) numberWithInt: (int)  value;`
1. `+ (NSNumber *) numberWithFloat: (float)  value;`
1. `+ (NSNumber *) numberWithBool: (BOOL)  value;`
1. `- (char) charValue;`
1. `- (int) intValue;`
1. `- (float) floatValue;`
1. `- (BOOL) boolValue;`
1. `- (NSString *) stringValue;`

常用字面值赋值：
NSNumber *number;
number = @'X';      // char
number = @12345;    // int
number = @12345ul;  // unsigned long
number = @12345ll;  // long long
number = @123.45f;  // float
number = @123.45;   // double
number = @YES;      // BOOL

**Tips:**
可以通过intValue来提取一个由numberWithFloat()创建的NSNumber的整数部分。

> 将基本类型封装为对象的过程叫**装箱**(boxing)
> 从对象中提取基本类型的过程将**开箱**(unboxing)
> 有些语言会提供自动装箱、开箱功能，即需要的是对象，如果传递的是基本类型会自动转换为对象，反之需要的是数据，如果传递的是对象则自动提取数据。
> Objective-C不支持自动装箱、开箱功能。

## NSValue
NSNumber其实是NSValue的子类，NSValue可以封装任意数据！
比如：将一个struct结构体封装到NSValue对象里面。

转换为NSValue:
`+ (NSValue *) valueWithBytes: (const void *)value objCType: (const char *)type;`

参数1：地址值，可以是NSSize或struct的地址，通常是`&变量`方式获取。
参数2：类型字符串，可以自己构造，通常使用`@encode(结构体)`编译器指令。

从NSValue中提取值：
`- (void) getValue: (void *)buffer;`


```objective_c
NSRect rect = NSMakeRect(1, 2, 30, 40);
NSValue *value = [NSValue valueWithBytes:&rect objCType:@encode(NSRect)];
[array addObject:value];

value = [array objectAtIndex: 0];
[value getValue: &rect];  //还记得吧，通常get方法都是传递指针
```

## NSNull
上面已经提到过，nil值不能作为集合元素，因为nil值有特殊意义，如果确实需要，可以使用NSNull对象。

只有一个方法：
`+ (NSNull *) null;`

```objective_c
// 将NSNull添加到集合中：
[contact setObject: [NSNull null] forKey: @"phoneNumber"];

// 访问：
[id phoneNumber = [contact objectForKey: @"phoneNumber"]];
if (phoneNumber == [NSNull null]) {
  /* code */
}
```

## 内存管理

### 引用计数
Cocoa采用引用计数(reference counting)的技术，也叫做保留计数(retain counting)。每个对象都有一个与之关联的整数，被称作它的引用计数器或保留计数器。
当某段代码访问该对象时，计数器加1，该段代码访问结束时，计数器减1，当计数器为0时，该对象就会被销毁。

当使用alloc、new或copy时，对象会创建一个副本，副本对象的计数器被设置为1。
当需要增加计数时，可以调用retain方法。
当需要减少计数时，可以调用release方法。
当需要获取计数的值时，可以调用retainCount方法。
当计数为0要被释放时，对象会收到Objective-C的dealloc消息。

所以，
你可以重写对象的dealloc方法，在对象要销毁时释放占用的资源。

> 注意：请一定不要直接调用dealloc方法，这是Objective-C在需要销毁对象时自动调用的

下面是原型：
`- (id) retain;`
`- (oneway void) release;`
`- (NSUInteger) retainCount;`

返回id的类型其实就像javascript那样，可以链式操作。

浅析引用计数：

```objective_c
// Me
- (void) newACar
{
  Engine *engine = [Engine new];
  [self.car setEngine: engine];
  [engine release];
}

// Car
// A
- (void) setEngine: (Engine *)engine
{
  self.engine = engine;
}
// B
- (void) setEngine: (Engine *)aEngine
{
  self.engine = aEngine;
  [aEngine retain];  // 增加计数
}
```
[Engine new]：创建一个Engine副本，计数器被设置为1
self.engine = engine: 只是单纯的指针赋值，不影响计数器
[engine release]：Engine的引用计数 -1
最后，Engine的引用计数为0，Car里面的engine其实是空指针！！

如果是B函数：将Engine的计数 +1
最后，Engine的引用计数为1，虽然外面的Engine被释放了，但是因为计数器不为0，Car里面的engine还有效！！

B看似有效，但其实是非常糟糕的，B在修改自己的engine对象的时候，没有处理旧的engine的计数，只顾处理新的engine的计数。
所以，应该改为：

```objective_c
- (void) setEngine: (Engine *)aEngine
{
  [self.engine release];  // 释放掉旧的
  self.engine = aEngine; // 替换为新的
  [aEngine retain];  // 新的增加计数
}

```

然而，上面的版本还是有问题，因为忘记了参数的engine可能和当前旧的engine是同一个对象的指针。
假如是`[car setEngine: [car engine]]`，这意味着car执行到上诉代码的时候，engine的计数会先减到0再加1，然而计数到0的时候已经被释放，没有机会再加1。对于引用计数应该遵循，先加后减的原则。
所以，改为：

```objective_c
- (void) setEngine: (Engine *)aEngine
{
  [aEngine retain];  // 先加
  [self.engine release];  // 后减
  self.engine = aEngine; // 替换为新的
}

```
然而，上面的代码还是不完善的，self.engine初始值应该是空的，不能直接release。

总结：
上面的代码其实是非常糟糕的代码，最好不要尝试手动修改引用计数！因为一旦像上面那样忘记处理某一种情况，就会出现内存泄露。
另外，引用计数不应该在对象外部操作，像上面不应该在Car里面修改Engine的引用计数，Engine的引用计数应该由Engine自身管理。

最好像c语言那样，直接当做指针来管理，尽量保证只有一个引用计数，只有某些情况无法避免才引入引用计数器。

上面的例子中，Engine的所有权最好交给Car，自始至终保证只有一个引用计数

```objective_c
// Me
- (void) newACar
{
  Engine *engine = [Engine new];
  [self.car setEngine: engine];
  // 此处不要释放 [engine release];
}

// Car
- (void) setEngine: (Engine *)aEngine
{
  self.engine = aEngine;
}
- (void) dealloc
{
  [self.engine release];
  // 在Car释放时释放其占有的engine对象
}

//自始至终Engine的引用计数最多为1
```

### 自动释放池
看下面的代码：

```objective_c
- (NSString *) description
{
  NSString *description = [[NSString alloc] initWithFormat:@"helloworld"];
  return description;
}
```
这是NSLog输出对象时调用的方法。很显然，description字符串要由调用description方法的调用者释放。

能不能让这字符串自己自动释放呢，这也是为什么要引入自动释放池。

NSObject类提供了一个叫autorelease的方法：
`- (id) autorelease;`

使用自动释放池实现：
```objective_c
- (NSString *) description
{
  NSString *description = [[NSString alloc] initWithFormat:@"helloworld"];
  return [description autorelease];
}
```

原理：

1. 调用了autorelease方法后，对象会被丢到自动释放池中(一个待release的对象集合)。
2. 自动释放池销毁的时候，就会遍历销毁里面的所有对象（对每个对象调用release方法）。

> 很简单，自动释放池其实就是一个数组，希望自动释放的对象就添加到数组里面，当程序结束的时候清理这个数组即可。
> 另外，上述NSObject的autorelease使用的自动释放池是NSObject提供的，并不是自己创建的。

### 自动释放池的创建和销毁
自动释放池内的对象的引用计数必须为1，否则自动释放池释放时，对象会因为引用计数不为0而留在内存中！

创建自动释放池的两种方法：

1. 通过@autoreleasepool关键字，花括号内的代码就是使用这个池。
2. 通过NSAutoreleasePool对象，创建和释放该对象之间的代码就是使用这个池。

如果使用Foundation库，创建和销毁自动释放池已经由@autorelease关键字完成。
当使用@autorelease{}时，所有花括号里的代码都会放到这个新池子里。

注意：所有花括号里定义的变量在括号外无法使用！

何时会真正清理？
使用AppKit时，Cocoa定期自动为你创建和销毁自动释放池，通常是程序处理完当前事件（鼠标单击、键盘按下等）以后执行这些操作。你可以使用任意数目的自动释放池。一般在程序开始处理事件前创建一个自动释放池，在事件处理结束后销毁，以减少累积的临时对象的数量。

另外：自动释放池被清理的时间是完全确定的：要么在代码中自己手动销毁，要么是使用AppKit时在事件循环结束时销毁。在函数调用过程中自动释放池是不会释放的。

### 内存管理规则
我们究竟如何进行内存管理呢？对象应该何时释放呢？下面是一些规则：

1. 当使用new、alloc、copy创建一个对象时，要记得在不再使用时调用release(立即释放)或autorelease(交由自动释放池释放)释放对象。
2. 当对象是通过方法获取的，如果对象已经加入了自动释放池，则不需要额外操作来释放它。
3. 如果你保留了某个对象，就必须负责release或autorelease该对象，必须保证retain和release使用次数相等。
4. 只要弄清楚对象的归属，把对象的释放交由该负责人，就不用担心内存管理问题。
5. 只有当对象从属于多个负责人，才需要引用计数的方式，而这种情况能从设计上避免尽量避免。
6. 自动释放池中的对象就不要去保持，要保持的对象就使用new自己创建自己管理而不要放到自动释放池。
7. 自动释放池中的对象迫不得已要保持，则必须手动增加计数，使得自动释放池销毁时，对象仍旧被自己管理，但同时自己需要负责release或autorelease。
8. 没有使用new、alloc、copy这三个方法得到的对象几乎都由自动释放池管理，不需要自己释放。
9. 对象初始化super init先执行，对象销毁super dealloc最后执行。

### 一些不需要关心内存释放的对象
基本上，除了直接调用new、alloc、copy这三个方法得到的对象外，其余的都不需要自己释放。

需要自己释放:
`NSMutableArray *array = [[NSMutableArray alloc] init];`

不需要自己释放，而且最好不要保持:
`NSMutableArray *array = [NSMutableArray arrayWithCapacity:17];`
`NSColor *color = [NSColor blueColor];` 返回的是全局单例

假如程序需要持有不需要自己释放的对象，如何保证程序生命周期内仍能访问该对象呢？
这个时候必须使用引用计数了！

```objective_c
- (void) doStuff
{
  self.mutArray = [MSMutableArray arrayWithCapacity: 17];
  [self.mutArray retain];
}
- (void) dealloc
{
  [self.mutArray release];
  [super dealloc];
}
```
`self.mutArray`是自动释放的，如果doStuff是在事件内，有可能在doStuff结束后自动释放池会被释放，继而`self.mutArray`会被释放掉，为了在该对象生命周期内都能访问`self.mutArray`，就必须增加计数！！

或者，你可以改成new方式，自己管理内存：

```objective_c
- (void) doStuff
{
  self.mutArray = [MSMutableArray new];
}
- (void) dealloc
{
  [self.mutArray release];
  [super dealloc];
}
```

建议这种情况就使用new方式，而不要去改动计数器！

### 垃圾回收
Objective-C 2.0引入了自动内存管理机制，也称垃圾回收。和Java或Python一样。启用垃圾回收需要在BuidSettings选择Required[-fobjc-gc-only]选项。

> 注意：垃圾回收功能只支持OS X应用，而无法用于IOS应用中！

另外，在IOS开发中，苹果公司建议不要在自己代码中使用autorelease方法，也不要使用会返回自动释放对象的一些便利的方法。

### 自动引用计数
在IOS中无法使用垃圾回收，主要原因是无法知道垃圾回收器什么时候起作用，而且垃圾清理会对移动设备的性能产生影响。
苹果的解决方案是自动引用计数(automatic reference counting简称ARC)。ARC是编译阶段的工作，你可以开启或禁用它。

ARC不是垃圾回收器，只是在编译时在代码中插入合适的retain和release语句，就好像自己手动写好了内存管理代码一样。

ARC只对以下对象指针有效：

1. 代码块指针
2. Objective-C对象指针
3. 通过_attribute_((NSObject))类型定义的指针

char *和CF对象都不支持ARC特性，这些需要自己管理内存，和ARC并不冲突。

#### weak or strong
前提条件是：对象是由方法传递进来的，本地用指针指向该对象。
此时，如果使用retain和release修改该对象的引用计数，即叫强引用。
此时，如果没有管理该对象的任何内存，只是保存一个指针别名，则叫弱引用。

为什么需要这类引用，在UI设计上最能体现出来为什么要这样做。

##### 为什么使用弱引用：
弱引用其实就相当于c语言中的指针别名。

以UI为例，假设当前窗口W中有一个按钮A，通常：
窗口W创建按钮A，持有A的强引用，并且在窗口W销毁(析构)函数中负责释放按钮A。
按钮A为了访问窗口的一些属性，需要持有窗口W的指针。
此时，如果按钮A内部增加W的计数，即使用强引用，这会导致什么问题？

关闭窗口，窗口W被释放，W的计数减1，因为按钮A持有W的强引用，所以W的计数不为0，既然不为0，就不会触发窗口W的销毁（析构）函数，所以不会释放按钮A，于是窗口W和按钮A都没有被释放。

而如果使用弱引用，即只是指针别名，窗口关闭时，W的计数为0，触发销毁(析构)函数，继而释放按钮A，于是窗口W和按钮A都顺利释放。

这里不是关乎按钮A是不是应该由窗口W释放的问题，按钮A都是跟随窗口W释放的，只是强引用导致了窗口W在关闭时不能被释放。

##### 弱引用清零问题：
弱引用清零其实就相当于QT中的QPointer和C++中的智能指针。

同样以窗口为例，当前有两个独立的窗口W1和W2，W1里面有个消息框E，通常：
窗口W1负责创建这个消息框E，很显然这是强引用。
现在有需求，要求窗口W2也能访问消息框E，那么窗口W2只能存储消息框E的一个弱引用。

如果窗口W1先关闭，窗口W2里面的弱引用就成了非法引用，一访问便会崩溃。所以，当窗口W1先关闭时，要将窗口W2中持有的弱引用赋值为nil，这个过程也叫弱引用清零。

弱引用清零的实现思路大概是这样：窗口W2请求消息框E的一个引用，消息框E会先保存窗口W2到自己内部然后返回它一个引用，当消息框E被释放时，消息框E会通知所有持有它的引用的对象，请求他们清掉自己的别名。

为什么窗口W2不能持有消息框E的强引用：消息框E是基于窗口W1上的资源创建的，窗口关闭释放所有资源，这和强弱引用没有关系，或者说消息框E是建立在窗口W1上的，窗口W2只能得到弱引用而无法得到强引用。

##### 归零弱引用
声明归零弱引用的两种方式：

1. \_\_weak NSString *myString;
2. @property(weak) NSString *myString;

使用ARC命名规范需要注意：

1. 属性名不能以new开头： `@property NSString *newString`不允许
2. 属性不能只有一个read-only而没有内存管理特性


## 异常
Cocoa使用NSException类表示异常，所有异常必须继承于NSException。
异常特性需要开启，启用Enable Objective-C Exception项，即`-fobj-exceptions`

相关关键字：

- @try
- @catch()
- @finally
- @throw

```objective_c
@try {
} @catch (MyCustomException *custom) {
} @catch (NSException *exception) {
} @catch (id value) {
} @finally {
}
```
抛出异常：

1. `@throw 异常名;`抛出异常，throw可对任意对象有效
2. `NSException raise`向异常对象发送raise消息，raise只对NSException有效

```objective_c
NSException *theException = [NSException exceptonWithName: ...];
@throw theException;
// OR
[theException raise];

@try {
  NSException *e = ...;
  @throw e;
} @catch (NSException *e) {
  @throw; // rethrows e
}
```

注意：
如果代码中有异常，会打乱原先的执行顺序，因此，内存清理的语句需要考虑异常发生时是否正确执行！！

### 异常和自动释放池
一般来说，异常几乎和自动释放池一起使用。但是，如果你自己创建自动释放池，需要注意。

```objective_c
- (void)myMethod
{
  NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
  NSDictionary *myDic = [[NSDictionary alloc] initWithObjectsAndKeys:@"test", nil];
  @try {
    [self processDictionary: myDic];
  } @catch (NSException *e) {
    @throw;
  } @finally {
    [pool release];
  }
}
```
上面的代码是有问题的，@catch部分再次抛出异常，而@finally部分会在异常重新抛出前执行（换言之，他是先执行@finally，再抛异常，而不是立即抛出异常然后执行@finally）。
因为NSException *e是包含在自动释放池中间的，所以异常e会被释放掉。所以再次抛出的异常e其实是非法的。

上面已经说过，如果要保持自动变量池里面的对象，只能手动增加计数，自己release或autorelease。

```objective_c
- (void)myMethod
{
  id savedException = nil; // 新建引用变量
  NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
  NSDictionary *myDic = [[NSDictionary alloc] initWithObjectsAndKeys:@"test", nil];
  @try {
    [self processDictionary: myDic];
  } @catch (NSException *e) {
    savedException = [e retain];  // 增加计数，保持引用
    @throw;
  } @finally {
    [pool release];
    [savedException autorelease]; // 自己管理，自己释放，交由autorelease释放
  }
}
```

## 对象
对象初始化的两种方式：

1. `[类名 new]`
2. `[[类名 alloc] init]`

为什么要链式调用，而不要分开alloc和init。
这是因为，init的时候，可能会根据参数返回不同的对象。

### 为什么需要if(self = [super init])
这行代码意味着self可能会被改变，虽然很少发生。
如果初始化一个对象失败时，init方法会返回nil，表明未能初始化对象，继而if判断会让对象初始化跳过主要的初始化代码。
这个赋值操作只影响该init方法中的self的值，而不影响该方法范围外任何内容。
一般来说初始化都是这样做的，仅仅用于能捕获到对象初始化失败这个事件。

### super dealloc最后执行
重写dealloc函数时，super dealloc必须最后执行！

## 属性
Objective-C 2.0引入属性。

### 属性与变量关系
对象的变量是真正存储数据的地方。
对象的属性只是提供setter与getter的快捷访问方式。

也即是说，变量是变量，属性是方法。
比如：

```objective_c
@interface Test: NSObject
{
  NSString *id;
}
@property NSString *id;
@end
```
在_init_方法中`id = @"hello";`与`self.id = @"hello";`是不一样的。

前者表示，直接访问id变量，后者等价于`[self setId: @"hello"]`是调用setter方法。如果你假想在setter方法中做了额外的操作，很显然这两者是不等价的。


### @property

```objective_c
@interface Test: NSObject
{
  int value;
}
@property int value;
@end
```
编译后，将得到以下三个声明：

1. 属性`int value;`的声明
2. setter方法`- (void) setValue: (int)value;`的声明
3. getter方法`- (int) value;`的声明

换言之，即使你不声明value变量，使用属性时，编译器也会自动创建属性对应的value变量。**但这只是声明，实现部分还是要自己实现。**

### @synthesize

```Objective-C
@implementation Test
@synthesize value;
@end
```
编译后，将得到以下实现代码：

1. setter方法`- (void) setValue: (int)value;{ ... };`的定义（实现）
2. getter方法`- (int) value; { ... };`的定义（实现）

> @synthesize预编译指令不同于代码生成，你永远不会看到实现的代码，但是这些方法确实存在并且可以调用！
> 在Xcode4.5以后，可以不必使用@synthesize了

### 改变setter与getter的名称
变量名与属性名称可以不同，下面是设置的例子：

```objective_c
@interface Test: NSObject
{
  NSString *application;
}
@propery (copy) NSString *name;
@end

// 在实现时指明属性name与变量application关联
@implementation Test
@synthesize name = application;
@end
```

或者这样做：

```objective_c
@interface Test: NSObject
@propery (getter=isHidden) BOOL hidden; // 生成默认的setHidden和isHidden方法
@end
```
但尽量不要这样做，这样会破坏键/值规则。

### 禁用属性自动生成功能
如果不希望编译器自动生成变量、getter和setter，可以使用关键字@dynamic来禁用。

例如，对象的id是根据对象的数据进行md5生成的，所以对象不用存储这个id，只是在访问id的getter时计算生成。
所以，我们不需要编译器提供id变量、id的setter和id的getter。

```objective_c
@propery (readonly) int id;   // 声明一个id只读属性，这样就可以使用点运算操作

@dynamic id;  // 禁用编译器的自动生成
- (int) id    // 提供自定义getter方法，确保点运算操作时不报错。
{
  // 计算得到id
}
```
既然编译器不会自动生成，所以我们得自己添加getter或setter，以此提供对象的**点**运算操作。
同样，如果使用点操作访问不存在的getter或setter，将会出错！

### 属性的设置

#### 默认值
默认情况下，属性是这种配置：
`@propery (readwrite, assign) NSString *name;`
只读、普通赋值

#### readonly/readywrite
默认情况下，属性是可读写的，但是如果要表明自己的意图，可以添加读写属性。
`@propery (readwrite, copy) NSString *name;`
`@propery (readwrite, retain) Engine *engine;`

`@propery (readonly) NSSTring *id;`
如果是只读属性，编译器只生成对应的get方法，而不会生成set方法，所以对只读属性调用set方法会**编译失败**。

#### assign
对基础数据类型(NSInteger，CGFloat)和C数据类型(int, float, double, char)等等。
此标记说明设置器直接进行赋值，这也是默认值。在使用垃圾收集的应用程序中，如果你要一个属性使用assign，且这个类符合NSCopying协议，你就要明确指出这个标记，而不是简单地使用默认值，否则的话，你将得到一个编译警告。这再次向编译器说明你确实需要赋值，即使它是可拷贝的。

#### atomic
默认为atomic，提供多线程安全，setter函数会加锁处理。
如果你已经定义了自己的setter方法，则不能再使用atomic或nonatomic修饰。

#### nonatomic
禁止多线程，变量保护，提高性能。如果没有使用跨线程访问资源，设置nonatomic会提高性能，像手机设备，一般都是使用nonatomic。
如果你已经定义了自己的setter方法，则不能再使用atomic或nonatomic修饰。

#### copy
默认情况下，变量是直接赋值(assign)，如果需要保存一个副本，则需要进行copy，还记得吗，使用了new、alloc、copy操作符就需要考虑内存管理。

变量copy相当于以下语句：

```objective_c
@property (copy) NSString *name;

// 相当于以下的代码，set方法复制对象，销毁时负责销毁
- (void) setName: (NSString *)aName
{
  [self.name release];
  self.name = [aName copy];
}
- (void) dealloc
{
  [self.name release];  // 没有开启ARC需要自行添加，开启ARC预编译器自动添加
}
```
**注意：**

如果没有启用ARC功能，则需要手动在dealloc释放name，而如果开启了ARC功能，则不需要担心这个问题，因为编译器会自动添加，这也是ARC的优点。
(怎么感觉这里是个坑~)

#### retain
默认情况下，变量是直接赋值(assign)，如果需要保存一个强引用，则需要使用retain增加计数，同样，使用了retain就要配套一个release。

retain相当于以下语句：

```objective_c
@property (retain) Engine *engine;

// 相当于以下的代码，set方法时保持强引用，销毁时负责销毁
- (void) setName: (Engine *)aEngine
{
  [aEngine retain]; // 先加后减
  [self.engine release];
  self.engine = aEngine;
}
- (void) dealloc
{
  [self.engine release];  // 没有开启ARC需要自行添加，开启ARC预编译器自动添加
}
```
**注意：**

理由同上。

### 改变属性的名称


### 点表达式(.)
`对象.属性名 = xxx`在等号左边，表示对象的属性的set方法被调用。
`xxx = 对象.属性名`在等号右边，表示对象的属性的get方法被调用。

### 属性声明的位置与效果
声明属性，我们可以在`头文件h`、`实现文件m`、甚至`一部分在头文件另一部分在实现文件里`，但是位置不同，效果也不同。

#### 在头文件声明
在头文件中声明，表示属性是公开的，可以通过`对象.属性名`访问。

#### 在实现文件声明
在实现文件中声明，表示属性是私有的，
