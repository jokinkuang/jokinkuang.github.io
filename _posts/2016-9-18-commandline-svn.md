---
layout: post
title: 命令行SVN使用
categories: svn
date: 2016-9-18 14:53:10
pid: 20160918-145310
# you can override the settings in _config.yml here !!
---
命令行下使用svn的笔记

{% include toc %}

### Mac下提示不存在SVN_EDITOR错误
设置命令行环境变量`export SVN_EDITOR=vim`即可。

```
vim ~/.bash_profile

// 在启动终端时先设置环境变量
export SVN_EDITOR=vim
```

### 具体命令
svn [命令] --help   // 查看具体命令的帮助文档
svn checkout [path] [--username UserName]   // checkout仓库
svn info            // 查看当前仓库路径

svn st [path]       // 查看当前仓库改动
svn log             // 查看log
svn diff [path]     // diff工具
svn update [path]   // 更新
svn commit [path]   // 提交
svn revert [path]   // 恢复

svn switch          // 分支
svn merge           // 合并
