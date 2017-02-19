var page = require('webpage').create();

module.exports = {
  getAvailability,
}

function getAvailability(url, resolve) {
  console.log('Getting ', url);
  
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

    resolve(result);
  })
}
