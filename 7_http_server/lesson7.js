const http = require('http')
	, through = require('through2')

let stream = through(write, end);

function write(buf, _, next) {
	this.push(buf.toString().toUpperCase())
	next()
};

function end(done) {
	done();
}

let server = http.createServer(function(req, res) {
	if (req.method === 'POST'){
		req.pipe(stream).pipe(res)
		return
	}

	res.end('send me a POST')
})

server.listen(process.argv[2])