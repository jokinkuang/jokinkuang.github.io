---
layout: post
title: 动态内存分配
tags: [C]
---

## 什么是动态内存分配
我们知道数组的元素存储在内存中连续的位置。当一个数组声明的时候，它的内存在编译是被分配。同样，你也能利用动态内存分配来使得内存在运行时分配。
## Why Use Dynamic Allocation
当你声明一个数组的时候，数组的大小必须在编译时就存在。但是有时候，数组的大小是在运行时才知道的，例如有些时候我们需要运算得到数组的大小，此时就需要用用到动态内存分配。
## Malloc and Free
c库中存在两个函数，malloc和free，分别是动态内存分配和删除。这两个函数维持这一个可用内存池。当程序需要添加内存时，调用malloc，从池中得到适当的内存并且返回一个指向该内存快的指针。当分配的内存块不再需要时可以调用free函数。

这两个函数在stdlib.h中，定义如下：

```c
void *malloc( size_t size );
void *free( void *pointer );
```

malloc函数的参数是所需要内存的大小。如果能够满足这个大小，则函数返回一个指向分配的内存(连续内存)的起始位置的指针，注意是void*指针，有些老的编译器需要强制转换。如果可用内存池不能满足这个大小的话，那么会返回NULL。

On machines with boundary alignment requirements, the memory returned by malloc  will always begin on a boundary that is suitable for the data type with the most stringent alignment requirements. 

需要注意的是,malloc函数分配得到的内存空间是未初始化的。因此，一般在使用该内存空间时，要调用另一个函数memset来将其初始化为全0。memset函数的声明如下：

```c 
void * memset (void * p,int c,int n) ;
```
 
该函数可以将指定的内存空间按字节单位置为指定的字符c。其中，p为要清零的内存空间的首地址，c为要设定的值，n为被操作的内存空间的字节长度。如果要用memset清0，变量c实参要为0。malloc函数和memset函数的操作语句一般如下：

```c
int * p=NULL; 
p=(int *)malloc(sizeof(int)); 
if(p==NULL) 
    printf(“Can’t get memory!\n”); 
memset(p,0,siezeof(int));
```
注意：通过malloc函数得到的堆内存必须使用memset函数来初始化。
malloc实例：

```c
#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 
int main() 
{ 
     int * p=NULL; 
     p=(int *)malloc(sizeof(int));

     if(NULL==p){ 
         printf("Can't get memory!\n"); 
         return -1; 
     }

     printf("%d\n",*p);           //输出分配的空间上的值 
     memset(p,0,sizeof(int));     //将p指向的空间清0 
     printf("%d\n",*p);           //输出调用memset函数后的结果

     *p=2; 
     printf("%d\n",*p);

     return 0; 
}
```

如果你想更多的了解malloc/free的原理实现，可以参照这篇博客：[malloc/free函数的简单实现及思考](http://www.cnblogs.com/wuyuegb2312/archive/2013/05/03/3056309.html)

## Calloc and Realloc
这儿有两个额外的内存分配函数，calloc和realloc，定义如下：

```c
void *calloc( size_t num_elementa,size_t element_size );
void *realloc( void *ptr, size_t new_size );
```

calloc函数的参数：num_elementa,元素的个数；element_size,该元素的大小。通过两个参数计算分配内存大小。
calloc与malloc最大的不同在于：calloc函数得到的内存空间是经过初始化的，其内容全为0。而malloc并不会初始化。calloc函数适合为数组申请空间，可以将element_size设置为数组元素的空间长度，将num_elementa设置为数组的容量。

calloc实例：

```c
#include <stdio.h> 
#include <stdlib.h>

#define SIZE 5 
int main() 
{ 
     int * p=NULL; 
     int i=0;

     //为p从堆上分配SIZE个int型空间 
     p=(int *)calloc(SIZE,sizeof(int)); 
     if(NULL==p){ 
         printf("Error in calloc.\n"); 
         return -1; 
     }

     //为p指向的SIZE个int型空间赋值 
     for(i=0;i<SIZE;i++) 
         p[i]=i;

     //输出各个空间的值 
     for(i=0;i<SIZE;i++) 
         printf("p[%d]=%d\n",i,p[i]);

     free(p); 
     p=NULL; 
     return 0; 
}
```

realloc函数的功能比malloc函数和calloc函数的功能更为丰富，可以实现内存分配和内存释放的功能， 
其中，指针ptr必须为指向堆内存空间的指针，即由malloc函数、calloc函数或realloc函数分配空间的指针。realloc函数将指针ptr指向的内存块的大小改变为new_size字节。如果new_size小于或等于ptr之前指向的空间大小，那么。保持原有状态不变。如果new_size大于原来ptr之前指向的空间大小，那么，系统将重新为ptr从堆上分配一块大小为new_size的内存空间，同时，将原来指向空间的内容依次复制到新的内存空间上，ptr之前指向的空间被释放。relloc函数分配的空间也是未初始化的。

注意：使用malloc函数，calloc函数和realloc函数分配的内存空间都要使用free函数或指针参数为NULL的realloc函数来释放。

realloc实例：

```c
#include <stdio.h> 
#include <stdlib.h> 
int main() 
{ 
     int * p=NULL; 
     p=(int *)malloc(sizeof(int)); 
     *p=3;

     printf("p=%p\n",p); 
     printf("*p=%d\n",*p);

     p=(int *)realloc(p,sizeof(int));

     printf("p=%p\n",p); 
     printf("*p=%d\n",*p); 

     p=(int *)realloc(p,3*sizeof(int)); 
     printf("p=%p\n",p); 
     printf("*p=%d",*p);

    //释放p指向的空间 
     realloc(p,0); 
     p=NULL; 
     return 0; 
}
```

乐此不疲~
