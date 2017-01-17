---
layout: post
title: Array.sort排序结果乱序错误
categories: 算法
date: 2017-01-15 22:31:30
pid: 20170115-223130
# you can override the settings in _config.yml here !!
---
现象：使用Array.sort排序后，得到的数组序列并不是期待的结果，相等的元素原来的次序发生了错乱，比如，[{1, "a"}, {1, "b"}]执行sort升序排序后，次序变成了[{1, "b"}, {1, "a"}]

{% include toc %}

## 对文章列表执行sort排序，结果超出预期
此站点在初始化的时候，会得到以日期降序排列的文章列表，而实现文章置顶的时候，需要对文章的pin值排序，pin值越大越靠前。所以代码是这样：

```javascript
var sortPostsByPin = function(posts) {
  posts.sort(function(post1, post2) {
    return post2.pin - post1.pin;  // pin越大越前
  });
  return posts;
}
```
直观上，得到的posts列表应该是：**原来列表的次序的基础上，pin值越大的越靠前**。
但事实上，得到的却是，pin值越大越靠前，但其余的pin值相等的文章的次序却发生了乱序，而且乱序没有规则可循。

## 为什么sort排序结果乱序
从结果来看，Array.sort只保证结果是有序的，但不保证相等的元素的次序和原来一样。**这在算法中叫做不稳定排序**。
查阅了[w3cschool](http://www.w3school.com.cn/jsref/jsref_sort.asp)的sort文档没有看到有注明，最后在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)(mozilla developer network)里，看到sort文档开头注明了它是不稳定的排序算法。

> The sort() method sorts the elements of an array in place and returns the array. **The sort is not necessarily stable**. The default sort order is according to string Unicode code points.

## 既然Array.sort是不稳定排序，怎么改进
不稳定排序和稳定排序，只在于相等的元素的次序问题。如果次序无关，那么无需改进。如果次序有关，说明还有另外一个关键字段来衡量值的优先级，把这个关键字段也作为排序的条件即可，这样整个数组就不会有相等的值存在。

比如，上述文章的排序中，为什么认为相等pin值的文章乱序了呢？是因为原来的文章是按照日期排序的，而排序后文章的日期却是乱序的。这说明，文章的日期也是排序的条件。所以，正确的排序应该是比较文章的日期和pin值。

```javascript
var sortPostsByPin = function(posts) {
  posts.sort(function(post1, post2) {
    // pin值相等，使用日期比较
    if (post2.pin == post1.pin) {
      return new Date(post2.date).getTime() - new Date(post1.date).getTime(); // date越大越前
    }
    return post2.pin - post1.pin;  // pin越大越前
  });
  return posts;
}
```

**原来的列表已经是有序的，再排序一次显然浪费了资源**，所以不使用日期来比较，而使用原来的次序来比较，可以节省资源。

```javascript
var sortPostsByPin = function(posts) {
  for (var i = 0; i < posts.length; i++) {
    posts[i].order = i;
  }
  posts.sort(function(post1, post2) {
    if (post2.pin == post1.pin) {
      return post1.order - post2.order; // order越小越前
    }
    return post2.pin - post1.pin; // pin越大越前
  });
  return posts;
}
```

**上面只优化了比较过程中创建对象的消耗，还没真正利用起原列表的有序性**，待续

## 参考文档

[W3cSchool](http://www.w3school.com.cn/jsref/jsref_sort.asp) |
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) |
