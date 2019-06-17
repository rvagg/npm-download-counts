const moment = require('moment')
const downloadCounts = require('./')
const pkg = 'levelup'
const start = moment().utcOffset(0).subtract(1, 'months').toDate()
const end = moment().utcOffset(0).toDate()

downloadCounts(
  pkg,
  start,
  end,
  function (err, data) {
    if (err) { throw err }
    data.forEach(function (d, i) {
      console.log('On %s, %s was downloaded ~%d times', d.day, pkg, d.count)
    })
  }
)
