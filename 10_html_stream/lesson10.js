const trumpet = require('trumpet')
	, through = require('through2');

let stream = through(write, end)

let tr = trumpet();
let loud = tr.select('.loud').createStream();

function write(buffer, _, next) {
	this.push(buffer.toString().toUpperCase());
	next();
};

function end(done) {
	done();
};

loud.pipe(stream).pipe(loud)

process.stdin.pipe(tr).pipe(process.stdout)
