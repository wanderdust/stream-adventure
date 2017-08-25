const tar = require('tar')
	, concat = require('concat-stream')
	, crypto = require('crypto')
	, zlib = require('zlib');

let decStream = crypto.createDecipher(process.argv[2], process.argv[3]);
let parser = tar.Parse();

parser.on('entry', function(e) {
	if(e.type === 'File') {
		let hex = crypto.createHash('md5', {encoding: 'hex'});
		e.pipe(hex).pipe(concat(function(h) {
			console.log(h + ' ' + e.path)
		}));
	}
});


process.stdin
	.pipe(decStream)
	.pipe(zlib.createGunzip())
	.pipe(parser)
	

// For some Unknowun reason when I add the condition
// if(e.type === 'File') it doesn't execute the code.
// Anyway, I'm done with this! Also if I remove
// 'new' from 'new tar.parse()', it gives more errors.
// Apparently it has to do with the implementation of JavaScript
// classes. 