const assert = require('assert')
const moment = require('moment')
const downloadCounts = require('./')

const pkg = 'levelup'
const testDays = 5
const start = moment().utcOffset(0).subtract(testDays * 2 - 1, 'days').toDate()
const end = moment().utcOffset(0).subtract(testDays, 'days').toDate()

var timer = setTimeout(function () {
  assert(false, 'didn\'t get called in good time')
}, 5000)

downloadCounts(
  pkg,
  start,
  end,
  function (err, data) {
    assert(!err, 'no error')
    assert(Array.isArray(data), 'got data')
    assert.strictEqual(data.length, testDays, `has correct number of entries ${data.length} != ${testDays}`)

    data.forEach(function (d, i) {
      assert.strictEqual(d.day, moment(start).utcOffset(0).add(i, 'days').format('YYYY-MM-DD'), `correct date for entry ${i}`)
      assert(typeof d.count === 'number', `got a number for second count for entry ${i}`)
      assert(d.count >= 0, `got a realistic number for count for entry ${i}`)
    })

    clearTimeout(timer)
  }
)

downloadCounts(
  'asdfasdfasdfasdfasdfa',
  start,
  end,
  function (err) {
    assert(err, 'error')
    assert.strictEqual(err.message, 'registry error: package asdfasdfasdfasdfasdfa not found')
  }
)
