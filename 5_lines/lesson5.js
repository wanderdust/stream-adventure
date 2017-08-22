const split = require('split');

const through2 = require('through2');
let stream = through2(write, end);

let counter = 1;

function write (line, encoding, next) {
	if(counter%2 !== 1) {
		this.push(line.toString().toUpperCase()+ '\n');
	}else {
		this.push(line.toString().toLowerCase()+ '\n');
	}
	counter++;
	next();
}

function end (done) {
	done();
}

process.stdin
	.pipe(split())
	.pipe(stream)
	.pipe(process.stdout)