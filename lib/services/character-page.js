const request = require('superagent');
const { parse } = require('node-html-parser');

//Query selects through character detail page to create a character object for saving in database
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
     
      //remove unnecessary elements in order to select description
      const extraValue = html.querySelector('div .pi-data-value p');
      if(extraValue) extraValue.parentNode.removeChild(extraValue);
      const caption = html.querySelector('.caption');
      if(caption) caption.parentNode.removeChild(caption);

      //Character description
      const description = html.querySelector('div .mw-content-text p') ? html.querySelector('div .mw-content-text p').structuredText : null;

      //Categories
      const allCategories = html.querySelector('div .container').querySelector('ul').querySelectorAll('li') ? html.querySelector('div .container').querySelector('ul').querySelectorAll('li').map(value => value.structuredText) : null;
      const categories = allCategories.filter(category => category !== 'TXF characters' && category !== 'Article stubs' && category !== 'The X-Files: Resist or Serve');
      
      //Creating info object, returned for the purpose of saving in database
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
    .catch(() => console.log('scrape error', name));
};

scrapeCharacterInfo('Dana Scully')
  .then(res => console.log(res));

module.exports = {
  scrapeCharacterInfo
};
