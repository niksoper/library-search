module.exports = (document) => {
  return (selector, mapper) => {
    const selection = document.querySelectorAll(selector)
    let mapped = []
    for (let i = 0; i < selection.length; i++) {
      mapped.push(mapper(selection[i]))
    }
    
    return mapped
  }
}
