var jsdom = require('jsdom')

module.exports = {
  get: get,
}

const scripts = []

function get(url) {
  return new Promise(function(resolve, reject) {
    jsdom.env(
      url,
      scripts, 
      function(err, window) {
        if (err) reject(err)
        else resolve(window)
      }
    )
  })
}
