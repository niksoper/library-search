const find = require('./search/findBooksInFavouriteLibraries')
const args = require('./args')

find(args.getTerm())
  .then(JSON.stringify)
  .then(console.log)
  .catch(err => {
    console.log('ERROR:', err)
  })