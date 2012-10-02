# git-history

stream of history objects of a git repo

[![build status](https://secure.travis-ci.org/substack/git-history.png)](http://travis-ci.org/substack/git-history)

# example

``` js
var history = require('git-history');
history().on('data', function (commit) {
    console.dir(commit);
});
```

***

```
{ hash: '803117ad9e532df4a1a1dfd75139cddd3ecbe690',
  author: { name: 'James Halliday', email: 'mail@substack.net' },
  date: Tue Oct 02 2012 15:37:45 GMT-0700 (PDT),
  message: 'passing test checking its own history' }
{ hash: '07f8c4f4690a87e8d0cd7ab370fd828b69868bdb',
  author: { name: 'James Halliday', email: 'mail@substack.net' },
  date: Tue Oct 02 2012 15:31:41 GMT-0700 (PDT),
  message: 'example file and actual parsing' }
{ hash: 'aa5cea065b5b7121abf44147f52834ec72489b0d',
  author: { name: 'James Halliday', email: 'mail@substack.net' },
  date: Tue Oct 02 2012 15:14:28 GMT-0700 (PDT),
  message: 'some initial things' }
```

# methods

``` js
var history = require('git-history')
```

## history(since, until)

Return a stream of `'data'` events with commit objects of all the commit
properties.

If specified, limit the objects emitted to be between `since` and `until` as
[revisions](http://www.kernel.org/pub/software/scm/git/docs/gitrevisions.html).

# install

With [npm](https://npmjs.org) do:

```
npm install git-history
```

# license

MIT
