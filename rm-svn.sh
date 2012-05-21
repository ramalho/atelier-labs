#!/bin/bash
for f in `find . -name .svn`
do
    rm -rf $f
done
