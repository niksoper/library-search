const term = require('./args').getTerm()

if (!term) {
  console.log('No search term!')
  process.exit()
}

console.log('Loading...')

//const news = require('./hacker-news')
//news.getLinkText().then(console.log)

const search = require('./search')
const book = require('./book')
search
  .byTitle(term)
  .then(search.takeFirstOrExit)
  .then(book.getAvailability)
  .then(console.log)
  .catch(err => {
    console.log('ERROR:', err)
  })
