const jsdom = require('jsdom')

module.exports = {
  get,
}

const scripts = []

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