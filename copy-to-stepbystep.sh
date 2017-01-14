#!/bin/sh
myblog="."
stepbystep="../stepbystep"

cp -rvf $myblog/_includes/* $stepbystep/_includes/
cp -rvf $myblog/_layouts/* $stepbystep/_layouts/
cp -rvf $myblog/db/* $stepbystep/db/
cp -rvf $myblog/w3c/css/* $stepbystep/w3c/css/
cp -rvf $myblog/w3c/duoshuo/* $stepbystep/w3c/duoshuo/
cp -rvf $myblog/w3c/js/* $stepbystep/w3c/js/

# only base files in the directory
cp -vf  $myblog/w3c/images/* $stepbystep/w3c/images/

cp -vf  $myblog/index.html $stepbystep/
cp -vf  $myblog/article.html $stepbystep/
cp -vf  $myblog/404.html $stepbystep/

# do not copy the _config.yml cause it has the settings of myblog
# cp -rvf $myblog/_config.yml $stepbystep/
