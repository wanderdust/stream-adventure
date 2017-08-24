const duplexer = require('duplexer2');
const through = require('through2').obj;

module.exports = function(counter) {
	let object = {};
	let stream = through(write, end);

	function write(data, enc, next) {
		object[data.country] = (object[data.country] || 0)+1;
		next();
	};

	function end(done) {
		counter.setCounts(object);
		done();
	}

	return duplexer({objectMode: true}, stream, counter)
};


