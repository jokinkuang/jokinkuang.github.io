---
layout: post
title: 一步一步构建Jekyll主题
categories: jekyll
image: jekyll.jpg
date: 2016-9-3 15:47:05
pid: 20160903-154705
# excerpt: ""
# you can override the settings in _config.yml here !!
---
讲述当前Jekyll站点的制作过程

{% include toc %}

## 搭建本地的Jekyll环境

因为图方便所以个人直接在Ubuntu下搭建了环境，Windows平台可以网上搜索教程，个人推荐Windows安装虚拟机然后安装Ubuntu。

1. 安装ruby环境
  `sudo apt-get install ruby`
2. 安装Jekyll
  `sudo gem install jekyll`
3. 安装kramdown
  `sudo gem install kramdown`
4. 安装rouge
  `sudo gem install rouge`
5. 测试Jekyll是否安装完成
  `jekyll --version`

> 从上面可以看出，这是一套基于Ruby语言的工具集。
> **题外话：**gem install是ruby的东西-用来管理ruby工具，而npm install是nodejs的东西-用来管理js工具

## 本地跑起来
```
jekyll new mytheme
cd mytheme
jekyll server
```
运行上面的命令，然后访问[127.0.0.1:4000](http://127.0.0.1:4000)，就能看到一个由Jekyll搭建的博客了。

## Github Page环境本地化

上面构建的只是Jekyll的本地环境，当push到Github Page后环境会有所变化，为了本地看到的效果和托管在Github Page看到的效果一致，我们最好搭建本地的Github Page环境。

1. 升级ruby到2.0.0以上
  如果ruby --version查看版本低于2.0.0，那么需要升级ruby。
2. 安装ruby工具集管理工具Bundler
  `sudo gem install bundler`
3. 创建Gemfile
  在上面的mytheme根目录下创建一个Gemfile文件，内容为：
  `source 'https://rubygems.org'`
  `gem 'github-pages', group::jekyll_plugins`
4. 安装Github Page的工具集
  在Gemfile所在的目录，即Jekyll主题的根目录，执行下面的命令：
  `bundle install`
5. 跑起来
  `bundle exec jekyll serve`

如果出现`bundle exec jekyll serve`能启动，而`jekyll serve`不能启动，则删除Gemfile和Gemfile.lock重新运行`jekyll serve`即可。
更多Github Page本地化环境搭建，可参考[github-helper-setting-up-your-github-pages-site-locally-with-jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll)

## 需要一个网页原型

Github Page和Jekyll本地环境已经搭建完成，访问[127.0.0.1:4000](http://127.0.0.1:4000)也能够看到一个简单的博客，接下来就是思考自己的博客应该长哪样。
一般来说，要定制自己的博客，最好先设计出博客的网页原型，所谓网页原型即是使用html、css甚至js来完成静态的网页效果。当前博客的原型只有三个页面：index.html、article.html和post.html。

网页原型的设计是完全独立的，和这里重点要讲述的Jekyll的运作其实没有任何关系，之所以放在这里，仅仅是想表达：Jekyll模板已经跑起来了，自己的网页原型也有了，那么怎么将两者结合起来呢？下面将一一解答。

## 理解Jekyll是如何工作的

Jekyll的描述是，将纯文本转化为静态博客网站，不需要数据库和评论功能。
其实更贴切的描述应该是这样
> Jekyll是一个静态博客系统，没有数据库和评论功能。

### 静态网页

静态网页和动态网页的区别是，静态网页无论是否访问，它就已经存在那里，并且内容已经固定不可改。所以Jekyll在每次增加文章时就已经生成对应的静态网页，而不是每次访问时动态生成的。

> 举个例子
> 
> 当前Jekyll模板有一个页面：categories.html
categories.html是目录和对应的文章列表。
当新增一篇new.md文章后，Jekyll会重新生成新的博客站点，new.md会被转化为new.html，而categories.html会被重新生成，内容是包含new.md这篇新文章的列表。
>
> **所以**，Jekyll的页面都是在访问前就已经生成的，这就是静态。

### 没有数据库

如果`数据库`指的是像MySQL那种可读写的数据库，Jekyll确实没有。但是如果`数据库`指的只是存储数据的地方，Jekyll其实是有的，只是这个数据库是`只读`的！
Jekyll内的`_config.yml`配置、各种内置对象(`site`、`post`、`categories`等等)、用户自定义的变量、集合、结构等，都可以看做是Jekyll的数据库，开发者可以访问这个`只读`的数据库组织自己的页面内容。

> 但有一点要注意：Jekyll内所有可访问的内容都是`只读`的，不可更改！


就目前的理解，我是这样认为的，Jekyll是一个服务器软件，启动后就成为一个站点，而这个站点不要求用户提供html页面，只需要按照它的格式提供文本内容即可（如Markdown格式的文本内容）。Jekyll管理着这个站点的资源，并将这些资源分配给Jekyll的内置变量，管理员可以访问这些内置变量按照自定义的方式组织站点。


## 理解Markdown是如何工作的

## 理解Highlight语法高亮是如何实现的

## 开始制作自己的Jekyll主题

