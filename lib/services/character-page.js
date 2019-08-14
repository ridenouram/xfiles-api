const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeCharacterInfo = (url) => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(html => {
      const image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
      const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
      const values = html.querySelectorAll('div .pi-data-value') ? html.querySelectorAll('div .pi-data-value').map(value => value.structuredText) : null;
      const pot = html.querySelector('div .pi-data-value p');
      if(pot) pot.parentNode.removeChild(pot);
      const name = html.querySelector('div .mw-content-text p b') ? html.querySelector('div .mw-content-text p b').structuredText : null;
      const description = html.querySelector('div .mw-content-text p') ? html.querySelector('div .mw-content-text p').structuredText : null;
      const categories = html.querySelector('div .container').querySelector('ul').querySelectorAll('li') ? html.querySelector('div .container').querySelector('ul').querySelectorAll('li').map(value => value.structuredText) : null;
      const info = {};
      info.name = name;
      if(labels && values) {
        for(let i = 0; i < labels.length; i++) {
          if(labels[i] === 'Portrayed by') {
            info.portrayedBy = values[i];
          }
          else {
            info[labels[i].toLowerCase()] = values[i];
          }
        }
      }
      info.image = image;
      info.description = description;
      info.categories = categories;
      return info;
    })
    .catch(err => console.log('in scrape error'));
}

scrapeCharacterInfo('https://x-files.fandom.com/wiki/Sister Abigail');

module.exports = {
  scrapeCharacterInfo
}