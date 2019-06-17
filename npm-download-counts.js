var jsonist = require('jsonist')

function day (s) {
  if (!(s instanceof Date)) {
    if (!Date.parse(s)) {
      return null
    }
    s = new Date(s)
  }
  return s.toISOString().substr(0, 10)
}

function downloadCounts (pkg, start, end, callback) {
  var url = 'https://api.npmjs.org/downloads/range/' + day(start) + ':' + day(end) + '/' + pkg

  jsonist.get(url, function (err, doc) {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error('no document returned'))
    }
    if (doc.error) {
      return callback(new Error('registry error: ' + doc.error))
    }

    callback(null, doc.downloads.map(function (row) {
      return {
        day: row.day,
        count: row.downloads
      }
    }))
  })
}

module.exports = downloadCounts
