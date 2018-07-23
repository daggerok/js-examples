#!/usr/bin/env bash
# functional-js
for path in \
  ramda-functional-composition-app \
  ramda-currying-app \
  high-order-functions \
  starter-app \
; do
  rm -rf functional-js/$path/dist
  rm -rf functional-js/$path/.idea
  rm -rf functional-js/$path/.cache
  rm -rf functional-js/$path/node_modules
done
