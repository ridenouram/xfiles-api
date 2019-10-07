const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeCharacterInfo = (name) => {
  return request.get('https://x-files.fandom.com/wiki/' + name)
    .then(res => parse(res.text))
    .then(html => {
      //character image
      let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
      if(!image) {
        image = html.querySelector('.thumbimage') ? html.querySelector('.thumbimage').rawAttrs.split('"')[1] : null;
      }

      //character info chart
      const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
      const values = html.querySelectorAll('div .pi-data-value') ? html.querySelectorAll('div .pi-data-value').map(value => value.structuredText) : null;
      const extraValue = html.querySelector('div .pi-data-value p');
      if(extraValue) extraValue.parentNode.removeChild(extraValue);

      //remove caption in order to select description
      const caption = html.querySelector('.caption');
      if(caption) caption.parentNode.removeChild(caption);

      const description = html.querySelector('div .mw-content-text p') ? html.querySelector('div .mw-content-text p').structuredText : null;

      //Categories
      const allCategories = html.querySelector('div .container').querySelector('ul').querySelectorAll('li') ? html.querySelector('div .container').querySelector('ul').querySelectorAll('li').map(value => value.structuredText) : null;
      const categories = allCategories.filter(category => category !== 'TXF characters' && category !== 'Article stubs' && category !== 'The X-Files: Resist or Serve');
      
      //Creating info object for saving in database
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
    .catch(() => console.log('in scrape error', name));
};

// scrapeCharacterInfo('Alton Pugh')
//   .then(res => console.log(res));

module.exports = {
  scrapeCharacterInfo
};
