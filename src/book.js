const _ = require('lodash')
const request = require('./request')

const importUri = 'https://extraction.import.io/query/extractor/1628e2be-0087-46ca-9fe3-1c23eb003470?_apikey=440e7c599cc244e5ae6b5275935704b8d39f5a2eb7ace86fb79deac135b000d93b2fdbb4f3ce694fa1906ad8424993f2ff73848f1408b4f52aa957078c7b4baf9ac1abede9339f0cfb9f0e257296a93f'

module.exports = {
  getAvailability
}

function getAvailability(bookUrls) {
  console.log(`Getting availability...`)

  return Promise.all(bookUrls.map(singleAvailability))
    .then(_.flatten)
}

function singleAvailability(bookUrl) {
  const fullUrl = `${importUri}&url=${encodeURI(bookUrl)}`
  
  return request
    .getJson(fullUrl)
    .then(response => (
      response.extractorData.data[0].group.map(row => (
        {
          library: row['Library value'][0].text,
          status: row['Status value'][0].text,
        }
      ))
    ))
}