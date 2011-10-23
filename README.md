# nasa for node

![nasa](http://i.imgur.com/wyl1S.jpg)

A simple-to-use node.js client for NASA's data API.

# install

Node library:

    npm install nasa

CLI tool:

    npm install -g nasa

From source:

    git clone git://github.com/ecto/node-nasa.git 
    cd node-nasa
    npm link

# library

##example

````javascript
var nasa = require('nasa');

nasa.dataset({ id: 619 }, function(err, data){
  if (err) console.log(err);
  else console.log(data);
});
````

##methods

All options are objects. `{ option: 'value' }`

All callbacks (cb) shoult be formed as `function(err, data){}`

If not null, callback errs will contain a String explaining error.

###nasa.dataset(options, cb)

Returns specified dataset

`options` requires one of { id: Number } or { slug: String }, but not both.

###nasa.search(options, cb)

Returns datasets matching search

Requires String `search`

Optional count (default 10)

###nasa.recent(options, cb)

Returns recent datasets

Optional count (default 10)

### nasa.dates(cb)

Returns index of all dates

###nasa.date(date, count = 10, cb)

Returns datasets matching a specific date

Requires String `date`  set to a date in the format YYYY or YYYY-MM or YYYY-MM-DD (non-numeric characters are stripped from the var, so YYYYMMDD or YYYY/MM/DD are also valid)

Optional count (default 10)

### nasa.categories(cb)

Returns index of categories

###nasa.category(options, cb)

Returns specified category

`options` requires one of { id: Number } or { slug: String }, but not both.

Optional count (default 10)

### nasa.tags(cb)

Returns index of tags

###nasa.tag(options, cb)

Returns specified tag

`options` requires one of { id: Number } or { slug: String }, but not both.

Optional count (default 10)

# CLI

##example

##commands

# license

(The MIT License)

Copyright (c) 2011 Cam Pedersen <cam@onswipe.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

