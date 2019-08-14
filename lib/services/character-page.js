const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeCharacterInfo = (name) => {
  let url = 'https://x-files.fandom.com/wiki/' + name;
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(html => {
      let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
      if(!image) {
        image = html.querySelector('.thumbimage') ? html.querySelector('.thumbimage').rawAttrs.split('"')[1] : null;
      }
      const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
      const values = html.querySelectorAll('div .pi-data-value') ? html.querySelectorAll('div .pi-data-value').map(value => value.structuredText) : null;
      const pot = html.querySelector('div .pi-data-value p');
      if(pot) pot.parentNode.removeChild(pot);
      const caption = html.querySelector('.caption');
      if(caption) caption.parentNode.removeChild(caption);
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
    .catch(err => console.log('in scrape error', url));
}

// scrapeCharacterInfo('Alton Pugh')
//   .then(res => console.log(res));

module.exports = {
  scrapeCharacterInfo
}