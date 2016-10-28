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
> 把上面的所有可选都去掉，最简的URL就是 协议://IP/，也即是 http://www.baidu.com这样

## URL能直接使用中文吗
[前端系列]({{ site.base }}/article?category=%E5%89%8D%E7%AB%AF)

## 浏览器的地址栏为什么能够显示为中文？

## URL的中文编码

## 例子1. 将中文放到URL里
这个站点的URL，同样需要处理中文分类的问题。

## 例子2. 从浏览器地址获取中文
这个站点的URL，同样需要处理中文分类的问题。
