const request = require('superagent');
const { parse } = require('node-html-parser');

const scrape = () => {
  return request.get(`https://x-files.fandom.com/wiki/Category:Monster_of_the_Week#`)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => console.log(names));
};

const findCharLink = html => html.querySelectorAll('.category-page__member-link');

const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

scrape();