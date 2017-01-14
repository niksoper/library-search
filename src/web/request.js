const request = require('request-promise')

module.exports = {
  getJson
}

function getJson(uri) {
  return request({
    uri,
    json: true
  })
}
