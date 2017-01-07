const term = require('./args').getTerm()

if (!term) {
  console.log('No search term!')
  process.exit()
}

console.log('Loading...')

const search = require('./search')

search.byTitle(term)
  .then(results => {
    console.log(`${results.length} results`)
    console.log(results)
  })
  .catch(err => {
    console.log('SEARCH ERROR:', err)
  })
