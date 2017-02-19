var webserver = require('webserver');
var server = webserver.create();

var find = require('./search/findBooksInFavouriteLibraries')

var service = server.listen(8080, function(request, response) {
  console.log('Request received')
  find('atonement').then(function(result) {
      jsonResponse(response, result);
    })
});

function jsonResponse(response, json) {
  response.setHeader('content-type', 'application/json');
  response.statusCode = 200;
  response.write(JSON.stringify(json));
  response.close();
}
