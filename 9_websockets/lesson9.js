const websocket = require('websocket-stream');

let ws = require('websocket-stream');
let stream = ws('ws://localHost:8099');

stream.write("hello\n")