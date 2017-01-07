const term = getTerm()

if (!term) {
  console.log('No search term!')
  process.exit()
}

console.log('Loading...')

const jsdom = require('jsdom')

try {
  search(term)
} catch(e) {
  console.log('caught', e)
}

function getTerm() {
  return process.argv.slice(2).join('+')
}

function search(term) {
  const url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${term}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 
  const scripts = ['http://code.jquery.com/jquery.js']

  console.log(`Searching for ${term}...`)

  jsdom.env(
    url,
    scripts, 
    (err, window) => reportResults(window)
  )
}

function reportResults(window) {
  const results = window.jQuery('#results_wrapper a').toArray().map(l => l.href)
  console.log(`${results.length} results`)
  console.log(results)
}
