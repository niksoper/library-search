module.exports = function(document) {
  return function(selector, mapper) {
    var selection = document.querySelectorAll(selector)
    var mapped = []
    for (var i = 0; i < selection.length; i++) {
      mapped.push(mapper(selection[i]))
    }
    
    return mapped
  }
}
