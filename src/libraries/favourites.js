const libraries = require('./all')

const favourites = libraries
  .filter(library => library.favourite)
  .map(library => library.name)

module.exports = favourites