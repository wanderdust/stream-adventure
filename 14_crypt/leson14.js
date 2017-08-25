const crypto = require('crypto');
const pass = process.argv[2];

let stream = crypto.createDecipher('aes256', pass);
process.stdin.pipe(stream).pipe(process.stdout)
