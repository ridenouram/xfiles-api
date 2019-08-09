const request = require('superagent');
const { parse } = require('node-html-parser');

const scrape = () => {
  return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
        .then(res => res.text)
        .then(parse)
        .then(html => {
          const labels = html.querySelectorAll('.pi-data-label').map(l => l.structuredText);
          const values = html.querySelectorAll('div .pi-data-value');
          const photoInfo = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : 'https://pbs.twimg.com/profile_images/514121481702227968/XxIE7ASP_400x400.jpeg';
          //https://vignette.wikia.nocookie.net/x-files/images/0/0b/Eugene_Victor_Tooms.jpg/revision/latest/scale-to-width-down/310?cb=20080221052611   remove the part after .jpg to get rid of resizing
          return { labels, values, photoInfo };
        })
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


//gets first description paragraph
const scrapeDesc = () => {
  return request.get(`https://x-files.fandom.com/wiki/Eugene_Victor_Tooms`)
        .then(res => res.text)
        .then(parse)
        .then(html => html.querySelector('p'))
        .then(data => console.log(data.structuredText));
}

scrape();