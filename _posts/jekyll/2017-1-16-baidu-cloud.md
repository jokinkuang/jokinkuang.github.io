---
layout: post
title: GoDaddy使用DNSPod解析并添加百度云加速
categories: jekyll
image: "dns/baiducloud-ico.jpg"
date: 2017-1-16 15:50:17
pid: 20170116-155017
excerpt: ""
# you can override the settings in _config.yml here !!
---

{% include toc %}

## GoDaddy域名使用DNSPod进行域名解析
下面以GithubPage`jokinkuang.github.io`绑定GoDaddy域名`jokinkuang.info`为例：

1. 登录GoDaddy，把`jokinkuang.info`域名的DNS域名服务器修改为
   `F1G1NS1.DNSPOD.NET`
   `F1G1NS2.DNSPOD.NET`
2. 登录DNSPod，添加下面的CNAME记录。
   `www CNAME jokinkuang.github.io`
   `@   CNAME jokinkuang.github.io`
   其中，`www`表示解析`www.jokinkuang.info`而`@`表示解析`jokinkuang.info`。
3. 登录Github，把`jokinkuang.github.io`仓库的CNAME文件内容修改为`www.jokinkuang.info`（必须和域名相同，www可有可无）。
4. 等待一段比较长的时间。

上面的流程图
![dns-flow][dns-flow]

如果ping一下`www.jokinkuang.info`
![ping-dnspod][ping-dnspod]

可以发现，域名直接解析到Github的CDN服务器地址。

通俗地说，访问域名`www.jokinkuang.info`相当于访问了IP`151.101.100.133`。

如果直接访问这个IP，会出现404。Github上托管了无数的网站，直接访问上面的IP，理所当然的，不可能出现`jokinkuang.github.io`首页，因为Github无法从单纯的IP访问中识别出你的意图。
Github服务器通过域名`jokinkuang.github.io`来识别用户需要访问的是`jokinkuang`用户的网站首页。

所以，域名解析的时候，只需要将`个人域名`解析（导航）到域名`jokinkuang.github.io`即能实现Github Pages自定义域名。


## DNSPod使用百度云加速的CDN服务
DNSPod接入百度云加速，使用百度云加速的免费CDN服务。其实Github Pages也是放在CDN服务器上。接入了百度云加速网页的打开速度会有点提升。

下面也以`jokinkuang.info`使用DNSPod做域名解析，并接入百度云加速为例。

1. 按照上面接入DNSPod作为域名解析。
2. 登录[百度云加速](http://su.baidu.com)，添加网站域名`jokinkuang.info`（没有www)，然后切换接入方式为`CNAME接入`。
3. 添加下面的CNAME记录。
  `@   CNAME jokinkuang.github.io`
  `www CNAME jokinkuang.github.io`
4. 百度云加速会生成3条记录，其中`TXT`是唯一的，估计与域名绑定（打码）。
  `jokinkuang.info.cname.yunjiasu-cdn.net`
  `www.jokinkuang.info.cname.yunjiasu-cdn.net`
  `TXT 5624xxxxxxxxx 一串唯一的标识字符串`
5. 添加完，百度会提示需要将这3条记录添加到域名解析服务提供商那里。也即是在DNSPod里添加下面3条记录。
  `@   TXT   5624xxxxxxxxx`
  `@   CNAME jokinkuang.info.cname.yunjiasu-cdn.net`
  `www CNAME www.jokinkuang.info.cname.yunjiasu-cdn.net`
  同样，`@`对应`jokinkuang.info.xxx`，`www`对应`www.jokinkuang.info.xxx`。
6. 停用最上面的DNSPod到`jokinkuang.github.io`的记录，开启百度云加速的3条记录。也即是说，不使用DNSPod直接解析`jokinkuang.info`到`jokinkuang.github.io`，而是DNSPod将`jokinkuang.info`解析到`百度云加速`，由`百度云加速`再解析到`jokinkuang.github.io`。

上面的步骤对应的图。
![yun-step1][yun-step1]
![yun-step2][yun-step2]
![yun-step3][yun-step3]

再ping一下`www.jokinkuang.info`
![yun-ping][yun-ping]

域名解析直接解析到百度云加速的服务器。
![yun-dns-flow][yun-dns-flow]

## 域名的构成
`网络名. ... .三级域名.二级域名.顶级域名`

`www.qq.com`
网络名：www
顶级域名：qq.com

`www.mail.qq.com`
网络名：www
二级域名：mail
顶级域名：qq.com

以此类推。

## 域名的解析@与www
假设域名是`jokinkuang.info`，那么：

@：直接解析主域名`jokinkuang.info`
www：直接解析域名`www.jokinkuang.info`

意思是，如果要指定解析`jokinkuang.info`的规则，则使用`@`，如果要指定解析`www.jokinkuang.info`的规则，则使用`www`。

如果将两者分别指向不同的主机，比如`jokinkuang.info`解析到百度云加速，`www.jokinkuang.info`解析到Github服务器。Ping一下，如下图。

![two-dns][two-dns]

如图，`jokinkuang.info`和`www.jokinkuang.info`可以分别导向不同的主机。两者的域名解析是独立的。

如果其中一个不设置规则，则那一个不能访问。如果要`jokinkuang.info`和`www.jokinkuang.info`都能访问同一个主页，则需要同时设置`@`和`www`为相同的规则！！

## 把自己的域名解析到别人的IP
出于调皮的心理，是否可以将自己的域名解析到别人的IP呢。是的，当然可以。

在DNSPod添加下面的记录，即能将自己的域名解析到百度的IP。
`www CNAME www.baidu.com`

ping一下`www.jokinkuang.info`
![dns-to-baidu][dns-to-baidu]

直接在浏览器访问IP`163.177.151.110`，就能访问到百度首页。

但是，访问域名`www.jokinkuang.info`却不会跳转到百度首页，得到的是无法访问该网站。

域名确实解析到了百度的IP，然而访问的时候却无法打开网站，说明百度的服务器对非法的域名进行了拦截。

**为了防止别人的域名解析到自己的主机，通常主机会进行域名或IP的过滤**，一些Web系统，如`nginx`、`apache`等可以通过配置来进行拦截，这个拦截的过程，相当于`服务器绑定域名`，即服务器端绑定合法的域名，只有合法的域名才能访问当前主机。

所以有，域名绑定主机，主机绑定域名这种双向绑定的说法。

> 主机如果不绑定域名，可能被恶意使用，比如非法的色情网站把域名解析到你的主机

## Github Pages CNAME的作用
曾经好奇，把域名`jokinkuang.info`解析到Github Pages的`jokinkuang.github.io`，为什么还需要创建CNAME文件，并必须填上对应的域名。

从上面的双向绑定就可知，CNAME的作用相当于是主机绑定域名，用来描述能访问该站点的合法域名。
有了这个绑定关系，自己的Github Pages站点就不会被别人的域名绑定。

如果在自己的Github Pages的CNAME里绑定别人的域名，会得到以下警告。

The CNAME `www.cuicui.info` is already taken. Check out https://help.github.com/articles/troubleshooting-custom-domains/#cname-already-taken for more information.

因为别人的域名没有绑定到自己的Github Pages，所以站点绑定了别人的域名也没有任何作用。

## 参考文献
1. Github Helper <https://help.github.com/articles/using-a-custom-domain-with-github-pages/>

[dns-flow]: {{ site.images_url }}dns/dns-flow.jpg
[ping-dnspod]: {{ site.images_url }}dns/ping-dnspod.jpg
[yun-step1]: {{ site.images_url }}dns/yun-step1.jpg
[yun-step2]: {{ site.images_url }}dns/yun-step2.jpg
[yun-step3]: {{ site.images_url }}dns/yun-step3.jpg
[yun-ping]: {{ site.images_url }}dns/yun-ping.jpg
[yun-dns-flow]: {{ site.images_url }}dns/yun-dns-flow.jpg
[yun-step3]: {{ site.images_url }}dns/yun-step3.jpg
[two-dns]: {{ site.images_url }}dns/two-dns.jpg
[dns-to-baidu]: {{ site.images_url }}dns/dns-to-baidu.jpg
