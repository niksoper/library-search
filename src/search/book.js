var _ = require('lodash')
var Q = require('q')
var page = require('webpage').create();

var request = require('../web/request')
var favourites = require('../libraries/favourites')

module.exports = {
  getAvailability: getAvailability,
  inFavouriteLibraries: inFavouriteLibraries,
  isOnShelf: isOnShelf,
  byUrl: byUrl
}

function getAvailability(bookUrls) {
  console.log('Getting availability...')

  return Q.all(bookUrls.map(phantomAvailability))
    .then(_.flatten)
}

function phantomAvailability(url, resolve) {
  console.log('Getting ', url);
  
  return Q.Promise(function(resolve) {
    page.open(url, function() {
      console.log('Opened page');      
      var result = page.evaluate(function() {
        var selection = document.querySelectorAll('.availabilityDiv');
        var mapped = [];
        for (var i = 0; i < selection.length; i++) {
          mapped.push(selection[i].innerHTML);
        }
        return mapped;
      });

      resolve(result.map(function(status) {
        return {
          status: status,
          library: 'Bath Central Library',
        }
      }));
    })
  })
}

// function singleAvailability(bookUrl) {
//   var importUri = 'https://extraction.import.io/query/extractor/1628e2be-0087-46ca-9fe3-1c23eb003470?_apikey=440e7c599cc244e5ae6b5275935704b8d39f5a2eb7ace86fb79deac135b000d93b2fdbb4f3ce694fa1906ad8424993f2ff73848f1408b4f52aa957078c7b4baf9ac1abede9339f0cfb9f0e257296a93f'
//   var fullUrl = importUri + '&url=' + 'encodeURI(bookUrl)'
  
//   return request
//     .getJson(fullUrl)
//     .then(function(response) {
//       var data = response.extractorData.data[0]
//       if (!data) return []
      
//       return data.group.map(function(row) {
//         return {
//           url: bookUrl,
//           library: _.get(row, '[Library value][0].text'),
//           status: _.get(row, '[Status value][0].text'),
//         }
//       })
//       .filter(interestingStatus)
//     })
// }

function inFavouriteLibraries(availability) {
  console.log('In all libraries: ' + availability.length)
  console.log('Filtering on favourite libraries:')
  console.log(favourites)
  
  var inFavourites = availability.filter(function(a) {
    return favourites.some(function(l) {
      return l === a.library
    })
  })

  console.log('In favourite libraries: ' + inFavourites.length)
  
  return inFavourites
}

function interestingStatus(availability) {
  return hasLibraryAndStatus(availability) &&
    (onShelf(availability) || isDue(availability))
}

function isOnShelf(availabilities) {
  var shelved = availabilities.filter(onShelf)
  
  console.log('On the shelf: ' + shelved.length)
  
  return shelved
}

function hasLibraryAndStatus(availability) {
  var has = availability.library && availability.status
  if (!has) console.log('Skipped:', availability.url)
  return has
}

function onShelf(availability) {
  return availability.status === 'On Shelf'
}

function isDue(availability) {
  return availability.status.startsWith('Due ')
}

function byUrl(availabilities) {
  return _.chain(availabilities)
    .groupBy('url')
    .map(function(books, url) {
      return {
        url: url,
        availability: books.map(function(book) {
          return _.omit(book, 'url')
        })
      }
    })
    .value()
}