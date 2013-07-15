const hyperquest = require('hyperquest')
    , bl         = require('bl')
    , qs         = require('querystring')

function day (s) {
  if (!(s instanceof Date)) {
    if (!Date.parse(s))
      return null
    s = new Date(s)
  }
  return s.toISOString().substr(0, 10)
}


function downloadCounts (pkg, start, end, callback) {
  var startkey   = [ pkg, day(start) ]
    , endkey     = [ pkg, day(end)   ]
    , grouplevel = 2
                   // hardwired url cause I don't think anyone bothers
                   // replicating this
    , url        = 'http://isaacs.iriscouch.com/downloads/_design/app/_view/pkg?'
        + qs.stringify({
              startkey    : JSON.stringify(startkey)
            , endkey      : JSON.stringify(endkey)
            , group_level : grouplevel
          })

  hyperquest.get(url).pipe(bl(function (err, body) {
    if (err)
      return callback(err)

    var doc
    try {
      doc = JSON.parse(body)
    } catch (e) {
      callback(err)
    }

    if (doc.error) {
      return callback(new Error(
          'registry error: '
          + doc.error
          + ' ('
          + (doc.reason || 'reason unknown')
          + ')'))
    }

    callback(null, doc.rows.map(function (row) {
      return {
          day   : row.key[1]
        , count : row.value
      }
    }))
  }))
}

module.exports = downloadCounts