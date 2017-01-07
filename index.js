const term = require('./args').getTerm()

if (!term) {
  console.log('No search term!')
  process.exit()
}

console.log('Loading...')

const search = require('./search')

try {
  search.byTitle(term, results => {
    console.log(`${results.length} results`)
    console.log(results)
  })
} catch(e) {
  console.log('caught', e)
}
