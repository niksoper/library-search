var term = getTerm()

if (!term) {
  console.log('No search term!')
  process.exit()
}

console.log('Loading...')

var jsdom = require('jsdom')

try {
  search(term)
} catch(e) {
  console.log('caught', e)
}

function getTerm() {
  return process.argv.slice(2).join('%20')
}

function search(term) {
  var url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${term}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 
  var scripts = ['http://code.jquery.com/jquery.js']

  console.log(`Searching for ${term}...`)

  jsdom.env(
    url,
    scripts, 
    (err, window) => reportResults(window)
  )
}

function reportResults(window) {
  var results = window.jQuery('#results_wrapper a').toArray().map(l => l.href)
  console.log(`${results.length} results`)
  console.log(results)
}
