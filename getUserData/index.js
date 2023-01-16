const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;
let url = require('url');



let  server = http.createServer((req, res) => {
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',(data) => {
        buffer += decoder.write(data);
    });
    req.on('end',(end) => {
        buffer += decoder.end();
        res.end('Hello NodeJS!');
        console.log(buffer);
    });
});
server.listen(3001,() => {
    console.log('server is running on port 3001')
});