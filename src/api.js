const scraperjs = require('scraperjs')

module.exports = {
  get: get
}

function get(url) {
  return new Promise((resolve, reject) => {
    scraperjs.StaticScraper.create('https://news.ycombinator.com/')
      .scrape(resolve)
  })
}