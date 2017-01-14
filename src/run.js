const find = require('./search/findBooksInFavouriteLibraries')
const args = require('./args')

find(args.getTerm())
  .then(logFormattedJson)
  .catch(err => {
    console.log('ERROR:', err)
  })

function logFormattedJson(result) {
  const asJson = JSON.stringify(result, null, 2)
  console.log(asJson)
}