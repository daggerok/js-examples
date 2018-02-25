#!/bin/bash

# add base tag:
# <head> -> <head><base href="/js-examples/"/>

if ! [ -z "$1" ]; then
  sed -i -e "s/\(src=\"\/\)/src=\"\/js-examples\//g" $1
  sed -i -e "s/\(href=\"\/\)/href=\"\/js-examples\//g" $1
  sed -i -e "s/\(<head>\)/<head><base href=\"\/js-examples\/\"\/>/g" $1
  cp -Rf $1 404.html
  touch .nojekyll
fi
