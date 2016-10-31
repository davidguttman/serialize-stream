var csv = require('csv-write-stream')
var pumpify = require('pumpify').obj
var through = require('through2').obj
var JSONStream = require('JSONStream')
var object2dot = require('object2dot')

module.exports = function (format, opts) {
  opts = opts || {}

  if (format === 'csv') return csvStream(opts)
  if (format === 'json') return JSONStream.stringify()
  if (format === 'ndjson') return ndjsonStream()

  return JSONStream.stringify()
}

function ndjsonStream () {
  return through(function (item, enc, cb) {
    cb(null, JSON.stringify(item) + '\n')
  })
}

function csvStream (opts) {
  var streams = []
  if (opts.compact) streams.push(compactStream())
  if (opts.flatten) streams.push(flattenStream())
  streams.push(csv(opts))

  if (streams.length === 1) return streams[0]

  return pumpify.apply(pumpify, streams)
}

function flattenStream () {
  return through(function (item, enc, cb) {
    try {
      cb(null, object2dot.flatten(item))
    } catch (err) {
      cb(err)
    }
  })
}

function compactStream () {
  return through(function (item, enc, cb) {
    try {
      cb(null, JSON.parse(JSON.stringify(item)))
    } catch (err) {
      cb(err)
    }
  })
}
