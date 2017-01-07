const api = require('./api')

module.exports = {
  getAvailability
}

function getAvailability(bookUrl) {
  console.log(`Getting availability...`)

  return api
    .get(bookUrl)
    .then(api.ready)
    .then(findAvailability)
}

function findAvailability({ jQuery }) {
  const availability = jQuery('.availabilityDiv')
    .toArray()
    .map(element => element.innerHTML)
      
  return availability
}