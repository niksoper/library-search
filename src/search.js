const api = require('./api')

module.exports = {
  byTitle,
  takeFirstOrExit,
}

function byTitle(term, callback) {
  const url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${term}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 

  console.log(`Searching for ${term}...`)

  return api.get(url)
    .then(reportResults)
}

function reportResults1(jQuery) {
  const urls = jQuery('#results_wrapper a')
    .toArray()
    .map(l => jQuery(l).text())
  
  return urls
}

function reportResults($) {
  return $('#results_wrapper a').map(function() {
    return $(this)//.attr('href')
  }).get()
}

function takeFirstOrExit(results) {
  const first = results[0]

  if (!first) {
    console.log('No results')
    process.exit()
  }

  return first
}