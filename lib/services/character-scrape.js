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

const nameArrays = queries.map(async query => {
  let url = 'https://x-files.fandom.com/wiki/Category:TXF_characters' + query;
  const arr = await scrapeNames(url);
  return arr
});

console.log(nameArrays);