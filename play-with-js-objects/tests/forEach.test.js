import test from 'ava';

test.beforeEach(t => {
  t.context.testData = {
    ololo: 'ololo',
    trololo: 'trololo'
  };
});

test('for in object => key', t => {
  const testData = Object.assign(t.context.testData);
  for (let k in testData) {
    console.log('key: ', k, ' ; value: ', testData[k])
  }
  t.pass();
});

test('for of Object.keys => key', t => {
  const testData = Object.assign(t.context.testData);
  for (let k of Object.keys(testData)) {
    console.log(`key: ${k}, value: ${testData[k]}`)
  }
  t.pass();
});

test('for of Object.entries => [ key, value ]', t => {
  const testData = Object.assign(t.context.testData);
  for (const [k, v] of Object.entries(testData)) {
    console.log('key: ', k, ' ; value: ', v)
  }
  t.pass();
});

test('for of Object.values => value', t => {
  const testData = Object.assign(t.context.testData);
  for (const v of Object.values(testData)) {
    console.log('value: ', v)
  }
  t.pass();
});
