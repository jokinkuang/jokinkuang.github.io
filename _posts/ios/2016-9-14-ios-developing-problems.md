---
layout: post
title: IOS开发过程中遇到过的坑
categories: Mac ios
date: 2016-9-14 17:18:30
pid: 20160914-171830
# you can override the settings in _config.yml here !!
---
初接触IOS开发，记录开发过程中遇到的奇葩问题

{% include toc %}

### Expected unqualified-id 错误
这个错误目前还不知道原因，提示错误是这样的:

```objective_c
- (void)didReceiveMemoryWarning
{
  [super didReceiveMemoryWarning];
} // 提示这里unqualified-id错误
```
首先，我以为是新添加的文件某些地方没有对应的结束标记，导致编译器将错误定位到这里。
于是，我注释掉新添加的代码，但结果错误仍旧存在。

继续，我又尝试注释掉`[super ]`那句，错误还是没有修复。

接着，使用diff工具看一下当前文件做了什么修改，diff提示修改了那个`}`符号，好吧，那就删除这个符号重新输入，结果还是提示同样的错误。

最后，没办法，直接revert文件，再次编译，竟然通过了。

因为没有保留原文件，revert后文件就没有了，但百思不得其解，如果是字符错误，删除再添加应该能解决，但是没有。编译通过后，删除字符重新添加编译还是能够通过。

很奇怪的一个错误。Mark一下。但估计应该是中文字符的问题，曾试过中文的"-"导致错误。

### main
