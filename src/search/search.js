var _ = require('lodash')

var browser = require('../web/browser')
var select = require('../web/select')

module.exports = {
  byTitle: byTitle,
  matchExactTitle: matchExactTitle
}

function byTitle(term, callback) {
  var termEncoded = encodeURIComponent(term)
  var url = 'https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=' + termEncoded + '&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle' 

  console.log("Searching for '" + term + "'...")

  return browser.get(url)
    .then(reportResults)
}

function reportResults(window) {
  var results = select(window.document)(
    '#results_wrapper .displayDetailLink > a',
    function(element)  {
      return { 
        url: element.href,
        title: element.innerHTML,
      }
    })

  console.log('Results: ' + results.length)
  
  return results
}

function matchExactTitle(title) {
  var lowerTitle = title.toLowerCase()

  return function(results) { 
    var urls = results
      .filter(function(result) { return result.title.toLowerCase() === lowerTitle })
      .map(function(result) { return result.url })
    
    console.log('Exact matches: ' + urls.length)
    
    return urls
  }
}