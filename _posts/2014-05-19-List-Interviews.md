---
layout: post
title: 单链表的一些常见面试题汇总
tags: [ACM]
---
## 单链表的一些常见面试题汇总
1. 单链表反转/逆序
2. 求单链表倒数第N个数
3. 找到单链表的中间结点
4. 如何判断链表是否有环的存在
5. 单链表建环，无环链表变有环
6. 如何知道环的长度？
7. 如何找出环的连接点在哪里？
8. 删除单链表中的重复元素

下面我先简单叙述一下每道题的思路，然后把实现的程序一起贴出来，不会讲得太细，我觉得只要有了思路之后，接下来的难点就是语言上的一些细节问题了，这个不自己去实现，听别人讲是体会不到的。
要实现下面的代码你首先要会实现单链表, see：[线性表](http://leihuang.net/2014/04/17/List/)

## 1.单链表反转
我是利用三个指针来实现的，三个连续指针依次向前移动，每次反转前两个指针指向数之间的指针。

代码如下：

```c
/* 链表反转  */
void ReverseList(List *L)
{
    if(!L->Next->Next)
        ;
    else{
        List *pTemp = L->Next->Next->Next ;
        List *pMid = L->Next->Next ;
        List *pCurrent = L->Next ;
        L->Next->Next = NULL ;
        while(pTemp){
            pMid->Next = pCurrent ;
            pCurrent = pMid ;
            pMid = pTemp ;
            pTemp = pTemp->Next ;
        }
        pMid->Next = pCurrent ;
        L->Next = pMid ;
    }
}
```

## 2.求单链表倒数第N个数
利用两指针遍历表，保持他们的距离为n，当后面的指针为NULL时，输出前面指针所指向的数，即倒数第N个数。

函数代码：

```c
/* 求单链表倒数第N个数 */
int NIndex(List L,int n)
{
    List *fir,*sec ;
    fir = L.Next ;
    sec = L.Next ;
    int i ;
    for(i=0;sec;++i){
        if(i>=n){
            fir = fir->Next ;
            sec = sec->Next ;
        }else
            sec = sec->Next ;
    }
    return fir->elem ;
}
```

## 3.找到单链表的中间结点
也是利用两个指针，一个慢移动指针(一次走一步)，一个快移动指针(一次走两步)，当快指针指向NULL时，则慢指针指向中间节点。

代码如下：

```c
/* 输出单链表的中间结点*/
int Mid(List L)
{
    List *fir,*sec ;
    fir = L.Next ;
    sec = L.Next ;
    while(sec->Next&&sec->Next->Next){
        fir = fir->Next ;
        sec = sec->Next->Next ;
    }
    return fir->elem ;
}
```

## 4.如何判断链表是否有环的存在
利用快慢指针遍历链表，如果存在环，则两指针会相遇，否则快指针会指向NULL结束。

函数代码：

```c
/*判断链表是否存在环 */
bool HasCycle(List *L)
{
    List *slow,*fast ;  /* 一个走两步，一个走一步*/
    slow = L ;
    fast = L ;
    while(fast&&fast->Next){
        slow = slow->Next ;
        fast = fast->Next->Next ;
        if(slow == fast) break ;
    }
    return !(fast==NULL||fast->Next == NULL) ;
}
```

## 5.单链表建环，无环链表变有环
将最后一个指针指向你所指定的结点。

函数代码：

```c
/* 如果单链表没环，则给它制指定位置n建环操作 */
void CreateCycle(int n,List *L) 
{
    if(HasCycle(L)){
        printf("L has already cycle!") ;
        exit(-1) ;
    }
    List *entry,*pCurrent ; //环入口结点
    int i ;

    pCurrent = L ;
    for(i=0;pCurrent->Next;++i){
        if(i==n)
            entry = pCurrent ;
        pCurrent = pCurrent->Next ;
    }
    if(i<n){
        printf("n is bigger than the length of L") ;
        exit(-1) ;
    }else
        pCurrent->Next = entry ;
}
```

## 6.如何知道环的长度?
快慢指针从第一次相遇开始到第二次相遇，慢指针走过的距离即环的长度。

代码如下：

```c
/* 如果存在环，则输出其长度*/
int LenCycle(List *L)
{
    int i,k ;
    i=k=0 ;
    if(HasCycle(L)){
        List *slow,*fast ;
        slow = L ;
        fast = L->Next->Next ;

        while(i!=2){
            if(i==1)
                ++k ;
            if(slow==fast){
                ++i ;
            }
            slow = slow->Next ;
            fast = fast->Next->Next ;
        }
    }else{
        printf("L hasn't cycle!\n") ;
        exit(-1) ;
    }
    return k ;
}
```

## 7.如何找出环的连接点在哪里?
有定理：碰撞点p到连接点的距离=头指针到连接点的距离，因此，分别从碰撞点、头指针开始走，相遇的那个点就是连接点。

代码实现：

```c
/* 输出环的链接点*/
int EntryCycle(List *L)
{
    if(HasCycle(L)){
        List *slow,*fast ;  /* 一个走两步，一个走一步*/
        slow = L ;
        fast = L ;
        while(fast&&fast->Next){
            slow = slow->Next ;
            fast = fast->Next->Next ;
            if(slow==fast) break ;
            printf("hello\n") ;
        }

        List *head = L ;

        while(head!=slow){
            head = head->Next ;
            slow = slow->Next ;

            printf("world\n") ;
        }
        return slow->elem ;
    }else{
        printf("L hasn't cycle!") ;
    }
}
```

## 8.删除单链表中的重复元素
使用到两个指针，其中一个指针pCurrent从第一个元素开始遍历，另外一个指针run从pCurrent后一个数开始遍历。

- 如果存在run指向的数等于pCurrent指向的数则删除pCurrent指向的数，回到pCurrent遍历;
- 如果run走到链表末尾还没找到相等结点，则回到pCurrent遍历。

代码如下：

```c
/* 删除相同的元素*/
void DelSame(List *L)
{
    List *run,*pCurrent ;
    pCurrent = L->Next ;
    
    while(pCurrent){
        run = pCurrent->Next ;
        while(run){
            if(pCurrent->elem == run->elem){
                Delete(pCurrent->elem,L) ;
                break ;
            }
            run = run->Next ;
        }
        pCurrent = pCurrent->Next ;
    }
}
```

## 所有代码汇总源程序

```c
/*************************************************************************
	> File Name: reverselist.c
	> Author: huanglei
	> Mail: huanglei2109@gmail.com 
	> Created Time: 2014年05月19日 星期一 12时44分36秒
 ************************************************************************/

#include<stdio.h>
#include<stdlib.h>
typedef struct Node
{
    int elem ;
    Node *Next ;
}List;
void InitList(List *L) ;
void Insert(int e,List *L) ;
void Delete(int e,List *L) ;
void PrintList(List L) ;

/* 链表反转  */
void ReverseList(List *L) ;

/* 求单链表倒数第N个数 */
int NIndex(List L,int n) ;

/* 输出单链表的中间结点*/
int Mid(List L) ;

/*判断链表是否存在环 */
bool HasCycle(List *L) ;

/* 如果单链表没环，则给它制指定位置n建环操作 */
void CreateCycle(int n,List *L) ;

/* 如果存在环，则输出其长度*/
int LenCycle(List *L) ;

/* 输出环的链接点*/
int EntryCycle(List *L) ;

/* 删除相同的元素*/
void DelSame(List *L) ;

main()
{
    List L ;
    InitList(&L) ;
    Insert(1,&L) ;
    Insert(2,&L) ;
    Insert(3,&L) ;
    Insert(2,&L) ;
    Insert(5,&L) ;
    //Delete(1,&L);
    DelSame(&L) ;
    PrintList(L) ;
    printf("\n") ;

    ReverseList(&L) ;
    PrintList(L) ;
    printf("\n") ;

    printf("%d\n",NIndex(L,2)) ;

    printf("%d\n",Mid(L)) ;

    if(HasCycle(&L))
        printf("L has cycle!\n") ;
    else
        printf("L hasn't cycle\n") ;

    CreateCycle(2,&L) ;
    if(HasCycle(&L))
        printf("L has cycle!\n") ;
    else
        printf("L hasn't cycle\n") ;

    //CreateCycle(1,&L) ; //会提示已经有环了，不能再创建

    printf("the length cycle is %d\n",LenCycle(&L)) ;

    printf("the entry is %d\n",EntryCycle(&L)) ;
}

/* 链表反转  */
void ReverseList(List *L)
{
    if(!L->Next->Next)
        ;
    else{
        List *pTemp = L->Next->Next->Next ;
        List *pMid = L->Next->Next ;
        List *pCurrent = L->Next ;
        L->Next->Next = NULL ;
        while(pTemp){
            pMid->Next = pCurrent ;
            pCurrent = pMid ;
            pMid = pTemp ;
            pTemp = pTemp->Next ;
        }
        pMid->Next = pCurrent ;
        L->Next = pMid ;
    }
}

/* 求单链表倒数第N个数 */
int NIndex(List L,int n)
{
    List *fir,*sec ;
    fir = L.Next ;
    sec = L.Next ;
    int i ;
    for(i=0;sec;++i){
        if(i>=n){
            fir = fir->Next ;
            sec = sec->Next ;
        }else
            sec = sec->Next ;
    }
    return fir->elem ;
}

/* 输出单链表的中间结点*/
int Mid(List L)
{
    List *fir,*sec ;
    fir = L.Next ;
    sec = L.Next ;
    while(sec->Next&&sec->Next->Next){
        fir = fir->Next ;
        sec = sec->Next->Next ;
    }
    return fir->elem ;
}

/*判断链表是否存在环 */
bool HasCycle(List *L)
{
    List *slow,*fast ;  /* 一个走两步，一个走一步*/
    slow = L ;
    fast = L ;
    while(fast&&fast->Next){
        slow = slow->Next ;
        fast = fast->Next->Next ;
        if(slow == fast) break ;
    }
    return !(fast==NULL||fast->Next == NULL) ;
}

/* 如果单链表没环，则给它制指定位置n建环操作 */
void CreateCycle(int n,List *L) 
{
    if(HasCycle(L)){
        printf("L has already cycle!") ;
        exit(-1) ;
    }
    List *entry,*pCurrent ; //环入口结点
    int i ;

    pCurrent = L ;
    for(i=0;pCurrent->Next;++i){
        if(i==n)
            entry = pCurrent ;
        pCurrent = pCurrent->Next ;
    }
    if(i<n){
        printf("n is bigger than the length of L") ;
        exit(-1) ;
    }else
        pCurrent->Next = entry ;
}

/* 如果存在环，则输出其长度*/
int LenCycle(List *L)
{
    int i,k ;
    i=k=0 ;
    if(HasCycle(L)){
        List *slow,*fast ;
        slow = L ;
        fast = L->Next->Next ;

        while(i!=2){
            if(i==1)
                ++k ;
            if(slow==fast){
                ++i ;
            }
            slow = slow->Next ;
            fast = fast->Next->Next ;
        }
    }else{
        printf("L hasn't cycle!\n") ;
        exit(-1) ;
    }
    return k ;
}

/* 输出环的链接点*/
int EntryCycle(List *L)
{
    if(HasCycle(L)){
        List *slow,*fast ;  /* 一个走两步，一个走一步*/
        slow = L ;
        fast = L ;
        while(fast&&fast->Next){
            slow = slow->Next ;
            fast = fast->Next->Next ;
            if(slow==fast) break ;
        }

        List *head = L ;

        while(head!=slow){
            head = head->Next ;
            slow = slow->Next ;
        }
        return slow->elem ;
    }else{
        printf("L hasn't cycle!") ;
    }
}

/* 删除相同的元素*/
void DelSame(List *L)
{
    List *run,*pCurrent ;
    pCurrent = L->Next ;
    
    while(pCurrent){
        run = pCurrent->Next ;
        while(run){
            printf("hello\n") ;
            if(pCurrent->elem == run->elem){
                printf("world\n") ;
                Delete(pCurrent->elem,L) ;
                break ;
            }
            run = run->Next ;
        }
        pCurrent = pCurrent->Next ;
    }
}


/* 链式存储链表的基本操作*/
void InitList(List *L)
{
    L->Next = NULL ;
}

void Insert(int e,List *L)
{
    List *pCurrent ;
    pCurrent = L ;
    List *eNode = (List*)malloc(sizeof(struct Node)) ;
    if(eNode==NULL){
        printf("out of space!") ;
        exit(-1) ;
    }
    for(;pCurrent->Next;pCurrent=pCurrent->Next)
        ;
    pCurrent->Next = eNode ;
    eNode->elem = e ;
}

void PrintList(List L)
{
    List *pCurrent ;
    pCurrent = L.Next ;
    if(L.Next==NULL)
        printf("list is empty") ;
    else{
        for(;pCurrent;pCurrent=pCurrent->Next)
            printf("%d->",pCurrent->elem) ;
    }
}

void Delete(int e ,List *L)
{
    List *pCurrent,*tmp ;
    pCurrent = L ;
    while(pCurrent->Next->elem!=e&&pCurrent->Next)
        pCurrent = pCurrent->Next ;
    if(!pCurrent->Next){
        printf("%d is not exit!\n",e) ;
    }else{
        tmp = pCurrent->Next->Next ;
        free(pCurrent->Next) ;
        pCurrent->Next = tmp ;
    }
}
```

输出如下：
>1->3->2->4->5->

>5->4->2->3->1->

>3

>2

>L hasn't cycle

>L has cycle!

>the length cycle is 4

>the entry is 4



乐此不疲～
