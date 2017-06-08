## 命令行中显示Git仓库的分支、路径

https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh

>  ~/.bash_profile

```shell
source ~/MaxhubInitShell/git-prompt.sh

export PATH=$PATH:~/MaxhubInitShell/:/Users/jokinkuang/Library/Android/sdk/platform-tools/
export PS1='\h:\u:\w$(__git_ps1 "(%s)")\$ '
```
