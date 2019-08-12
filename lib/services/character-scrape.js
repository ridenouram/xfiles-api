const {   
  scrapePicture,
  scrapeChartLabels,
  scrapeChartValues,
  scrapeDesc,
  scrapeCategories 
} = require('./character-page');

const { scrapeNames } = require('./character-names');

const queries = [
  '',
  '?from=Dave+the+Butcher',
  '?from=Jenny+Uphouse',
  '?from=Parker%2C+Lyle%0ALyle+Parker',
  '?from=Yale+Abbott'
]

let names = [];

async function getNames() {
  return await Promise.all(queries.map(query => {
    let url = 'https://x-files.fandom.com/wiki/Category:TXF_characters' + query;
    const arr = scrapeNames(url);
    return arr;
  }))
    .then(arr => {
      let names = [];
      for(let i = 0; i < arr.length; i++) {
        names = [...names, ...arr[i]];
      }
      // console.log(names);
      return names;
    });
}

getNames().then(names => console.log(names));



