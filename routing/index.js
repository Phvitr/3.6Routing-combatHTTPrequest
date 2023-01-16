const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;



let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url,true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    // console.log(trimPath);
    //
    // res.end();
    req.on('data', (data) => {
    });
    req.on('end', (end) => {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        let data = {
            'trimPath': trimPath
        };
        console.log(trimPath)
        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            let payloadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payloadString);

            console.log('status ' + statusCode + 'payload ' + payload);
        })
    });
})

server.listen(3002, () => {
    console.log('server is running on port 3002');
})

let handlers = {};
handlers.sample = (data, callback) => {
    callback(406, {'name': 'sample handle'})
};
handlers.notFound = (data, callback) => {
   callback(404)
};
handlers.home = (data, callback) => {
    callback(200, 'homepage');
};

let router = {
    'sample': handlers.sample,
    'home': handlers.home,
};