var split = require('event-stream').split;
var run = require('comandante');
var through = require('through');

exports = module.exports = function (since, until) {
    var data = '';
    var sp = split();
    sp.pipe(through(write, end));
    return sp;
    
    function write (buf) {
        this.emit('{}\n');
    }
    
    function end () {
        
    }
};

function show (ref, file) {
    if (file === '.') file = './';
    return run('git' [ 'show', ref + ':' + file ]);
}

function history (since, until) {
    if (since === undefined) {
        return run('git', [ 'log' ]);
    }
    else {
        return run('git', [ 'log', (since || '') + '..' + (until || '') ]);
    }
}
