const jsdom = require('jsdom')

module.exports = {
  byTitle: byTitle
}

function byTitle(term, callback) {
  const url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${term}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 
  const scripts = ['http://code.jquery.com/jquery.js']

  console.log(`Searching for ${term}...`)

  jsdom.env(
    url,
    scripts, 
    (err, window) => reportResults(window, callback)
  )
}

function reportResults(window, callback) {
  const results = window.jQuery('#results_wrapper a').toArray().map(l => l.href)
  callback(results)
}