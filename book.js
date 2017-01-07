const jsdom = require('jsdom')

module.exports = {
  getAvailability
}

function getAvailability(bookUrl) {
  const scripts = ['http://code.jquery.com/jquery.js']

  console.log(`Getting availability...`)

  return new Promise((resolve, reject) => {
    jsdom.env(
      bookUrl,
      scripts, 
      (err, window) => {
        if (err) reject(err)
        else setTimeout(() => {
          resolve(findAvailability(window))
        }, 1000)
      }
    )
  })
}

function findAvailability({ jQuery, document}) {
  return new Promise((resolve, reject) => {
    jQuery(document).ready(() => {
       const availability = jQuery('.availabilityDiv')
        .toArray()
        .map(element => element.innerHTML)
      
       resolve(availability)
    })
  }) 
}