const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeCharacterInfo = (url) => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(html => {
      const image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : undefined
      const labels = html.querySelectorAll('.pi-data-label').map(label => label.structuredText);
      const values = html.querySelectorAll('div .pi-data-value').map(value => value.structuredText);
      const pot = html.querySelector('div .pi-data-value p');
      if(pot) pot.parentNode.removeChild(pot);
      const description = html.querySelector('div .mw-content-text p').structuredText;
      const categories = html.querySelector('div .container').querySelector('ul').querySelectorAll('li').map(value => value.structuredText);
      return { image, labels, values, description, categories }
    })
    .then(data => console.log(data)); 
}

//gets picture URL
const scrapePicture = (url) => {
  return request.get(url)
        .then(res => res.text)
        .then(parse)
        .then(html => html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : undefined)
        // .then(data => console.log(data));
};

//gets labels from character info chart, puts into array
const scrapeChartLabels = () => {
  return request.get('https://x-files.fandom.com/wiki/Eugene_Victor_Tooms')
  .then(res => res.text)
  .then(parse)
  .then(html => html.querySelectorAll('.pi-data-label'))
  .then(labels => labels.map(label => label.structuredText))
  .then(data => console.log(data));
}

//gets values from character info chart, puts into array
const scrapeChartValues = () => {
  return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
        .then(res => res.text)
        .then(parse)
        .then(html => html.querySelectorAll('div .pi-data-value'))
        .then(values => values.map(value => value.structuredText))
        .then(data => console.log(data));
}

//gets first description paragraph
const scrapeDesc = () => {
  return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
        .then(res => res.text)
        .then(parse)
        .then(html => html.querySelector('p'))
        .then(data => console.log(data.structuredText));
}

//gets a list of categories
const scrapeCategories = () => {
  return request.get('https://x-files.fandom.com/wiki/Eugene_Victor_Tooms')
    .then(res => res.text)
    .then(parse)
    .then(html => html.querySelector('div .container'))
    .then(div => div.querySelector('ul'))
    .then(ul => ul.querySelectorAll('li'))
    .then(values => values.map(value => value.structuredText))
    .then(categories => console.log(categories));
}

// //appearances
// const scrapeAppearances = () => {
//   return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
//         .then(res => res.text)
//         .then(parse)
//         .then(html => html.querySelector('.mw-redirect').parentNode)
//         // .then(parent => parent.querySelectorAll('a').innerHtml)
//         .then(data => console.log(data));
// }

scrapeCharacterInfo('https://x-files.fandom.com/wiki/Jackson_Van_De_Kamp');

module.exports = {
  scrapeCharacterInfo
}