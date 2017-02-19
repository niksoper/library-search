var request = require('request-promise')

module.exports = {
  getJson: getJson
}

function getJson(uri) {
  return request({
    uri: uri,
    json: true
  })
}
