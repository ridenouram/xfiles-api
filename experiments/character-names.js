const request = require('superagent');
const { parse } = require('node-html-parser');

//800 characters, multiple pages that list all characters - promise all for all queries and then combine arrays

const scrape = () => {
  return request.get(`https://x-files.fandom.com/wiki/Category:TXF_characters`)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => names.filter(function (str) {
        return !str.includes('File:')
      })
    )
    .then(filteredNames => console.log(filteredNames));
};

const findCharLink = html => html.querySelectorAll('.category-page__member-link');

const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

scrape();