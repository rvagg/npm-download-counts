const assert = require('assert')
    , moment = require('moment')
    , downloadCounts = require('./')

    , pkg    = 'levelup'
    , start  = moment().subtract('months', 1).toDate()
    , end    = new Date()

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
      assert.equal(data.length, moment(end).diff(moment(start), 'days'), 'has correct number of entries')

      data.forEach(function (d, i) {
        assert.equal(d.day, moment(start).add('days', i).format("YYYY-MM-DD"), 'correct date for entry ' + i)
        assert(typeof d.count == 'number', 'got a number for second count for entry ' + i)
        assert(d.count >= 0, 'got a realistic number for count for entry ' + i)
      })

      clearTimeout(timer)
    }
)