var jsdom = require("jsdom")

var url = 'https://iojs.org/dist/'

console.log('Requesting ' + url)

try {
  jsdom.env(
    url,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      console.log('err', err)
      console.log('window', !!window)
      console.log("there have been", window.$("a").length - 4, "io.js releases!")
    }
  );
} catch(e) {
  console.log('caught', e)
}
