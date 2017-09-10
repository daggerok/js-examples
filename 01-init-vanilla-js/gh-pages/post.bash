#!/bin/bash

# replace base-path with root:
# /js-examples/ -> /

if ! [ -z "$1" ]; then
  sed -i -e "s/\<head\>\<base\ href=\"\/js-examples\/\"\/>/\<head\>/g" $1
  sed -i -e "s/\(href=\"\/js-examples\/\)/href=\"\//g" $1
  sed -i -e "s/\(src=\"\/js-examples\/\)/src=\"\//g" $1
  rm -rf .nojekyll 404.html $1-e
fi
