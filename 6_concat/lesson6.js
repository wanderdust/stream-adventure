const concat = require('concat-stream')


/*const through2 = require('through2');

let stream = through2(write, end);

function write(buffer, encoding, next) {
	let reverse = buffer.toString().split('').reverse().join('');
	this.push(reverse)
	
	next();
}

function end(done) {
	done();
}

process.stdin
	.pipe(stream)
	.pipe(process.stdout)*/

//My approach wasn't working because I was piping to
// process.stdout and I got the error 'not readable stream';
// there was no need to get stdout for this exercise. However
// I made it work with the module through2. ^^^^ 


// Official solution.
process.stdin
	.pipe(concat(function(src) {
		var s = src.toString().split('').reverse().join('');
		console.log(s)
	}))