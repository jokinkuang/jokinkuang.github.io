---
layout: post
title: how to encrypt and decrypt file with openssl
tags: [openssl]
author: helloxk
mail: 345106552@qq.com
created: 2015-01-26 11:00:00
modified: 2015-02-27 17:55:50
---

url: http://tombuntu.com/index.php/2007/12/12/simple-file-encryption-with-openssl/

1, encrypt file

    openssl aes-256-cbc -a -salt -in secrets.txt -out secrets.txt.enc

    aes-256-cbc is the encryption cipher to be used. (256bit AES is what the United States government uses to encrypt information at the Top Secret level.)  
    -a means that the encrypted output will be base64 encoded, this allows you to view it in a text editor or paste it in an email. This is optional.
    -salt adds strength to the encryption and should always be used.
    -in secrets.txt specifies the input file.
    -out secrets.txt.enc specifies the output file.

You will be prompted for a password.

2, decrypt file

    openssl aes-256-cbc -d -a -in secrets.txt.enc -out secrets.txt.dec

    -d decrypts data.
    -a tells OpenSSL that the encrypted data is in base64.
    -in secrets.txt.enc specifies the data to decrypt.
    -out secrets.txt.dec specifies the file to put the decrypted data in.

maybe you can use this way to pass your passwork  
``
    echo U2FsdGVkX18YcWkbmhsN7M/MP1E+GLf4IqmNsa53T+A= | openssl aes-256-cbc -d -a XXX  
``  
    - I do this in ubuntu with OpenSSL 1.0.1f 6 Jan 2014, but it doesn't work! I use follow instead:

    openssl aes-256-cbc -d -a XXX -k 123456
    -k the next argument is the passphrase

3, get helps  

    openssl -h
    openssl aes-256-cbc -h

4, notes
    AES-encrypt make different output encrypted strings every time, even with the same password. it means that, a password can descrypt a lot of strings.

