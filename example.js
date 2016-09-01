var ss = require('./')

ss('csv')
  .on('data', console.log)
  .end({a: 1, b: 2, c: 3})

// a,b,c
// 1,2,3

ss('json')
  .on('data', console.log)
  .end({a: 1, b: 2, c: 3})

// [
// {"a":1,"b":2,"c":3}
// ]

ss('ndjson')
  .on('data', console.log)
  .end({a: 1, b: 2, c: 3})

// {"a":1,"b":2,"c":3}
