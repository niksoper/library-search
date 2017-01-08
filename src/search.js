const api = require('./api')
const select = require('./select')

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

function reportResults({ document }) {
  const urls = select(document)(
    '#results_wrapper a',
    element => element.href
  )

  return urls
}

function takeFirstOrExit(results) {
  const first = results[0]

  if (!first) {
    console.log('No results')
    process.exit()
  }

  return first
}