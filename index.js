const request = require('superagent');
const { parse } = require('node-html-parser');

const scrape = () => {
  return request.get(`https://x-files.fandom.com/wiki/Monster_of_the_Week`)
    .then(res => res.text)
    .then(parse)
    .then(html => html.querySelector('tr'))
    .then(child => console.log(child.toString()));
    // .then(findCharLink)
    // .then(names => console.log(names.childNodes));
    // .then(findCharNames);
};

const findCharLink = html => html.querySelectorAll('b');
const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

scrape();