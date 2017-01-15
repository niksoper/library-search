const fs = require('fs');
const libraries = require('./libraries/all')

const favourites = libraries
  .filter(library => library.favourite)
  .map(library => library.name)

const stdin = process.openStdin();

console.log('Usage:')
console.log('add Library Name')
console.log('remove Library Name')
console.log('list')
console.log('')

stdin.addListener("data", function(i) {
    const input = i.toString().trim().split(' ') // trim to remove EOL character
    
    const command = input.shift().toLowerCase()
    const library = input[0] ? input.join(' ').toLowerCase() : null
    
    const makeFavourite = command === 'add' ? true
        : command == 'remove' ? false
        : null
    
    if (makeFavourite === null) {
        libraries.forEach(function(l) {
            if (l.favourite) {
                console.log(l.name + ' (Favourite)')
            } else {
                console.log(l.name)
            }
        });
        process.exit()
    } else {
        const newLibraries = libraries.map(
            (element) => element.name.toLowerCase() === library
                ? Object.assign({}, element, {'favourite': makeFavourite})
                : element)
        
        var string = JSON.stringify(newLibraries, null, ' ')

        fs.writeFile('src/libraries/all.json', string, function(err) {
            if(err) {
                return console.error('Error: ' + err)
            }
            console.log('Done')
            process.exit()
        })
    }
    
   
});