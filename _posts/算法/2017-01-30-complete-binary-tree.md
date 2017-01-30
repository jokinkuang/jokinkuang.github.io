---
layout: post
title: 经典的完全二叉树
categories: 算法
date: 2017-01-30 12:51:04
pid: 20170130-125104
# you can override the settings in _config.yml here !!
---
学习二叉树，完全二叉树，完全二叉树用一维数组的存储

{% include toc %}
## 树的基本术语

### 结点 与 叶子结点
结点就是树的一个节点，叶子结点是指度为0的结点，即没有分支的结点。
![tree-node][tree-node]

### 深度 与 度
`深度`是指**树**的层数，`度`是指**结点**的分支数。比如：
1. 空二叉树，深度是1，根结点的度是0度。
2. 像上面的满二叉树，深度是2，根结点的度是2度，两个叶结点的度是0度。

## 二叉树
每个结点最多有两个儿子的特殊的树。
![binary-tree][binary-tree]

二叉树的应用范围很广，**一颗多叉树可以转换为二叉树**。

## 满二叉树
顾名思义，满二叉树是每个结点都有两个儿子的特殊的二叉树。
![full-binary-tree][full-binary-tree]

满二叉树：深度为`n`，则有`2^n - 1`个结点

## 完全二叉树
如果二叉树除了最后一层有缺失外，其它是满的，且最后一层缺失的叶子结点只出现在右侧，则这样的二叉树叫完全二叉树。定义是：若二叉树的深度为n，除第n层外，其余各层的结点都达到了最大，且第n层的结点都连续集中在最左边。简而言之，就是从左到右结点是连续不断的二叉树就叫完全二叉树。**满二叉树是特殊的完全二叉树**。

![complete-binary-tree][complete-binary-tree]

可见：
1. 完全二叉树只有最后一层可能出现缺失。
2. 完全二叉树只有最后一层右侧可能出现缺失。
3. 深度为`n`的完全二叉树，最多有`2^n - 1`个结点，因为最多是满二叉树。
4. 反过来，如果完全二叉树有N个结点，那么深度最多为log(2)N，简写为logN，即深度做多为logN（证明：2^n-1 = N）。
5. 度为1的结点最多有一个（二叉树结点的度最多为2，缺1个就是1度，缺2个就是0度）。
6. 右子树的深度为h，则左子树的深度必为h或h+1（完全二叉树只可能右侧缺失）。

像下面这样，从左到右，没有跳过结点，能够连续串起来的二叉树就是完全二叉树：
![complete-binary-tree-check][complete-binary-tree-check]

下面是一些非完全二叉树：
![none-complete-binary-tree][none-complete-binary-tree]

## 完全二叉树的应用
把完全二叉树从根结点从左到右，依次编号
![complete-binary-tree-num][complete-binary-tree-num]

1. 只要按照编号，存储到一维数组里，就可以通过一维数组的顺序还原一颗完全二叉树（上面的一维数组是：`012345`）。
2. 若结点的编号为k（k>=0），则该结点的左儿子是`2*k+1`，右儿子是左儿子加1，即`2*k+2`（跳跃式访问规律）。
3. 反过来，如果儿子的编号是x，则父结点的编号是`(int)(x-1)/2`（证明：`(int)(2*k+1-1)/2 == (int)(2*k+2-1)/2 == k`）。


堆就是利用这些特性。

[tree-node]: {{ site.images_url }}algorithm/tree/tree-node.jpg
[binary-tree]: {{ site.images_url }}algorithm/tree/binary-tree.jpg
[full-binary-tree]: {{ site.images_url }}algorithm/tree/full-binary-tree.jpg
[complete-binary-tree]: {{ site.images_url }}algorithm/tree/complete-binary-tree.jpg
[complete-binary-tree-check]: {{ site.images_url }}algorithm/tree/complete-binary-tree-check.jpg
[none-complete-binary-tree]: {{ site.images_url }}algorithm/tree/none-complete-binary-tree.jpg
[complete-binary-tree-num]: {{ site.images_url }}algorithm/tree/complete-binary-tree-num.jpg
