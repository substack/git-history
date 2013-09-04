var split = require('split');
var run = require('comandante');
var through = require('through');

exports = module.exports = function (since, until, opts) {
    var data = '';
    var sp = split();
    var tr = through(write, end);
    sp.pipe(tr);
    
    var piped = false;
    sp.on('pipe', function () {
        piped = true;
    });
    
    process.nextTick(function () {
        if (!piped) history(since, until, opts).pipe(sp);
    });
    
    var commit = null;
    
    return tr;
    
    function write (line) {
        var m;
        if (m = /^commit\s+(\S+)/i.exec(line)) {
            if (commit) this.emit('data', commit);
            commit = { hash : line.split(/\s+/)[1] };
        }
        else if (m = /^Author:\s+(.+?)(?: <([^>]+)>)?$/i.exec(line)) {
            commit.author = {
                name : m[1],
                email : m[2],
            };
        }
        else if (m = /^Date:\s+(.+)/.exec(line)) {
            commit.date = new Date(m[1]);
        }
        else if (m = /^\s+git\-svn\-id:\s(.+)$/.exec(line)) {
            var svn = m[1].split(/[@\s]/);
            commit.svn = {
                repo : svn[0],
                rev : Number(svn[1]),
                uuid : svn[2]
            };
        }
        else if (m = /^\s+(\S.+)/.exec(line)) {
            commit.message = commit.message ? commit.message + '\n' +  m[1] : m[1];
        }
    }
    
    function end () {
        this.emit('data', commit);
        this.emit('end');
    }
};

function history (since, until, opts) {
    if (typeof since === 'object') {
        opts = since;
        since = undefined;
    }
    if (typeof until === 'object') {
        opts = until;
        until = undefined;
    }
    
    if (since === undefined) {
        return run('git', [ 'log' ], opts);
    }
    else {
        return run('git',
            [ 'log', (since || '') + '..' + (until || '') ],
            opts
        );
    }
}
