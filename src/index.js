const term = require('./args').getTerm()

if (!term) {
  console.log('No search term!')
  process.exit()
}

console.log('Loading...')

const search = require('./search')
const book = require('./book')

const logAndPassThrough = message => d => {
  console.log(message)
  console.log(d)
  return d
}

search
  .byTitle(term)
  .then(search.matchExactTitle(term))
  .then(book.getAvailability)
  .then(book.inFavouriteLibraries)
  .then(book.isOnShelf)
  .then(console.log)
  .catch(err => {
    console.log('ERROR:', err)
  })
