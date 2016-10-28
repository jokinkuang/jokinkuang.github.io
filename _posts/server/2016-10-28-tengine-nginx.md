---
layout: post
title: Tengine服务器
categories:
image: 
date: 2016-10-28 15:51:36
pid: 20161028-155136
# excerpt: ""
# you can override the settings in _config.yml here !!
---
偶然的机会看到了某个网页的报头显示Server为Tengine，没听说过，很好奇搜索了一下，原来是淘宝网发起的一个基于Nginx修改的服务器项目，Tengine是个开源项目，Tengine的性能和稳定性已经在大型的网站如淘宝网，天猫商城等得到了很好的检验。它的最终目标是打造一个高效、稳定、安全、易用的Web平台。

{% include toc %}

## 下载与安装

```
# 新建文件夹
mkdir tengine
cd tengine

# 下载解包
curl tengine.taobao.org/download/tengine-2.1.2.tar.gz -o ./tengine-2.1.2.tar.gz
tar -xvf ./tengine-2.1.2.tar.gz

cd tengine-2.1.2
./configure

# 出现了错误，缺失某个模块，于是根据提示禁用
./configure --without-http_rewrite_module

# 编译安装
make
make install

# 运行
sudo /usr/local/nginx/sbin/nginx

# 帮助
/usr/local/nginx/sbin/nginx -h

# 停止
/usr/local/nginx/sbin/nginx -s stop
```
如果访问[127.0.0.1](http://127.0.0.1/)能看到下面的页面，则表示安装成功：

![tengine-index][tengine-index]

## 用法
既然Tengine是基于Nginx，它的用法可以参考[Nginx](http://nginx.org/)的使用。

## 官网
[tengine.taobao.org](http://tengine.taobao.org)

[tengine-index]: {{ site.images_url }}server/tengine/tengine-index.jpg
