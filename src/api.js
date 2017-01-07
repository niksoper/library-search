const jsdom = require('jsdom')

module.exports = {
  get,
  ready
}

const scripts = ['http://code.jquery.com/jquery.js']

function get(url) {
  return new Promise((resolve, reject) => {
    jsdom.env(
      url,
      scripts, 
      (err, window) => {
        if (err) reject(err)
        else resolve(window)
      }
    )
  })
}

function ready(window) {
  const { jQuery, document } = window
  return new Promise(resolve => {
    jQuery(document).ready(() => resolve(window))
  }) 
}