const http = require('http');
const url = require('url');
const fs = require('fs');

let handlers = {};
let router = {
    'products' : handlers.products,
    'users' : handlers.users
}


handlers.products = (req, res) => {
        fs.readFile('./view/products.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
};
handlers.users = (req, res) => {
    fs.readFile('./view/users.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
};
handlers.notFound = (req, res) => {
    fs.readFile('./view/notFound.html', (err,data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
};

let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req,res);
    });

server.listen(3003, () =>{
    console.log('server is running on port 3003')
})



