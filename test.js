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

async function test () {
  let data = await downloadCounts(pkg, start, end)
  assert(Array.isArray(data), 'got data')
  assert.strictEqual(data.length, testDays, `has correct number of entries ${data.length} != ${testDays}`)

  data.forEach(function (d, i) {
    assert.strictEqual(d.day, moment(start).utcOffset(0).add(i, 'days').format('YYYY-MM-DD'), `correct date for entry ${i}`)
    assert(typeof d.count === 'number', `got a number for second count for entry ${i}`)
    assert(d.count >= 0, `got a realistic number for count for entry ${i}`)
  })

  let err
  try {
    await downloadCounts('asdfasdfasdfasdfasdfa', start, end)
  } catch (_err) {
    err = _err
  }

  assert(err, 'bad package threw')
  assert.strictEqual(err.message, 'registry error: package asdfasdfasdfasdfasdfa not found')

  clearTimeout(timer)
}

test().catch((err) => {
  console.error(err)
  process.exit(1)
})
