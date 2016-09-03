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
讲述当前Jekyll站点的主题制作过程

{% include toc %}

## 搭建本地的Jekyll环境

因为图方便所以个人直接在Ubuntu下搭建了环境，Windows平台可以网上搜索教程，个人推荐Windows安装虚拟机然后安装Ubuntu。

1. 安装ruby环境
  sudo apt-get install ruby
2. 安装Jekyll
  sudo gem install jekyll
3. 安装kramdown
  sudo gem install kramdown
4. 安装rouge

  > sudo gem install rouge

5. 测试Jekyll是否安装完成

  > jekyll --version

> 从上面可以看出，这是一套基于Ruby语言的工具集。
`题外话：gem install是ruby的东西-用来管理ruby工具，而npm install是nodejs的东西-用来管理js工具`

## 本地跑起来

    jekyll new mytheme
    cd mytheme
    jekyll server

运行上面的命令，然后访问127.0.0.1:4000，就能看到一个由Jekyll搭建的博客了。

## Github Page环境本地化

上面构建的只是Jekyll的本地环境，当push到Github Page后环境会有所变化，为了本地看到的效果和托管在Github Page看到的效果一致，我们最好搭建本地的Github Page环境。

1. 升级ruby到2.0.0以上
  如果ruby --version查看版本低于2.0.0，那么需要升级ruby。
2. 安装ruby工具集管理工具Bundler
  sudo gem install bundler
3. 创建Gemfile
  在上面的mytheme根目录下创建一个Gemfile文件，内容为：
  source 'https://rubygems.org'
  gem 'github-pages', group: :jekyll_plugins
4. 安装Github Page的工具集
  在Gemfile所在的目录，即Jekyll主题的根目录，执行下面的命令：
  bundle install
5. 跑起来
  bundle exec jekyll serve

如果出现bundle exec jekyll serve能启动，而jekyll serve不能启动，则删除Gemfile和Gemfile.lock重新运行jekyll serve即可。
更多Github Page本地化环境搭建，可参考[github -helper-setting-up-your-github-pages-site-locally-with-jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll)

## 需要一个网页原型

Github Page和Jekyll本地环境已经搭建完成，访问127.0.0.1:4000也能够看到一个简单的博客。

## 理解Jekyll是如何工作的

## 理解Markdown是如何工作的

## 理解Highlight语法高亮是如何实现的

## 开始制作自己的Jekyll主题

