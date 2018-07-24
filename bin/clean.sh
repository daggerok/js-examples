#!/usr/bin/env bash
# functional-js
for path in \
  functional-calorie-counter-app \
  virtual-dom-counter-app \
  pure-counter-app \
  counter-app \
  calorie-counter-app \
  ramda-functional-composition \
  ramda-currying \
  high-order-functions \
  starter \
; do
  rm -rf functional-js/$path/dist
  rm -rf functional-js/$path/.idea
  rm -rf functional-js/$path/.cache
  rm -rf functional-js/$path/node_modules
done
