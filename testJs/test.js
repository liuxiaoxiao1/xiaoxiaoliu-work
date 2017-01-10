/**
 * Created by liuxiaoxiao1 on 16/8/8.
 */
var http =  require('http');
var path = require('path');

http.createServer(function(req, res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello world\n');
}).listen(3000, '127.0.0.1')
console.log("Hello world");

