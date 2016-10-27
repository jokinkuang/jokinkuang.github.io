#!/bin/sh
myblog="."
stepbystep="../stepbystep"

cp -rvf $myblog/_includes/* $stepbystep/_includes/
cp -rvf $myblog/_layouts/* $stepbystep/_layouts/
cp -rvf $myblog/db/* $stepbystep/db/
cp -rvf $myblog/w3c/css/* $stepbystep/w3c/css/
cp -rvf $myblog/w3c/duoshuo/* $stepbystep/w3c/duoshuo/
cp -rvf $myblog/w3c/js/* $stepbystep/w3c/js/
cp -rvf $myblog/_config.yml $stepbystep/