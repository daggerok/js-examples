import { split, length, compose, pipe } from 'ramda';

const sentance = 'ololo trololo hohoho hohohohoho';

// 1) no:
// const words = split(/ +/, sentance);
// const len = length(words);

// 2) also no (too verbose):
// const len = length(split(/ +/, sentance));

// 3) better. but not yet prefect:
// const countWords = compose(length, split);
// const len = countWords(/ +/, sentance);
// read from right (last) to left (first argument)

// 4) almost!
// const countWordsIn = compose(length, split(/ +/));
// const len = countWordsIn(sentance);
// but natively we are humans (almost all) prefer read from right to left, so use pipe

// 5) yes, that's it!
const countWordsIn = pipe(split(/ +/), length);
const len = countWordsIn(sentance);

// and now it's brilliant!
const app = document.querySelector('#app');

app.innerHTML = `<p>
  number of words: ${len}
</p>`;
