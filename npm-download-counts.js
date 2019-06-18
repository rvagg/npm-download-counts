const promisify = require('util').promisify
const jsonist = require('jsonist')
const get = promisify(jsonist.get)

function day (s) {
  if (!(s instanceof Date)) {
    if (!Date.parse(s)) {
      return null
    }
    s = new Date(s)
  }
  return s.toISOString().substr(0, 10)
}

async function downloadCounts (pkg, start, end, token) {
  let url = 'https://api.npmjs.org/downloads/range/' + day(start) + ':' + day(end) + '/' + pkg
  let options = {}

  if (typeof token === 'string') { // could be null
    options.headers = { 'Authorization': `Bearer ${token}` }
  }

  let doc = await get(url, options)
  if (!doc) {
    throw new Error('no document returned')
  }
  if (doc.error) {
    throw new Error('registry error: ' + doc.error)
  }

  return doc.downloads.map((row) => {
    return {
      day: row.day,
      count: row.downloads
    }
  })
}

module.exports = downloadCounts
