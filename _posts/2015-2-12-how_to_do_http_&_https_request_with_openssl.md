---
layout: post
title: how to do http & https request with openssl 
tags: [openssl]
author: helloxk
mail: 345106552@qq.com
created: 2015-02-12 12:50:54
modified: 2015-02-27 15:55:50
---

1, do http request

```c
/* filename nossl.c */
#include "stdio.h"
#include "string.h"

#include "openssl/ssl.h"
#include "openssl/bio.h"
#include "openssl/err.h"

int main()
{
    BIO * bio;
    char resp[1024];
    int  ret;

    //char * request = "GET /cas/login?service=https%3A%2F%2Fweb.corp.ema-tech.com%3A8888%2F HTTP/1.1\x0D\x0AHost: web.corp.ema-tech.com\x0D\x0A\x43onnection: Close\x0D\x0A\x0D\x0A";
    char * request = "GET / HTTP/1.1\x0D\x0AHost: www.verisign.com\x0D\x0A\x43onnection: Close\x0D\x0A\x0D\x0A";

    /* Set up the library */
    ERR_load_BIO_strings();
    SSL_load_error_strings();
    OpenSSL_add_all_algorithms();

    /* Create and setup the connection */
    //bio = BIO_new_connect("web.corp.ema-tech.com:8888");
    bio = BIO_new_connect("www.verisign.com:80");
    if(bio == NULL) {
        fprintf(stderr, "BIO is null\n");
        return 1;
    }

    if(BIO_do_connect(bio) <= 0) {
        ERR_print_errors_fp(stderr);
        BIO_free_all(bio);
        return;
    }

    /* Send the request */
    BIO_write(bio, request, strlen(request));

    /* Read in the response */
    for(;;) {
        ret = BIO_read(bio, resp, 1023);
        if(ret <= 0) break;
        resp[ret] = 0;
        printf("%s", resp);
    }

    /* Close the connection and free the context */
    BIO_free_all(bio);

    return 0;
}
```

2, do https request

```c
/* filename withssl.c */
#include "stdio.h"
#include "string.h"

#include "openssl/ssl.h"
#include "openssl/bio.h"
#include "openssl/err.h"

int main(int argc, char *argv[])
{
    BIO * bio;
    SSL * ssl;
    SSL_CTX * ctx;

    char resp[1024];
    int  ret;

    char * request = "GET / HTTP/1.1\x0D\x0AHost: www.verisign.com\x0D\x0A\x43onnection: Close\x0D\x0A\x0D\x0A";
    //char * request = "GET / HTTP/1.1\x0D\x0AHost: worktile.com\x0D\x0A\x43onnection: Close\x0D\x0A\x0D\x0A";
    //char * request = "GET /cas/login?service=https%3A%2F%2Fweb.corp.ema-tech.com%3A8888%2F HTTP/1.1\x0D\x0AHost: web.corp.ema-tech.com\x0D\x0A""Connection: Close\x0D\x0A\x0D\x0A";
    
    /* Attention: "\x43" is "C", why is "\x43onnection" but not "Connection" ?
       because "\x0AC" in "\x0D\x0AConnection" is taken as a hex value, not the string "\nConnection"
       also, "\x0D""C" can avoid upper problem too.
     */

    /* Init SSL library */
    SSL_library_init();

    /* Set up the library */
    ERR_load_BIO_strings();
    SSL_load_error_strings();
    OpenSSL_add_all_algorithms();

    /* Set up the SSL context */
    const SSL_METHOD *method = SSLv23_client_method();	/* SSLv3 but can rollback to v2 */
    if (! method) {
        fprintf(stderr, "SSL client method failed\n");
        return 1;
    }
    printf("Method version: %d\n", method->version);

    ctx = SSL_CTX_new(method);
    if (! ctx) {
        fprintf(stderr, "SSL context is NULL\n");
        ERR_print_errors_fp(stderr);
        return 1;
    }

    /* Load the trust store */
    if(! SSL_CTX_load_verify_locations(ctx, argv[1], NULL)) {
        fprintf(stderr, "Error loading trust store\n");
        ERR_print_errors_fp(stderr);
        SSL_CTX_free(ctx);
        return 0;
    }

    /* Setup the connection */
    bio = BIO_new_ssl_connect(ctx);

    /* Set the SSL_MODE_AUTO_RETRY flag */
    BIO_get_ssl(bio, &ssl);
    SSL_set_mode(ssl, SSL_MODE_AUTO_RETRY);

    /* Create and setup the connection */
    BIO_set_conn_hostname(bio, "www.verisign.com:https");
    //BIO_set_conn_hostname(bio, "worktile.com:https");
    //BIO_set_conn_hostname(bio, "web.corp.ema-tech.com:8888");

    if(BIO_do_connect(bio) <= 0) {
        fprintf(stderr, "Error attempting to connect\n");
        ERR_print_errors_fp(stderr);
        BIO_free_all(bio);
        SSL_CTX_free(ctx);
        return 0;
    }

    /* Check the certificate */
    if(SSL_get_verify_result(ssl) != X509_V_OK)
    {
        fprintf(stderr, "Certificate verification error: %ld\n", SSL_get_verify_result(ssl));
        /*
          Error Tip "error : 19 self signed certificate in certificate chain" means:
          This means the certificate chain returned by the server ends with a ‘self signed certificate’. 
          Since the self-signed certificate is not a trusted certificate, it is reported as an error.
          You can make the problem go away by specifying a trusted root CA (certificate authority)
         */
        fprintf(stderr, "Error: %s\n", ERR_reason_error_string(ERR_get_error()));
        ERR_print_errors_fp(stderr);
        BIO_free_all(bio);
        SSL_CTX_free(ctx);
        return 0;
    }

    /* Send the request */
    BIO_write(bio, request, strlen(request));

    /* Read in the response */
    for(;;) {
        ret = BIO_read(bio, resp, 1023);
        if(ret <= 0) break;
        resp[ret] = 0;
        printf("%s", resp);
    }

    /* Close the connection and free the context */
    BIO_free_all(bio);
    SSL_CTX_free(ctx);
    return 0;
}
```

3, build & test

    gcc -o nossl nossl.c -lssl  
    gcc -o withssl withssl.c -lssl
    ./nossl
    ./withssl ./XXX.pem 

4, got a certification verify failed  
>
   if you got a certification verify failed, do  
    - get the trust certification from the server  
    - tranform into pem format file  
    - run again  
>


**Following is about how to generate a pem file**

1, what is pem ?  
PEM (short for Privacy Enhanced Mail) is one of the storetypes of CAcerts, 
the other one is called DER.
 
PEM always formated like:
>
-----BEGIN CERTIFICATE-----  
  Base64 data flow  
-----END CERTIFICATE-----  
> 
-----BEGIN CERTIFICATE-----  
  Base64 data flow  
-----END CERTIFICATE-----  
>

DER is another store type, formated like:  
>
binary... binary... binary...
>

``@NOTE`` *the Certificates in a pem is repeatable and not have to be in order*

2, how to create a pem ?  
2.1, use browser.  
>   * open the https website with a browser, and click the menu to view Certificate.
>   * then export the Certificate to afile use base64-encoded-x509.
>   * then you got a pem formated Certificate file.
>  
    ``@NOTE`` i use chromium-browser in ubuntu, but the pem files exported is not completed!
     also i use it in windows, those exported is not completed too, But it's correct 
     when use it to connect to website! You can merge them to get a completed pem file.


2.2, use java tools.  
    TOOLS: keytool InstallCert 

```java
    java InstallCert host:port   
    // Have to add all Certificates that printout, it would verify failed even only lack of one Certificate
    keytool -list -rfc -keystore ./jssecacerts -storepass changeit > XXX.pem
    // This would include Certificates of other websites stored in /home/ema/jdk1.7/jre/lib/security/cacerts
```

2.3, use openssl command line.  

```java
    openssl s_client -showcerts -connect host.host:9999 < /dev/null > XXX.pem
    // Also all the Certificates printout should add into the XXX.pem
```

