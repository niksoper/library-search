# library-search
Searches www.librarieswest.org.uk

```
npm install library-search --save
```

The module exports a function that will:

1. Search www.librarieswest.org.uk
2. Scrape the first page of results for exact matches
3. Follow the link for each exact match
4. Scrape and combine the available books in each book page
5. Filter available books by my favourite libraries ;-)

```javascript
const find = require('library-search')
find('Atonement')
  .then(result => {
    const asJson = JSON.stringify(result, null, 2)
    console.log(asJson)
  })
  .catch(err => {
    console.log('ERROR:', err)
  })
```

A sample reponse from the above snippet:

```json
[
  {
    "url": "https://www.librarieswest.org.uk/client/en_GB/default/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:729313/ada?qu=atonement&te=ILS&lm=BOOK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle",
    "availability": [
      {
        "library": "Bedminster Library",
        "status": "On Shelf"
      }
    ]
  }
]

```
