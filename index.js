const request = require('superagent');
const cheerio = require('cheerio');
const { parse } = require('node-html-parser');

// request({
//   method: 'GET',
//   url: 'https://x-files.fandom.com/wiki/Monster_of_the_Week',
// }, (err, res, body) => {
//   console.log(body);
//   if(err) return console.error(err);
//   let $ = cheerio.load(body);
  
//   // let character = $('<h2 class="pi-item pi-item-spacing pi-title" data-source="Title">Audrey Horne</h2>');
//   // console.log(character.text());
// });

const scrape = () => {
  return request.get(`https://x-files.fandom.com/wiki/Category:Monster_of_the_Week#`)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => console.log(names));
    // // .then(tr => tr.querySelector('a'))
    // .then(stuff => console.log(stuff));
};

const findCharLink = html => html.querySelectorAll('.category-page__member-link');
const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

// const html = scrape();
// const $ = cheerio.load(html);
// console.log($("a"));


// const findCharLink = html => html.querySelectorAll('b');
// const findCharNames = objs => {
//   const names = objs.map(obj => obj.childNodes[0].rawText);
//   return names.filter(name => !name.includes('Category:'));
// };

scrape();