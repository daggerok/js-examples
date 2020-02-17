# ava unit testing template

## init project

```bash
mkdir ava-template
cd ava-template/
npm init ava
```

## create test

_test.js_

```js
const test = require('ava');

test('foo', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});
```

## run test

```bash
npm t
## output:
#> @ test /path/to/ava-template
#> ava
#  2 tests passed
```
