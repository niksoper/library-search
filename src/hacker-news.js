const api = require('./api')

module.exports = {
  getLinkText: getLinkText
}

function getLinkText() {
  console.log('Getting hacker news link text...')
  
  return api.get('https://news.ycombinator.com/')
    .then(function($) {
      return $(".title a").map(function() {
          return $(this).text()
      }).get()
    })
}