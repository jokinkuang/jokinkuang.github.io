---
layout: post
title: Visual Studio 快捷键
categories:
image: windows/vs.jpg
date: 2016-10-11 17:20:10
pid: 20161011-172010
# excerpt: ""
# you can override the settings in _config.yml here !!
---
记录一下VS的快捷键，用Xcode几个星期后回到VS一下子有点乱，还好有条件反射在，过了会就都恢复了

{% include toc %}

VS一定要装VAssistX插件，下面的快捷键部分是VX提供的。


## 跳转快捷键

快速打开文件  `Alt + Shift + O`
快速打开对象  `Alt + Shift + S`

后退  `Ctrl + -`
前进  `Ctrl + Shift + -`

跳转到变量所在位置 `Alt + G`
头文件和源文件切换 `Alt + O`
跳转到行  `Ctrl + G`

代码补全  `Ctrl + J`
查看函数原型  `Ctrl + Shift + Space`

跳转到配对的符号 `Ctrl + ]`

> 记忆：Ctrl开头


## 查找快捷键

当前查找  `Ctrl + F`
全局查找  `Ctrl + Shift + F`

> 记忆：不用记了这个


## 编辑快捷键

选择当前单词  `Ctrl + W`
删除当前行 `Ctrl + L`

复制一行  `Ctrl + C`
剪切一行  `Ctrl + X`

弹出粘贴框 `Ctrl + Shift + V`

上面插入一行  `Ctrl + Enter`
下面插入一行  `Ctrl + Shift + Enter`

删除后面一个单词  `Ctrl + Delete`
删除前面一个单词  `Ctrl + Backspace`

代码格式化 `Ctrl + K, Ctrl + F`  (四个键)
代码注释  `Ctrl + K, Ctrl + C`
注释取消  `Ctrl + K, Ctrl + U`

行首  `Home`
行尾  `End`
页首  `Ctrl + Home`
页尾  `Ctrl + End`

修改上下行交换的快捷键为 `Ctrl + Shift + Down`


## 代码折叠
折叠当前代码  `Ctrl + M, Ctrl + M`
折叠所有代码定义   `Ctrl + M, CTRL + O`
展开所有代码定义   `Ctrl + M, CTRL + L`

> 记忆：Ctrl + M 开头


## 书签操作
当前位置添加书签 `Ctrl + K, Ctrl + K`
跳到下一个书签  `Ctrl + K，Ctrl + N`
跳到上一个书签  `Ctrl + K，Ctrl + P`
弹出书签窗口 `Ctrl + K，Ctrl + W`

> 记忆：Ctrl + K 开头


## 记忆
文本的编辑或者跳转，大部分和Ctrl相关。
而代码里的常规跳转，大部分和Alt相关。
VA插件的快捷键大部分和Alt+Shift相关。


## 来源
VS2008快捷键大全

代码格式化：
1，Ctrl+K，Ctrl+F

书签操作：
1，当前位置添加书签 Ctrl + k, Ctrl + k
2，跳到下一个书签  Ctrl + k，Ctrl + n		//建议改为Ctrl + N
3，跳到上一个书签  Ctrl + k，Ctrl + p       //建议改为Ctrl + P
4，弹出书签窗口 Ctrl + k，Ctrl + w
视图>其它窗口>书签窗口

TODO任务列表：
查找“任务列表”即可，将其改为Ctrl+K，Ctrl+T
弹出任务列表视图，然后选择注释，即可查看哪里需要改进。 或者工具-选项-环境-任务列表，里面添加FIXME。

断点操作：
1，打开断点窗口 Ctrl+Alt+B

代码折叠：
1，折叠当前代码：     Ctrl + M, Ctrl + M
2，折叠所有代码定义： CTRL + M, CTRL + O
3，展开所有代码定义： CTRL + M, CTRL + L

代码跳转操作：
4，返回上一次编辑位置跳转：Alt + <- 或 Ctrl + 减号
   向前跳到刚才编辑位置： Ctrl + Shift + 减号

//位置跳转，这两个太有用了，找了半天！！！
6，大括号间跳转：Ctrl+]
9，Alt + 向上、向下： 上一个函数定义、下一个函数定义

//VA的快捷方式一般都是Alt+Shift开头。
11，查看变量：Alt + shift + S  search
12，弹出VA的open File in solution: Alt + Shift + O     //这个可能要手动设置。见下面的设置VS快捷键
13，跳到头文件，跳到实现文件： Alt + O
14，跳到变量定义：Alt + G
    返回：Ctrl + - 或 Alt + 向左
 	再切换回去：Ctrl + Shift + -

15，Ctrl+ 向左、向右 光标向左、向右跳转一个单词   可以加快光标移动。
16，下一个文档窗口： Ctrl+F6
    上一个文档窗口： Ctrl+Shift+F6       //这个改为 Ctrl+Shift+j 和 Ctrl+shift+k 来切换tab。

代码编辑操作：
1，注释： Ctrl + k Ctrl + c 添加注释， Ctrl + k Ctrl + u 取消注释  
3，自动补全，弹出可选选项，自动补全： Ctrl + j 或 Alt + ->  或 Ctrl + Alt + 空格
4，参数列表，尤其是重载了的函数，可以按向下键查看：Ctrl+Shift+space 查看参数列表

行操作：   
10，Ctrl+G: 转到指定行    
2，删除一行： Ctrl + Shift + L
   复制一样： Ctrl + C
   复制到下一行：Ctrl + C, Ctrl + V
   剪切一行： Ctrl + L 或 Ctrl + X 或 shift + delete
   弹出粘贴板列表：Ctrl + Shift + V
5，上面插入一行：Ctrl+Enter
   下面插入一行：Ctrl+Shift+Enter
7，编辑视窗向下滚动一行：Ctrl + 向下
   编辑视窗向上滚动一行：Ctrl + 向上
8，重点来了，将当前行下移一行： Alt + Shift + T （交换下一行）

下面是置换快捷键：
CTRL + T	Transpose characters
CTRL + SHIFT + T	Transpose words
ALT + SHIFT + T	Transpose lines    //可以将该快捷键改为 Ctrl+Shift+向下。

单词操作：
Ctrl+W 选中单词
Ctrl+BackSpace，Ctrl+Delete 光标前、光标后一个单词删除   可以加快删除。
Ctrl+ 向左、向右 光标向左、向右跳转一个单词   

查找操作：
Ctrl+I 当前位置向下查找
Ctrl+Shift + I 当前位置向上查找
Ctrl + F 当前查找、
Ctrl + Shift + F 解决方案查找
Ctrl + D 跳到视图上面的查找框
Esc 退出查找对话框
F3 下一个位置
Shift+F3 上一个位置
弹出VA的open File in solution: Alt + Shift + O     //这个可能要手动设置。见下面的设置VS快捷键


注：中文版的VS保存的键盘配置能导出但不能导入，原因是保存的配置是以英文键盘绑定，而导入时因为是中文环境，会找不到按键绑定！！
其实需要手动绑定的就以下几个：
把VS的Alt+shift+O快捷键去掉，那么自然就转为VX的快捷键了。
行转置 ALT + SHIFT + T
上一个文档窗口 Ctrl+shift+j
下一个文档窗口 Ctrl+shift+k

重点来了：
如何设置VS的快捷键
1，到工具 - 选项 - 环境  - 键盘
2，到“按快捷键”里按入要修改的快捷键组合，然后就会出现该快捷键被分配了的动作。比如按下Alt + Shift + O
3，下面的“快捷键当前使用对象”就是当前的分配操作，在最上面的命令列表里搜索要分配的命令，选中然后点击右边的分配，则将选中的命令分配到Alt + Shift + O，原来的快捷键被覆盖。
4，要查看某个命令的快捷键，在上面的命令列表搜索到该命令，选中，如果该命令有快捷键，则会显示在“选定命令的快捷键”，可以查看到该命令的快捷键。
其中，中文版的编辑快捷键是：搜索“编辑.向上” 等等，你可以按Ctrl+下箭头来查看。“编辑.行”可以搜索到“行转置”，即与下面的行交换。

Visual Assist X 最有用的快捷键
1、Alt + G： 在定义与声明之间互跳。
2、Alt + O： 在.h与.cpp之间互跳。（O是字母O，不是数字零）
3、Alt + Shift + Q：鼠标定位到函数名上，若是在h文件中，按此快捷键会弹出右键菜单，里面有个选项--创建定义；若是在cpp文件中，则按此快捷键会弹出右键菜单，里面有一个选项--创建声明。 这在定义好接口之后，再来写实现时，配合Alt+O是非常快捷的。当然，这种情况下，鼠标右击与Alt+O配合会更快，嘿嘿。
4、Alt + Shift + R：当想改掉一个类名或是其他东西的命名时，可能已经有很多地方引用这个名称了，这时按下此快捷键，可以很方便的辅助你重命名。（*）
5、Alt + Shift + S：方便你寻找某个对象或变量等等。（*）
6、Alt + Shift + O：定位文件。项目文件太多时，这个会帮上大忙，当然，你的文件名命名最好有个比较好的规范。
7、Alt + Shift + F：光标放到某个字符串上，按下此键，会找出所有引用了这个字符串的地方。
上面有些快捷键使用的前提是需要光标定位到函数或类、对象、变量名上。
配合ViEmu，以及visual studio本身的快捷键，这个开发环境简直太爽了。

Commands Available for Key Binding

Command	 Description	 Default Shortcut
AboutVisualAssist	 Open About dialog for Visual Assist	  
CheckforNewVersion	 Check for new version of Visual Assist	  
CloneFindReferencesResults	 Clone Find References results window	  
Documentation	 Open browser window to documentation	  
EnableDisable	Enable and disable Visual Assist	  
EnterKey	 Open dialog to enter an activation key	  
Extend Block Selection	Smart Select to initiate or extend a block selection	 Alt+]
Extend Selection	Smart Select to initiate or extend a selection	 Shift+Alt+]
FindNextbyContext	Find next reference to a symbol	  
FindPreviousbyContext	Find previous reference to a symbol	  
FindReferences	Find references to a symbol	 Alt+Shift+F
FindReferencesinFile	Find references in file	  
FindReferencesResults	 Open Find References results window	  
FindSelected	Highlight words matching the word under caret	  
FindSymbolDialog	 Open Find Symbol dialog	 Alt+Shift+S
Forums	 Open browser window to discussion forums	  
GotoImplementation	Goto declaration or implementation	 Alt+G
GotoMember	Goto Member	 Shift+Alt+G
GotoRelated	Goto related symbols	  
HashtagsGroupByFile	 Toggle grouping of entries in VA Hashtags tool window	  
HashtagsNext	 Goto location of next entry in VA Hashtags tool window	  
HashtagsNextInGroup	 Goto next entry in current group: hashtag or file	  
HashtagsPrevious	 Goto location of previous entry in VA Hashtags tool window	  
HashtagsPreviousInGroup	 Goto previous entry in current group: hashtag or file	  
HashtagsSearch	 Move focus to filter edit control of VA Hashtags tool window	  
ListIncludeFiles	 Force the header hierarchy to appear in HCB	  
ListMethodsInCurrentFile	 List methods in file	 Alt+M
NavigateBack	Navigate Back	 Alt+Left Arrow
NavigateForward	Navigate Forward	  
OpenContextMenu	Open VA context menu in text editor (Deprecated)	  
OpenCorrespondingFile	Open Corresponding File	 Alt+O
OpenFileInSolutionDialog	 Open File in Solution dialog	 Alt+Shift+O
Options	 Open options dialog for Visual Assist	  
OutlineContextMenu	 Open context menu of VA Outline	  
OutlineRefresh	 Refresh VA Outline	  
OutlineSelectInEditor	 Select corresponding item in text editor from VA Outline	  
OutlineToggleAutoUpdate	 Toggle auto update in VA Outline	  
OutlineToggleComments	 Toggle comments in VA Outline	  
Paste	 Open menu of Multiple Clipboards	 Ctrl+Shift+V
PurchaseLicense	 Open browser window to purchase a license	  
RefactorAddMember	Add Member	  
RefactorAddSimilarMember	Add Similar Member	  
RefactorChangeSignature	Change Signature	  
RefactorContextMenu	 Open Quick Refactoring Menu	 Alt+Shift+Q
RefactorCreateDeclaration	Create Declaration	  
RefactorCreateFromUsage	Create From Usage	 Alt+Shift+C
RefactorCreateImplementation	Create Implementation	  
RefactorDocumentMethod	Document Method	  
RefactorEncapsulateField	Encapsulate Field	  
RefactorExtractMethod	Extract Method	  
RefactorMoveImplementationToSourceFile	Move Implementation to Source File	  
RefactorRename	Rename	 Alt+Shift+R
RefResultsCancel	 Cancel Find References results	  
RefResultsClearAll	 Clear all Find References results	  
RefResultsContextMenu	 Open context menu of Find References results dialog	  
RefResultsCopy	 Copy text from Find References results dialog	  
RefResultsCut	 Cut text from Find References results dialog	  
RefResultsDelete	 Delete item from Find References results dialog	  
RefResultsFind	 Find in Find References results	  
RefResultsFindNext	 Find next in Find References results	  
RefResultsFindPrevious	 Find previous in Find References results	  
RefResultsGoto	 Goto method from Find References results	  
RefResultsNext	 Next in Find References results	  
RefResultsPrevious	 Previous in Find References results	  
RefResultsRefresh	 Refresh Find References results	  
RefResultsToggleHighlight	 Toggle highlight in Find References results	  
RenewMaintenance	 Open a browser window to renew software maintenance	  
ReparseCurrentFile	Reparse current file	  
ResetEditorZoom	Set editor zoom level to 100%	  
ScopeNext	Move to Next Scope	 Alt+Down Arrow
ScopePrevious	Move to Previous Scope	 Alt+Up Arrow
SelectionBlockComment	Surround selection with block comment characters	  
SelectionBlockUncomment	 Uncomment surrounded selection	  
SelectionLineComment	Surround selection with line comment characters	  
SelectionLineUncomment	 Uncomment surrounded selection	  
SelectionToggleBlockComment	 Toggle surrounded selection with block comment characters	  
SelectionToggleLineComment	 Toggle surrounded selection with line comment characters	  
Shrink Block Selection	Smart Select to decrease selection by a block	 Alt+[
Shrink Selection	Smart Select to decrease selection	 Shift+Alt+[
SortSelectedLines	Sort Selected Lines	  
SpellCheck	Spell Check comments and strings	  
SpellCheckWord	Spell Check word	  
SubmitaRequest	 Open a browser window to request technical support	  
SurroundSelectionWithBraces	Surround Selection with braces	  
SurroundSelectionWithComment	Surround Selection with comment characters	  
SurroundSelectionWithIfdefOrRegion	Surround Selection with #ifdef or #region	  
SurroundSelectionWithParentheses	Surround Selection with parentheses	  
TechnicalSupport	 Open a browser window to resources for technical support	  
TipoftheDay	 Open the Tip-of-the-Day dialog	  
ToggleColoring	 Toggle Enhanced Syntax Coloring	  
ToggleRepairCase	 Toggle Repair Case	  
ToggleSuggestions	 Toggle Suggestions	  
ToggleUnderlining	 Toggle underlining of mistyped symbols and misspelled words	  
VAHashtags	 Open the VA Hashtags tool window	 Alt+Shift+H
VAOutline	 Open the VA Outline	  
VaSnippetEdit	 Edit VA Snippets	  
VaSnippetInsert	 Insert a VA Snippet	  
VAView	 Open the VA View	  
VAViewFIS	 Open the Files in Solution dropdown in the VA View	  
VAViewHCB	 Move focus to HCB component of the VA View	  
VAViewHCBToggleLock	 Move focus to push pin in the VA View, then Space to toggle	  
VAViewMRU	 Move focus to the MRU component of the VA View	  
VAViewSIS	 Open the Symbols in Solution dropdown in the VA View	  



Ctrl+E,D ----格式化全部代码
Ctrl+E,F ----格式化选中的代码
CTRL + SHIFT + B生成解决方案
CTRL + F7 生成编译
CTRL + O 打开文件
CTRL + SHIFT + O打开项目
CTRL + SHIFT + C显示类视图窗口
F4 显示属性窗口
SHIFT + F4显示项目属性窗口
CTRL + SHIFT + E显示资源视图
F12 转到定义
CTRL + F12转到声明
CTRL + ALT + J对象浏览
CTRL + ALT + F1帮助目录
CTRL + F1 动态帮助
F1 帮助
SHIFT + F1当前窗口帮助
CTRL + ALT + F3帮助-搜索
SHIFT + ALT + ENTER全屏显示
CTRL + -向后定位
CTRL + SHIFT + -向前定位
CTRL + F4关闭文档窗口
CTRL + PAGE DOWN光标定位到窗口上方
CTRL + PAGE UP光标定位到窗口下方
CTRL + F6
CTRL + TAB下一个文档窗口
CTRL + SHIFT + F6
CTRL + SHIFT + TAB上一个文档窗口
ALT + F6下一个面板窗口
CTRL + K, CTRL + L取消remark
CTRL + K, CTRL + C注释选择的代码
CTRL + K, CTRL + U取消对选择代码的注释
CTRL + M, CTRL + O折叠代码定义
CTRL + M, CTRL + L展开代码定义
CTRL + DELETE删除至词尾
CTRL + BACKSPACE删除至词头
SHIFT + TAB取消制表符
CTRL + U转小写
CTRL + SHIFT + U转大写
CTRL + SHIFT + END选择至文档末尾
CTRL + SHIFT + HOME选择至文档末尾开始
SHIFT + END选择至行尾
SHIFT + HOME选择至行开始处
SHIFT + ALT + END垂直选择到最后尾
SHIFT + ALT + HOME垂直选择到最前面
CTRL + A全选
CTRL + W选择当前单词
CTRL + SHIFT + PAGE UP选择至本页前面
CTRL + SHIFT + PAGE DOWN选择至本页后面
CTRL + END文档定位到最后
CTRL + HOME文档定位到最前
CTRL + G转到…
CTRL + K, CTRL + P上一个标签
CTRL + K, CTRL + N下一个标签
ALT + F10调试-ApplyCodeChanges
CTRL + ALT+ Break停止调试
CTRL + SHIFT + F9 取消所有断点
CTRL + F9允许中断
CTRL + SHIFT + F5调试-重新开始
F5运行调试
CTRL + F5运行不调试
F10跨过程序执行
F11单步逐句执行
CTRL + J列出成员
CTRL + PAGE DOWN下一个视图
CTRL + B格式-粗体
CTRL + SHIFT + T格式-文字缩进
调试快捷键
F6: 生成解决方案
Ctrl+F6: 生成当前项目
F7: 查看代码
Shift+F7: 查看窗体设计器
F5: 启动调试
Ctrl+F5: 开始执行(不调试)
Shift+F5: 停止调试
Ctrl+Shift+F5: 重启调试
F9: 切换断点
Ctrl+F9: 启用/停止断点
Ctrl+Shift+F9: 删除全部断点
F10: 逐过程
Ctrl+F10: 运行到光标处
F11: 逐语句
编辑快捷键
Shift+Alt+Enter: 切换全屏编辑
Ctrl+B,T / Ctrl+K,K: 切换书签开关
Ctrl+B,N / Ctrl+K,N: 移动到下一书签
Ctrl+B,P: 移动到上一书签
Ctrl+B,C: 清除全部标签
Ctrl+I: 渐进式搜索
Ctrl+Shift+I: 反向渐进式搜索
Ctrl+F: 查找
Ctrl+Shift+F: 在文件中查找
F3: 查找下一个
Shift+F3: 查找上一个
Ctrl+H: 替换
Ctrl+Shift+H: 在文件中替换
Alt+F12: 查找符号(列出所有查找结果)
Ctrl+Shift+V: 剪贴板循环
Ctrl+左右箭头键: 一次可以移动一个单词
Ctrl+上下箭头键: 滚动代码屏幕，但不移动光标位置。
Ctrl+Shift+L: 删除当前行
Ctrl+M,M: 隐藏或展开当前嵌套的折叠状态
Ctrl+M,L: 将所有过程设置为相同的隐藏或展开状态
Ctrl+M,P: 停止大纲显示
Ctrl+E,S: 查看空白
Ctrl+E,W: 自动换行
Ctrl+G: 转到指定行
Shift+Alt+箭头键: 选择矩形文本
Alt+鼠标左按钮: 选择矩形文本
Ctrl+Shift+U: 全部变为大写
Ctrl+U: 全部变为小写
代码快捷键
Ctrl+J / Ctrl+K,L: 列出成员
Ctrl+Shift+空格键 / Ctrl+K,P: 参数信息
Ctrl+K,I: 快速信息
Ctrl+E,C / Ctrl+K,C: 注释选定内容
Ctrl+E,U / Ctrl+K,U: 取消选定注释内容
Ctrl+K,M: 生成方法存根
Ctrl+K,X: 插入代码段
Ctrl+K,S: 插入外侧代码
F12: 转到所调用过程或变量的定义
窗口快捷键
Ctrl+W,W: 浏览器窗口
Ctrl+W,S: 解决方案管理器
Ctrl+W,C: 类视图
Ctrl+W,E: 错误列表
Ctrl+W,O: 输出视图
Ctrl+W,P: 属性窗口
Ctrl+W,T: 任务列表
Ctrl+W,X: 工具箱
Ctrl+W,B: 书签窗口
Ctrl+W,U: 文档大纲
Ctrl+D,B: 断点窗口
Ctrl+D,I: 即时窗口
Ctrl+Tab: 活动窗体切换
Ctrl+Shift+N: 新建项目
Ctrl+Shift+O: 打开项目
Ctrl+Shift+S: 全部保存
Shift+Alt+C: 新建类
Ctrl+Shift+A: 新建项
VS2005的隐藏快捷键
这里我将会把一些无意中发现的VS2005中没有明确指出的快捷键共享出来，并不是所有的快捷键，或者常见的一些快捷键。
1、Ctrl+Space直接完成类或函数（本来这个并不算隐藏的快捷键，但是因为中文输入法抢占这个快捷键，所以。。。，替代的快捷键是Alt+Right）
2、Shift+Delete整行删除，并且将这一行放到剪贴板（这时候不能选中一段内容）
3、Shift+Insert粘贴，有点匪夷所思，Ctrl+V就可以了，大概是为了和Shift+Delete对应吧
4、Ctrl+Up，Ctrl+Down滚动编辑器，但尽量不移动光标，光标保证在可见范围内
5、Ctrl+BackSpace，Ctrl+Delete整词删除，有的时候很有用
6、Ctrl+Left，Ctrl+Right按整词移动光标（不算隐藏，和前面几条加起来就是Ctrl光标控制套件了）
7、Alt+Shift+F10打开执行改名，实现接口和抽象类的小窗口（还可以用Ctrl+.，不过有的中文输入法用到这个）
8、Shift+F9调试是打开QuickWatch，内容是当前光标所在处的内容
9、F12转跳到定义，很有用的快捷键
10、Shift+F12查找所有引用
---------------------------------------VS2008快捷键大全----------------------------
Ctrl+m+Crtr+o折叠所有大纲
Ctrl+M+Crtr+P: 停止大纲显示
Ctrl+K+Crtr+C: 注释选定内容
Ctrl+K+Crtr+U: 取消选定注释内容
Ctrl+J : 列出成员 智能感知
Shift+Alt+Enter: 切换全屏编辑
Ctrl+B,T / Ctrl+K,K: 切换书签开关
Ctrl+B,N / Ctrl+K,N: 移动到下一书签
Ctrl+B,P: 移动到上一书签
Ctrl+B,C: 清除全部标签
Ctrl+I: 渐进式搜索
Ctrl+Shift+I: 反向渐进式搜索
Ctrl+F: 查找
Ctrl+Shift+F: 在文件中查找
F3: 查找下一个
Shift+F3: 查找上一个
Ctrl+H: 替换
Ctrl+Shift+H: 在文件中替换
Alt+F12: 查找符号(列出所有查找结果)
Ctrl+Shift+V: 剪贴板循环
Ctrl+左右箭头键: 一次可以移动一个单词
Ctrl+上下箭头键: 滚动代码屏幕，但不移动光标位置。
Ctrl+Shift+L: 删除当前行
Ctrl+M,M: 隐藏或展开当前嵌套的折叠状态
Ctrl+M,L: 将所有过程设置为相同的隐藏或展开状态
Ctrl+E,S: 查看空白
Ctrl+E,W: 自动换行
Ctrl+G: 转到指定行
Shift+Alt+箭头键: 选择矩形文本
Alt+鼠标左按钮: 选择矩形文本
Ctrl+Shift+U: 全部变为大写
Ctrl+U: 全部变为小写
代码快捷键
Ctrl+Shift+空格键 / Ctrl+K,P: 参数信息
Ctrl+K,I: 快速信息
Ctrl+E,U / Ctrl+K,U: 取消选定注释内容
Ctrl+K,M: 生成方法存根
Ctrl+K,X: 插入代码段
Ctrl+K,S: 插入外侧代码
F12: 转到所调用过程或变量的定义
窗口快捷键
Ctrl+W,W: 浏览器窗口
Ctrl+W,S: 解决方案管理器
Ctrl+W,C: 类视图
Ctrl+W,E: 错误列表
Ctrl+W,O: 输出视图
trl+W,P: 属性窗口
Ctrl+W,T: 任务列表
Ctrl+W,X: 工具箱
Ctrl+W,B: 书签窗口
Ctrl+W,U: 文档大纲
Ctrl+D,B: 断点窗口
Ctrl+D,I: 即时窗口
Ctrl+Tab: 活动窗体切换
Ctrl+Shift+N: 新建项目
Ctrl+Shift+O: 打开项目
Ctrl+Shift+S: 全部保存
Shift+Alt+C: 新建类
Ctrl+Shift+A: 新建项
Shift+Alt+Enter: 切换全屏编辑
Ctrl+B,T / Ctrl+K,K: 切换书签开关
Ctrl+B,N / Ctrl+K,N: 移动到下一书签
Ctrl+B,P: 移动到上一书签
Ctrl+B,C: 清除全部标签
Ctrl+I: 渐进式搜索
Ctrl+Shift+I: 反向渐进式搜索
Ctrl+F: 查找
Ctrl+Shift+F: 在文件中查找
F3: 查找下一个
Shift+F3: 查找上一个
Ctrl+H: 替换
Ctrl+Shift+H: 在文件中替换
Alt+F12: 查找符号(列出所有查找结果)
Ctrl+Shift+V: 剪贴板循环
Ctrl+左右箭头键: 一次可以移动一个单词
Ctrl+上下箭头键: 滚动代码屏幕，但不移动光标位置。
Ctrl+Shift+L: 删除当前行
Ctrl+M,M: 隐藏或展开当前嵌套的折叠状态
Ctrl+M,L: 将所有过程设置为相同的隐藏或展开状态
Ctrl+M,P: 停止大纲显示
Ctrl+E,S: 查看空白
Ctrl+E,W: 自动换行
Ctrl+G: 转到指定行
Shift+Alt+箭头键: 选择矩形文本
Alt+鼠标左按钮: 选择矩形文本
Ctrl+Shift+U: 全部变为大写
Ctrl+U: 全部变为小写

VS2008 快捷键大全

Ctrl+m+Crtr+o折叠所有大纲
Ctrl+M+Crtr+P: 停止大纲显示
Ctrl+K+Crtr+C: 注释选定内容
Ctrl+K+Crtr+U: 取消选定注释内容
Ctrl+J : 列出成员 智能感知Shift+Alt+Enter: 切换全屏编辑
Ctrl+B,T / Ctrl+K,K: 切换书签开关
Ctrl+B,N / Ctrl+K,N: 移动到下一书签
Ctrl+B,P: 移动到上一书签
Ctrl+B,C: 清除全部标签
Ctrl+I: 渐进式搜索
Ctrl+Shift+I: 反向渐进式搜索
Ctrl+F: 查找
Ctrl+Shift+F: 在文件中查找
F3: 查找下一个
Shift+F3: 查找上一个
Ctrl+H: 替换
Ctrl+Shift+H: 在文件中替换
Alt+F12: 查找符号(列出所有查找结果)
Ctrl+Shift+V: 剪贴板循环
Ctrl+左右箭头键: 一次可以移动一个单词
Ctrl+上下箭头键: 滚动代码屏幕，但不移动光标位置。
Ctrl+Shift+L: 删除当前行
Ctrl+M,M: 隐藏或展开当前嵌套的折叠状态
Ctrl+M,L: 将所有过程设置为相同的隐藏或展开状态

Ctrl+E,S: 查看空白
Ctrl+E,W: 自动换行
Ctrl+G: 转到指定行
Shift+Alt+箭头键: 选择矩形文本
Alt+鼠标左按钮: 选择矩形文本
Ctrl+Shift+U: 全部变为大写
Ctrl+U: 全部变为小写代码快捷键
Ctrl+Shift+空格键 / Ctrl+K,P: 参数信息
Ctrl+K,I: 快速信息Ctrl+E,U / Ctrl+K,U: 取消选定注释内容
Ctrl+K,M: 生成方法存根
Ctrl+K,X: 插入代码段
Ctrl+K,S: 插入外侧代码
F12: 转到所调用过程或变量的定义窗口快捷键Ctrl+W,W: 浏览器窗口
Ctrl+W,S: 解决方案管理器
Ctrl+W,C: 类视图
Ctrl+W,E: 错误列表
Ctrl+W,O: 输出视图
trl+W,P: 属性窗口
Ctrl+W,T: 任务列表
Ctrl+W,X: 工具箱
Ctrl+W,B: 书签窗口
Ctrl+W,U: 文档大纲
Ctrl+D,B: 断点窗口
Ctrl+D,I: 即时窗口
Ctrl+Tab: 活动窗体切换
Ctrl+Shift+N: 新建项目
Ctrl+Shift+O: 打开项目
Ctrl+Shift+S: 全部保存
Shift+Alt+C: 新建类
Ctrl+Shift+A: 新建项
Shift+Alt+Enter: 切换全屏编辑
Ctrl+B,T / Ctrl+K,K: 切换书签开关
Ctrl+B,N / Ctrl+K,N: 移动到下一书签
Ctrl+B,P: 移动到上一书签
Ctrl+B,C: 清除全部标签
Ctrl+I: 渐进式搜索
Ctrl+Shift+I: 反向渐进式搜索
Ctrl+F: 查找
Ctrl+Shift+F: 在文件中查找
F3: 查找下一个
Shift+F3: 查找上一个
Ctrl+H: 替换
Ctrl+Shift+H: 在文件中替换
Alt+F12: 查找符号(列出所有查找结果)
Ctrl+Shift+V: 剪贴板循环
Ctrl+左右箭头键: 一次可以移动一个单词
Ctrl+上下箭头键: 滚动代码屏幕，但不移动光标位置。
Ctrl+Shift+L: 删除当前行
Ctrl+M,M: 隐藏或展开当前嵌套的折叠状态
Ctrl+M,L: 将所有过程设置为相同的隐藏或展开状态
Ctrl+M,P: 停止大纲显示
Ctrl+E,S: 查看空白
Ctrl+E,W: 自动换行
Ctrl+G: 转到指定行
Shift+Alt+箭头键: 选择矩形文本
Alt+鼠标左按钮: 选择矩形文本
Ctrl+Shift+U: 全部变为大写
Ctrl+U: 全部变为小写   









ctrl + "-"可以实现

至于别的快捷键，

命令名
快捷键
说明

编辑.折叠到定义

Ctrl + M，Ctrl + O

自动确定在代码中创建区域的逻辑边界（如过程），然后隐藏它们。

编辑.注释选定内容

Ctrl + K，Ctrl + C

使用编程语言的正确注释语法将代码的当前行标记为注释。(vc2003)

编辑.完成单词

Ctrl + j Alt + 向右键

显示基于当前语言的“完整单词”。(vc2003)

编辑.删除

Delete

删除光标右侧的一个字符。

编辑.向后删除

Backspace Shift + Backspace

删除光标左侧的一个字符。

编辑.删除水平空白

Ctrl + K，Ctrl + \

折叠所选内容中的空白；如果没有所选内容，则删除光标旁边的空白。

编辑.编排文档格式

Ctrl + K，Ctrl + D

按照“选项”对话框“文本编辑器”部分中语言的“格式设置”窗格上指定的设置，对语言应用缩进和空格格式设置。

编辑.格式化选定内容

Alt + F8   Ctrl + K，Ctrl + F

根据周围的代码行，正确缩进选定的代码行。(vc2003)（Alt + F8 调用宏资源管理器）

编辑.隐藏选定内容

Ctrl + M，Ctrl + H

隐藏选定文本。信号图标标记隐藏文本在文件中的位置。

编辑.插入制表符

Tab

将文本行缩进指定数量的空格，如 5 个。(此快捷键支持多行操作)

编辑.剪切行

Ctrl + L Shift + Alt + L

将所有选定的行剪切到“剪贴板”，若尚未选定任何内容，则将当前行剪切到剪贴板。(vc2003)（Shift + Alt + L 不起作用）

编辑.删除行

Ctrl + Shift + L

删除所有选定行；如果没有选定行，则删除当前行。

编辑.上开新行

Ctrl + Enter

在插入点之上插入一个空行。(不论光标在一行的何处)

编辑.下开新行

Ctrl + Shift + Enter

在插入点之下插入一个空行。(这样就不用先将光标移到行首或行尾了)

编辑.行转置

Shift + Alt + T

将包含插入点的行移动到下一行之下。(可以看做是两行交换)

编辑.转换为小写

Ctrl + U

将选定文本更改为小写字符。

编辑.转换为大写

Ctrl + Shift + U

将选定文本更改为大写字符。

编辑.改写模式

Insert

在插入和改写插入模式之间切换。仅在使用文本编辑器时可用。

编辑.停止隐藏当前区域

Ctrl + M，Ctrl + U

移除当前选定区域的大纲显示信息。

编辑.停止大纲显示

Ctrl + M，Ctrl + P

从整个文档中移除所有大纲显示信息。

编辑.交换定位点

Ctrl + R，Ctrl + P

交换当前选定内容的定位点与结束点。

编辑.左缩进

Shift + Tab

将选定行左移一个制表位。(此快捷键支持多行操作)

编辑.切换所有大纲显示

Ctrl + M，Ctrl + L

在隐藏和显示状态之间切换所有以前被标记为隐藏的文本部分。

编辑.切换书签

Ctrl + F2 Ctrl + K，Ctrl + K

在当前行处设置或移除书签。

编辑.切换大纲显示展开

Ctrl + M，Ctrl + M

在隐藏和显示状态之间切换当前选定的隐藏文本部分。

编辑.切换任务列表快捷方式

Ctrl + K，Ctrl + H

在当前行处设置或移除快捷方式。

编辑.切换自动换行

Ctrl + R，Ctrl + R

启用或禁用编辑器中的自动换行。

编辑.取消注释选定内容

Ctrl + K，Ctrl + U

从代码的当前行中移除注释语法。

编辑.查看空白

Ctrl + Shift + 8 Ctrl + R，Ctrl + W

显示或隐藏空格和制表符标记。

编辑.字删除直至结尾处

Ctrl + Delete

删除插入点右侧的单词。

编辑.字删除直至开始处

Ctrl + Backspace

删除插入点左侧的单词。

编辑.字转置

Ctrl + Shift + T

对调插入点两边的单词。例如，main int 将更改为 int main。

“项目”快捷键

命令名
快捷键
说明

生成.生成解决方案    CTRL + SHIFT + B    使用当前的解决方案配置生成解决方案中的所有项目。    
文件.新建文件    CTRL + SHIFT + N    显示“新建文件”对话框，在此可以选择要添加到当前项目中的新文件。    
文件.新建项目    CTRL + N    显示一个子菜单，该菜单列出可以添加到当前打开项目的项目类型。图标更改为添加的上一个项目类型。    
文件.打开文件    CTRL + SHIFT + O    显示“打开文件”对话框，在此可选择要打开的现有文件。    
文件.打开项目    CTRL + O    显示“打开项目”对话框，从中可以将新的或现有的项目添加到解决方案中。    
项目.添加现有项    CTRL + SHIFT + D    显示“添加现有项”对话框。    
项目.添加新项    CTRL + D    显示“添加新项”对话框，该对话框使您得以选择要添加到当前项目的项。    
“调试”快捷键

命令名
快捷键
说明

调试.全部中断    CTRL + BREAK    临时停止执行调试会话中的所有进程。仅适用于“运行”模式。    
调试.断点    CTRL + B    显示“断点”对话框，在此可添加和修改断点。    
调试.调用堆栈    CTRL + ALT + C    显示“调用堆栈”窗口，以显示当前执行线程的所有活动过程或堆栈帧列表。仅适用于“运行”模式。    
调试.清除所有断点    CTRL + SHIFT + F9    清除项目中的所有断点。    
调试.启用断点    CTRL + F9    在当前行上设置断点。    
调试.异常    CTRL + SHIFT + E    显示“异常”对话框。    
调试.即时    CTRL + ALT + I    显示“即时”窗口，在该窗口中可以计算表达式并执行单个的命令。    
调试.局部变量    CTRL + ALT + L    显示“局部变量”窗口，以查看当前堆栈帧中每个过程的变量及其值。    
调试.进程    CTRL + SHIFT + R    显示“进程”对话框，该对话框允许在单个解决方案中同时调试多个程序。    
调试.快速监视    SHIFT + F9    显示带有选定表达式的当前值的“快速监视”对话框。仅适用于“中断”模式。使用该命令可检查尚未为其定义监视表达式的变量、属性或其他表达式的当前值。    
调试.重新启动    CTRL + SHIFT + F5    终止调试会话，重新生成，然后从开始处开始运行应用程序。可用于“中断”模式和“运行”模式。    
调试.运行文档    CTRL + ALT + R    显示“运行文档”窗口，该窗口显示正处于调试过程中的文档集。适用于“运行”模式。    
调试.运行到光标处    CTRL + F10    在“中断”模式下，从当前语句继续执行代码，直到所选语句。“当前执行行”边距指示符出现在“边距指示符”栏中。
在“设计”模式下，启动调试器并执行代码，直到光标位置。    
调试.设置下一语句    CTRL + SHIFT + F10    在选择的代码行上设置执行点。    
调试.显示下一语句    ALT + 数字键区中的 *    突出显示要执行的下一条语句。    
调试.启动    F5    自动附加调试器，并从“<Project> 属性”对话框中指定的启动窗体运行应用程序。如果为“中断”模式，则更改为“继续”。    
调试.开始执行不调试    CTRL + F5    在不调用调试器的情况下运行代码。    
调试.逐语句    F11    在执行进入函数调用后，逐条语句执行代码。即单步执行，跟踪程序时有用得很！    
调试.跳出    SHIFT + F11    执行当前执行点所处函数的剩余行。    
调试.逐过程    F10    执行下一行代码，但不执行任何函数调用。    
调试.停止调试    SHIFT + F5    停止运行程序中的当前应用程序。可用于“中断”模式和“运行”模式。    
调试.线程    CTRL + ALT + H    显示“线程”窗口，以查看当前进程的所有线程及其相关信息。    
调试.切换断点    F9    在当前行设置或移除断点。    
调试.监视1    CTRL + ALT + W，1 键    显示“监视 1”窗口，以查看所选变量或监视表达式的值。    
调试.监视2    CTRL + ALT + W，2 键    显示“监视 2”窗口，以查看所选变量或监视表达式的值。    
调试.监视3    CTRL + ALT + W，3 键    显示“监视 3”窗口，以查看所选变量或监视表达式的值。    
调试.监视4    CTRL + ALT + W，4 键    显示“监视 4”窗口，以查看所选变量或监视表达式的值。    
“搜索和替换”快捷键

命令名
快捷键
说明

编辑.查找    CTRL + F    显示“查找”对话框。    
编辑.查找下一个    F3    查找上次搜索文本的下一个匹配项。    
编辑.查找下一个选定项    CTRL + F3    在文档中查找当前选定文本的下一个匹配项。    
编辑.查找上一个    SHIFT + F3    查找搜索文本的上一个匹配项。    
编辑.查找上一个选定项    CTRL + SHIFT + F3    查找当前选定文本的上一匹配项或者插入符号处的单词。    
编辑.转到查找组合框    CTRL + SHIFT + F    将插入符号放置在“标准”工具栏上的“查找/命令”框中。    
编辑.隐藏文本    ALT + F3，N    选择或清除“查找”和“替换”对话框中的“搜索隐藏文本”选项。    
编辑.大小写匹配    ALT + F3，C    选择或清除查找和替换操作的“大小写匹配”选项。    
编辑.正则表达式    ALT + F3，R    选择或清除允许使用特殊字符的“正则表达式”选项。仅适用于“查找”、“替换”、“在文件中查找”和“在文件中替换”对话框以及“查找/命令”框。    
编辑.替换    CTRL + H    显示“替换”对话框。    
编辑.停止搜索    ALT + F3，S    暂停当前的“在文件中查找”操作。    
编辑.向上    ALT + F3，B    选择或清除“查找”和“替换”操作的“向上搜索”选项。    
编辑.全字匹配    ALT + F3，W    选择或清除“查找”和“替换”操作的“全字匹配”选项。仅适用于“查找”、“替换”、“在文件中查找”和“在文件中替换”对话框以及“查找/命令”框。    
“文本导航”快捷键

命令名
快捷键
说明

编辑.左移字符    左箭头键    将插入点向左移动一个字符。    
编辑.右移字符    右箭头键    将插入点向右移动一个字符。    
编辑.文档结尾    CTRL + END    将插入点移动到文档的最后一行。    
编辑.文档开始    CTRL + HOME    将插入点移动到文档首行。    
编辑.转到    CTRL + G    显示“转到行”对话框。    
编辑.转到大括号    CTRL + ]    将插入点移动到文档中的下一个大括号处。    
编辑.向下移动一行    下箭头键    将插入点下移一行。    
编辑.行尾    END    将插入点移动到行尾。    
编辑.行首    HOME    将插入点移动到行首。    
编辑.向上移动一行    上箭头键    将插入点上移一行。    
编辑.下一书签    CTRL + K，CTRL + N    移动到文档中下一个书签处。    
编辑.向下翻页    PAGE DOWN    将文档或窗口向下滚动一页。    
编辑.向上翻页    PAGE UP    将文档或窗口向上滚动一页。    
编辑.上一书签    CTRL + K，CTRL + P    移动到上一书签。    
编辑.向下滚动一行    CTRL + 下箭头键    将文本向下滚动一行。    
编辑.向上滚动一行    CTRL + 上箭头键    将文本向上滚动一行。    
编辑.视图顶部    CTRL + PAGE UP    将光标移动到位于当前窗口顶部的首行。仅适用于 HTML 编辑器的“HTML”视图。    
编辑.查看空白    CTRL + R，CTRL + W    显示或隐藏空格和制表符标记。    
编辑.下一字    CTRL + 右箭头键    将插入点右移一个单词。    
编辑.上一字    CTRL + 左箭头键    将插入点移动到前一单词的开头。    
视图.查看代码    F7    在编辑器的“代码”视图中显示选定项。    
视图.视图设计器    SHIFT + F7    在编辑器或设计器的“设计”视图中显示选定项。    

“窗口管理”快捷键

命令名
快捷键
说明

窗口.激活文档窗口    ESC    关闭菜单或对话框，取消正在进行的操作，或将焦点放在当前文档窗口中。    
窗口.关闭文档窗口    CTRL + F4    关闭当前选定的文档窗口。    
窗口.关闭工具窗口    SHIFT + ESC    关闭工具窗口，如“任务列表”和“工具箱”。    
窗口.下一个文档窗口    CTRL + F6
CTRL + TAB    逐个窗口地循环通过 MDI 子窗口。    
窗口.下一窗格    ALT + F6    移动到下一工具窗口。    
窗口.下一个拆分窗格    F6    移动到单个文档的拆分窗格视图的下一个窗格。    
窗口.下一选项卡    CTRL + PAGE DOWN    移动到文档或窗口中的下一个选项卡。    
窗口.上一个文档窗口    CTRL + SHIFT + F6
CTRL + SHIFT + TAB    移动到编辑器中的前一个文档。    
窗口.上一窗格    SHIFT + ALT + F6    移动到上次选定的窗口。    
窗口.上一个拆分窗格    SHIFT + F6    移动到拆分窗格视图中的文档的上一个窗格。    
窗口.上一选项卡    CTRL + PAGE UP    移动到文档或窗口中的上一个选项卡。    
“工具窗口”快捷键

命令名
快捷键
说明

视图.文档大纲    CTRL + ALT + T    显示“文档大纲”窗口，以查看当前文档的平面或层次大纲。    
视图.对象浏览器    CTRL + ALT + B
F2
   显示“对象浏览器”，以查看可用于包的类、属性、方法、事件和常数以及项目中的对象库和过程。当在编辑器中时，F2 键只显示对象浏览器。    

视图.输出    CTRL + ALT + O    显示“输出”窗口，该窗口显示生成和其他状态信息。    
视图.属性窗口    F4    显示“属性”窗口。    
视图.属性页    SHIFT + F4    显示“解决方案资源管理器”窗口中的当前选定项的属性页。    
视图.刷新    CTRL + R    更新当前显示在 Web 浏览器窗口中的信息。    
视图.解决方案资源管理器    CTRL + ALT + J    显示“解决方案资源管理器”窗口。    
视图.任务列表    CTRL + ALT + K    显示“任务列表”窗口，在该窗口中可以对任务、注释、快捷方式、警告和错误信息进行自定义、分类和管理。    
视图.工具箱    CTRL + ALT + X    显示“工具箱”。
