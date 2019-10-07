const request = require('superagent');
const { parse } = require('node-html-parser');

//Gets and parses html for character list page, gets character names, returns array of strings
const scrapeNames = url => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => names.filter(function(str) {
      return !str.includes('File:');
    }))
    .catch(err => console.log(err));
};

//Query selects for <a> to character page
const findCharLink = html => html.querySelectorAll('.category-page__member-link');

//Gets the character name text from the link
const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

//For Demo
scrapeNames('https://x-files.fandom.com/wiki/Category:TXF_characters')
  .then(names => console.log(names));

module.exports = {
  scrapeNames
};
