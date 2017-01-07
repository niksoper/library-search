console.log('Loading...')

var jsdom = require("jsdom")
var term = process.argv[2]


var url = `https://www.librarieswest.org.uk/client/en_GB/default/search/results?qu=${term}&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle` 
var scripts = ["http://code.jquery.com/jquery.js"]

try {
  jsdom.env(
    url,
    scripts, 
    function (err, window) {
      var results = window.jQuery('#results_wrapper a').toArray().map(l => l.href)
      console.log(`${results.length} results`)
      console.log(results)
    }
  );
} catch(e) {
  console.log('caught', e)
}
