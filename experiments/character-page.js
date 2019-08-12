const request = require('superagent');
const { parse } = require('node-html-parser');


//gets picture URL
const scrapePicture = () => {
  return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
        .then(res => res.text)
        .then(parse)
        .then(html => html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : 'https://three-ninjas.co.uk/wp-content/uploads/2016/02/x-files.gif?w=640')
        .then(data => console.log(data));
};

//gets values from character info chart, puts into array
const scrapeChartValues = () => {
  return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
        .then(res => res.text)
        .then(parse)
        .then(html => html.querySelectorAll('div .pi-data-value'))
        .then(values => values.map(value => value.structuredText))
        .then(data => console.log(data));
}

//gets labels from character info chart, puts into array
const scrapeChartLabels = () => {
  return request.get('https://x-files.fandom.com/wiki/Eugene_Victor_Tooms')
    .then(res => res.text)
    .then(parse)
    .then(html => html.querySelectorAll('.pi-data-label'))
    .then(labels => labels.map(label => label.structuredText))
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

scrapePicture();