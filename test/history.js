var test = require('tap').test;
var history = require('../');

test('check own history', function (t) {
    t.plan(6);
    
    var h = history()
    var commits = [];
    
    h.on('data', function (commit) {
        commits.push(commit);
    });
    
    h.on('end', function () { 
        var cs = commits.slice(-2);
        t.equal(cs[0].author.name, 'James Halliday');
        t.equal(cs[1].author.name, 'James Halliday');
        
        t.equal(cs[0].author.email, 'mail@substack.net');
        t.equal(cs[1].author.email, 'mail@substack.net');
        
        t.equal(cs[0].message, 'example file and actual parsing');
        t.equal(cs[1].message, 'some initial things');
    });
});
