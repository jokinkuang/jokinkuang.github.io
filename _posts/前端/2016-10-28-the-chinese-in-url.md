---
layout: post
title: 前端笔记(一) 中文URL的编码问题
categories:
date: 2016-10-28 18:04:50
pid: 20161028-180450
# you can override the settings in _config.yml here !!
---
写完上一篇短文的时候，想到了第一个点，那就是URL的中文问题

{% include toc %}

## URL格式
协议://IP域名[:port]/[path][?param1=value1&param2=value2][#fragment]
`http://www.jokinkuang.info:80/article.html?category=frontend#comment`

* `协议` 常见的有 http 、 https 、 ftp
* `://` 固定尾随在协议后面，解释了为什么URL是这样的形式： http:// 、 https:// 、 ftp://
* `IP域名` 可以是IP，也可以是域名。比如：`127.0.0.1` 或 `localhost`
* `:port` 默认端口是80。比如指定端口4000：`localhost:4000`
* `path`
* `?param=value` 参数与值
* `#fragment` 锚点，也叫hash，英文搜索时使用hash会更准确

> [ ]表示可选
> 把上面的所有可选都去掉，最简的URL就是 协议://IP/，也即是 http://www.jokinkuang.info这样

## URL能直接使用中文吗
URL是RFCXXX(比如RFC 1738)规定的，目前只有字母数字和它指定的部分符号才能使用。既然是个标准，说不定以后会变。目前的标准是，中文不能直接使用。

计算机世界是，不能用不代表就没有办法。现在通常的做法是，将`中文`转换为`字符编码`最后转化为`URL编码`，`字符编码`几乎都是数字，所以可以安全地转换为`URL编码`。

支持中文的`字符编码`有很多种，其中常见的有：utf-8(unicode)，gbk，gb2312。

> utf-8是Unicode的一种实现方式，Unicode只是一种使用4个字节表达字符的一种编码。

所以`中文`转换为`字符编码`的过程就有很多选择，这意味着，选择不同，最终的`URL编码`也会不同。

一般，通常情况下，浏览器会使用`utf-8`编码：
以`我`字为例，它的utf-8编码是`E6 88 91`，再转换为URL编码是`%E6%88%91`

但不能排除有的浏览器会使用`gbk`编码：
以`我`字为例，它的gbk编码是`CE D2`，再转换为URL编码是`%CE%D2`

所以，具体问题具体分析，如果`中文`转换为`字符编码`的过程是你自己控制的，那么解码时你指定对应的编码即可，如果这个过程不是你控制的（比如是浏览器控制的），那么你需要分析这个过程使用的编码，这样你才能从URL中得到正确的中文。

## 站长工具得到的UTF8编码为什么和URL里的UTF8编码的不一致
为了验证`UTF8编码`到`URL编码`的转换过程，我特地在站长工具里将`我`中文转换为UTF8编码，但结果并不是期待中的`E6 88 91`，而是`&#x6211;`，这是怎么回事？

![wo-zz-tool][wo-zz-tool]

首先，我把`我`字存储为utf-8格式的文本，使用16进制查看器，结果是`E6 88 91`，这和预期的一样。

![wo-text-hex][wo-text-hex]

站长工具里得到的编码是什么呢？为什么会不一致？

经过一番搜索，最后在[http://www.fileformat.info/](http://www.fileformat.info/)这个网站得到了答案

![wo-unicode-list][wo-unicode-list]

原来站长工具的utf-8编码并不是真正意义的utf-8编码，只是html语法中使用16进制输出一个utf-8格式的字符的语法。

```html
&#x6211;
&#25105;
```
把上面的文字保存为`test.html`，用浏览器打开就能看到两个`我`字，但这并不是真正意义上的`我`字的utf-8编码。


## 浏览器的地址栏为什么能够显示为中文？
[前端系列]({{ site.base }}/article?category=%E5%89%8D%E7%AB%AF)

## URL的中文编码

## 例子1. 将中文放到URL里
这个站点的URL，同样需要处理中文分类的问题。

## 例子2. 从浏览器地址获取中文
这个站点的URL，同样需要处理中文分类的问题。

[wo-zz-tool]: {{ site.images_url }}frontend/wo-zz-tool.jpg
[wo-text-hex]: {{ site.images_url }}frontend/wo-text-hex.jpg
[wo-unicode-list]: {{ site.images_url }}frontend/wo-unicode-list.jpg
