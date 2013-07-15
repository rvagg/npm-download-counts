const assert = require('assert')
    , moment = require('moment')
    , downloadCounts = require('./')

    , pkg    = 'levelup'
    , start  = moment().subtract('months', 1).toDate()
    , end    = new Date()

downloadCounts(
    pkg
  , start
  , end
  , function (err, data) {
      data.forEach(function (d, i) {
        console.log('On %s, %s was downloaded ~%d times', d.day, pkg, d.count)
      })
    }
)