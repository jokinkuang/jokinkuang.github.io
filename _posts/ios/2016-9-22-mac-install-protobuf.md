---
layout: post
title: Mac如何安装protobuf
categories: ios
image: ""
date: 2016-9-22 11:02:30
pid: 20160922-120230
# excerpt: ""
# you can override the settings in _config.yml here !!
---
Mac下安装protobuf的简单教程，不同时期，安装方式可能不一样，现在的已经非常简单

{% include toc %}

## 下载源码
`git clone https://github.com/google/protobuf.git`

## 编译
`cd protobuf`
`./autogen.sh`
`./configure`
`make`

## 安装
`make install`

## 查看
`protoc --version`

> 一如既往的configure、make、make install。

## 旧版本
[github-protobuf](https://github.com/google/protobuf) - [commit/branches/releases/contributors] - 点击[releases](https://github.com/google/protobuf/releases) - 点击[tags](https://github.com/google/protobuf/tags) - 找到需要的旧版本即可

## Points

1. ./autogen.sh是获取GoogleMock，并生成对应的configure脚本
2. ./configure是进行环境检测，并生成对应的makefile或Makefile
    `--prefix=/usr/local`可以指定安装路径
3. make，按照makefile编译工程
4. make install，执行makefile里面的install部分，进行安装
    `--prefix=/usr/local`可以指定安装路径
