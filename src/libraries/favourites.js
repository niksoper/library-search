var libraries = require('./all')

var favourites = libraries
  .filter(function(library) { return library.favourite })
  .map(function(library) { return library.name })

module.exports = favourites