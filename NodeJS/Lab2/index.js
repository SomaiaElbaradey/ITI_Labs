const http = require('http');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('../lab1/to-do.json')
const db = low(adapter)
const port = 2929;

let tasksData = db.getState()
let tasksInfo = '';

tasksData.forEach(element => {
    tasksInfo += `<br> ${element.tittle}: ${element.status}`
});

let tasksHTML =
    `<html lang="en">
     <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Todos Data</title>
        <link rel="stylesheet" type="text/css" href="">
     </head>
     <body>
        <h1 style="color:rgb(26, 109, 182)" id="tasks">${tasksInfo}</h1>
        <a href="/quotes"> Quotes </a><br>
        <a href="#"> Nature </a><br>
     </body>
     </html>`

const server = http.createServer((req, res) => {
    //console.log(req.url)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(tasksHTML);
    switch (req.url) {
        case '/quotes':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            break
        default:
            res.statusCode = 404;
            res.statusMessage = 'Not found';
            break
    }
    res.end();
});

server.on('clientError', (err, socket) => {
    if (err) { console.log(err) }
    socket.end('400 Bad Request');
});

server.listen(port, '127.0.0.1', () => {
    console.log(`server running at port: ${port}`)
});