---
layout: post
title: how to create blog with github
tags: [github blog]
author: helloxk
mail: 345106552@qq.com
created: 2015-01-27 17:50:54
modified: 2015-02-27 17:55:50
---

Urls:  
    help: https://help.github.com/
    if push failed see: https://help.github.com/articles/generating-ssh-keys/
    add ssh-keys: https://help.github.com/articles/generating-ssh-keys/#step-4-add-your-ssh-key-to-your-account
    bind domain: https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/
    jekyll sites: https://github.com/jekyll/jekyll/wiki/sites

1, create a repository.
    have to be "{username}/{username}.github.io"

2, create a website with jekyll.
    you can clone a template from others, and then push to your repository.

3, browse {username}.github.io.

Now you have created a blog with github.
if you have a domain, you can bind to the blog.

4, bind a domain.
    NOTE: do not use *.XXX.com as the filter!

    - set your domain DNS like below: 
        www A 默认 192.30.252.153 - 600 删除    暂停 
        www A 默认 192.30.252.154 - 600 删除    暂停 
        @ A 默认 192.30.252.153 - 600 删除    暂停
        @ A 默认 192.30.252.154 - 600 删除    暂停 

    - set your domain in CNAME in your repository:
        www.XXX.com or XXX.com

        If you configure both an apex domain (e.g. example.com) and a matching www subdomain (e.g. www.example.com), GitHub's servers will automatically create redirects between the two.
        For example:
        If your CNAME file contains example.com, then www.example.com will redirect to example.com.
        If your CNAME file contains www.example.com, then example.com will redirect to www.example.com.

    - test the DNS:
        dig XXX.com +nostats +nocomments +nocmd
        # if the output route to 192.30.252.153/154, means it work!

