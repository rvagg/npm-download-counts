npm-download-counts
===================

Fetch package download counts for packages from the npm registry
----------------------------------------------------------------

[![Build Status](https://secure.travis-ci.org/rvagg/npm-download-counts.png)](http://travis-ci.org/rvagg/npm-download-counts)

[![NPM](http://nodei.co/npm/npm-download-counts.png)](http://nodei.co/npm/npm-download-counts/)

*Note: the npm download counts are pretty dodgy for a number of reasons, you probably shouldn't pretend they are accurate.*

```js
const assert = require('assert')
    , moment = require('moment')
    , downloadCounts = require('npm-download-counts')

    , pkg    = 'levelup'
    , start  = moment().subtract('months', 1).toDate() // start date for lookup
    , end    = new Date()                              // end date for lookup

downloadCounts(
    pkg
  , start
  , end
  , function (err, data) {
      // `data` is an array of objects with `day` and `count` properties
      // each element of the array represents a day in your date range
      data.forEach(function (d, i) {
        console.log('On %s, %s was downloaded ~%d times', d.day, pkg, d.count)
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

<a name="licence"></a>
Licence &amp; copyright
-------------------

Copyright (c) 2013 Rod Vagg.

npm-download-counts is licensed under an MIT +no-false-attribs license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.