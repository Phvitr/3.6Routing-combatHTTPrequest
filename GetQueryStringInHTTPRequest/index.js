const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url,true);
    let queryStringObject = parseUrl.query
    res.end('Hello NodeJS!');
    console.log(queryStringObject);
});

server.listen(3000,() => {
    console.log('server is running on port 3000')
})