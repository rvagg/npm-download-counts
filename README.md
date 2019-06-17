npm-download-counts
===================

Fetch package download counts for packages from the npm registry
----------------------------------------------------------------

```js
const moment = require('moment')
const downloadCounts = require('npm-download-counts')

const pkg = 'levelup'
const start = moment().subtract('months', 1).toDate() // start date for lookup
const end = new Date() // end date for lookup

downloadCounts(
  pkg,
  start,
  end,
  function (err, data) {
    // `data` is an array of objects with `day` and `count` properties
    // each element of the array represents a day in your date range
    data.forEach(function (d, i) {
      console.log(`On ${d.day}, ${pkg} was downloaded ~${d.count} times`)
    })
  }
)
```

Gives you something like:

```
On 2013-06-15, levelup was downloaded ~91 times
On 2013-06-16, levelup was downloaded ~47 times
On 2013-06-17, levelup was downloaded ~57 times
On 2013-06-18, levelup was downloaded ~141 times
...
```

<a name="collaborators"></a>
Collaborators
-------------

 * Rod Vagg [@rvagg] (https://github.com/rvagg)
 * Dav Glass [@davglass](https://github.com/davglass)

<a name="licence"></a>
Licence &amp; copyright
-------------------

Copyright (c) 2014 Rod Vagg

npm-download-counts is licensed under an MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
