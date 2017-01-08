const browser = require('./browser')
const select = require('./select')

module.exports = {
  getAvailability
}

function getAvailability(bookUrl) {
  console.log(`Getting availability...`)

  return browser
    .get(bookUrl)
    .then(findAvailability)
}

function findAvailability({ document }) {
  const availability = select(document)(
    '.availabilityDiv',
    element => element.innerHTML
  )
      
  return availability
}