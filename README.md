# serialize-stream

Stream json, ndjson, or csv.

This is useful if you have an API and want to stream different formats depending on a param.

Uses [csv-write-stream](https://github.com/maxogden/csv-write-stream) and [JSONStream](https://github.com/dominictarr/JSONStream) under the hood.

## Example

```js

var ss = require('serialize-stream')

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

```

## API

### `ss(format, [opts])`

* `format` is one of: `'csv'`, `'json'`, or `'ndjson'`.

* `opts` defaults:

```js
{
  compact: false, // csv: will remove undefined keys (like in json)
  flatten: false // csv: will flatten nested objects using `object2dot`[1]
}
```

[1] [object2dot](https://github.com/jpiepkow/object2dot)

## License

MIT
