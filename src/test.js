console.log('Hello phantom');
// // var request = require('./web/browser')
var page = require('webpage').create();

var davinci = 'https://www.librarieswest.org.uk/client/en_GB/default/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:1445152/ada?qu=da+vinci+code&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle';

var url = davinci;
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
  console.log('Result: ' + result);
  phantom.exit();
})
