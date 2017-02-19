var Promise = require('q')

module.exports = function findBooksInFavouriteLibraries(term) {
  if (!term) {
    return Promise.reject('No search term!')
  }

  console.log('Loading...')

  const search = require('./search')
  const book = require('./book')

  return search
    .byTitle(term)
    .then(search.matchExactTitle(term))
    .then(book.getAvailability)
    .then(book.inFavouriteLibraries)
    .then(book.isOnShelf)
    .then(book.byUrl)
}
