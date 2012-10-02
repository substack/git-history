var history = require('../');
history().on('data', function (commit) {
    console.dir(commit);
});
