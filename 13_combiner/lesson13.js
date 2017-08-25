const combine = require('stream-combiner')
	, through = require('through2')
	, zlib = require('zlib')

module.exports = function() {
	let obj;

	let stream = through(write, end);

	function write(buf, _, next) {
		let parsedObj = JSON.parse(buf);

		if(parsedObj.type === 'genre') {
			if(obj) {
				this.push(JSON.stringify(obj) + '\n')
			}

			obj = {name: parsedObj.name, books: []};
		}else {
			obj.books.push(parsedObj.name);
		};
		next();
	};

	function end(done) {
		if(obj) {
			this.push(JSON.stringify(obj))
		}
		done();
	};

	return combine(stream, zlib.createGzip())
}