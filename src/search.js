const browser = require('./browser')
const select = require('./select')
const _ = require('lodash')

module.exports = {
  byTitle,
  matchExactTitle,
}

function byTitle(term, callback) {
  const termEncoded = encodeURIComponent(term)
  const url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${termEncoded}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 

  console.log(`Searching for '${term}'...`)

  return browser.get(url)
    .then(reportResults)
}

function reportResults({ document }) {
  const results = select(document)(
    '#results_wrapper .displayDetailLink > a',
    element => ({ 
      url: element.href,
      title: element.innerHTML,
    })
  )

  console.log(`Results: ${results.length}`)
  
  return results
}

function matchExactTitle(title) {
  const lowerTitle = title.toLowerCase()

  return results => { 
    const urls = results
      .filter(result => result.title.toLowerCase() === lowerTitle)
      .map(result => result.url)
    
    console.log(`Exact matches: ${urls.length}`)
    
    return urls
  }
}