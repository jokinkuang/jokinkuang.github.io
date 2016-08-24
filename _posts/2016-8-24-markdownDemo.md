---
layout: post
title: Markdown Demo
categories: markdown
pid: 20160824-123800
---
# 1

## 2
### H3
#### H4

###### H5

> This is a blockquote.
>
> This is the second paragraph in the blockquote.
>
> ## This is an H2 in a blockquote

Some of these words *are emphasized*.
Some of these words _are emphasized also_.

Use two asterisks for **strong emphasis**.
Or, if you prefer, __use two underscores instead__.

inline `code`

*   Candy.
*   Gum.
*   Booze.

+   Candy.
+   Gum.
+   Booze.

-   Candy.
-   Gum.
-   Booze.

1.  Red
2.  Green
3.  Blue

*   A list item.

    With multiple paragraphs.

*   Another item in the list.

This is an [example link](http://example.com/).
This is an [example link](http://example.com/ "With a Title").
I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"

I start my morning with a cup of coffee and
[The New York Times][NY Times].

[ny times]: http://www.nytimes.com/


![alt text](/path/to/img.jpg "Title")
![alt text][id]
[id]: /path/to/img.jpg "Title"


### GFM

```c
int main() {
	printf("hello world!");
}
```

## Task Lists

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

## Tables

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column


## SHA references

Any reference to a commit’s SHA-1 hash will be automatically converted into a link to that commit on GitHub.

16c999e8c71134401a78d4d46435517b2271d6ac
mojombo@16c999e8c71134401a78d4d46435517b2271d6ac
mojombo/github-flavored-markdown@16c999e8c71134401a78d4d46435517b2271d6ac
Issue references within a repository

Any number that refers to an Issue or Pull Request will be automatically converted into a link.

#1
mojombo#1
mojombo/github-flavored-markdown#1
Username @mentions

Typing an @ symbol, followed by a username, will notify that person to come and view the comment. This is called an “@mention”, because you’re mentioning the individual. You can also @mention teams within an organization.

## Automatic linking for URLs

Any URL (like http://www.github.com/) will be automatically converted into a clickable link.

## Strikethrough

Any word wrapped with two tildes (like ~~this~~) will appear crossed out.

## Emoji

GitHub supports emoji! :sparkles: :camel: :boom:

To see a list of every image we support, check out the Emoji Cheat Sheet.
