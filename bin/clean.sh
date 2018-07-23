#!/usr/bin/env bash
# functional-js
for path in starter-app \
; do
  rm -rf functional-js/$path/.cache
  rm -rf functional-js/$path/node_modules
done
