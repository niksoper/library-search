const jsdom = require('jsdom')

module.exports = {
  byTitle,
  takeFirstOrExit,
}

function byTitle(term, callback) {
  const url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${term}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 
  const scripts = ['http://code.jquery.com/jquery.js']

  console.log(`Searching for ${term}...`)

  return new Promise((resolve, reject) => {
    jsdom.env(
      url,
      scripts, 
      (err, window) => {
        if (err) reject(err)
        else resolve(reportResults(window))
      }
    )
  })
}

function reportResults({ jQuery, document}) {
  return new Promise((resolve, reject) => {
    jQuery(document).ready(() => {
      const urls = jQuery('#results_wrapper a')
        .toArray()
        .map(l => l.href)
      resolve(urls)
    })
  }) 
}

function takeFirstOrExit(results) {
  const first = results[0]

  if (!first) {
    console.log('No results')
    process.exit()
  }

  return first
}