const assert = require('assert')
    , moment = require('moment')
    , downloadCounts = require('./')

    , pkg    = 'levelup'
    , start  = moment().subtract('days', 5).zone(0).toDate()
    , end = moment().zone(0).toDate()

var timer = setTimeout(function () {
      assert(false, 'didn\'t get called in good time')
    }, 5000)

downloadCounts(
    pkg
  , start
  , end
  , function (err, data) {
      assert(!err, 'no error')
      assert(Array.isArray(data), 'got data')
      assert.equal(data.length, moment(end).diff(moment(start).zone(0), 'days'), 'has correct number of entries')

      data.forEach(function (d, i) {
        assert.equal(d.day, moment(start).zone(0).add('days', i).format("YYYY-MM-DD"), 'correct date for entry ' + i)
        assert(typeof d.count == 'number', 'got a number for second count for entry ' + i)
        assert(d.count >= 0, 'got a realistic number for count for entry ' + i)
      })

      clearTimeout(timer)
    }
)

downloadCounts(
   'asdfasdfasdfasdfasdfa'
  , start
  , end
  , function (err) {
     assert(err, 'error')
     assert.equal(err.message, 'registry error: no stats for this package for this range (0008)')
  }
)
