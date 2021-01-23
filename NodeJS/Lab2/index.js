const http = require('http')
const fs = require('fs')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('../lab1/to-do.json')
const db = low(adapter)
const port = 2929;
const path = require('path');

let tasksData = db.getState()
let tasksInfo = '';

tasksData.forEach(element => {
   tasksInfo += `${element.tittle}: ${element.status} <br>`
});

//declare html variables
let tasksHTML =
   `<html lang="en">
     <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Todos Data</title>
        <link rel="stylesheet" type="text/css" href="./styles.css">
     </head>
     <body>
      <div>
        <h1> your toDos: </h1>
        <h2 id="tasks">${tasksInfo}</h2>
      </div>
        <a href="/quotes"> Quotes </a><br>
        <a href="/nature"> Nature </a><br>
     </body>
     </html>`

let quotesHTML =
   `<html lang="en">
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Quotes</title>
         <link rel="stylesheet" type="text/css" href="./styles.css">
      </head>
      <body>
         <h1 style="color:rgb(26, 109, 182)" id="tasks">Quotes:</h1>
         <img src="/Linus" width="500px" alt="">
         <img src="/Think" width="500px" alt="">
      </body>
      </html>`

let natureHTML =
   `<html lang="en">
        <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Nature</title>
           <link rel="stylesheet" type="text/css" href="./styles.css">
        </head>
        <body>
           <h1 style="color:rgb(26, 109, 182)" id="tasks">Quotes:</h1>
           <img src="/nat" width="500px" alt="">
           <img src="/forest" width="500px" alt="">
        </body>
        </html>`

const server = http.createServer((req, res) => {

   function getNaturePic1() {
      fs.readFile(path.join(__dirname, "./src/Nature/foresttb-l.jpg"), function (err, content) {
         if (err) {
            res.writeHead(400, { "Content-type": "text/plain" })
            res.end("Not found");
         } else {
            res.writeHead(200, { "Content-type": "image/jpg" });
            res.end(content);
         }
      });
   }

   function getNaturePic2() {
      fs.readFile(path.join(__dirname, "./src/Nature/2-nature.jpg"), function (err, content) {
         if (err) {
            res.writeHead(400, { "Content-type": "text/plain" })
            res.end("Not found");
         } else {
            res.writeHead(200, { "Content-type": "image/jpg" });
            res.end(content);
         }
      });
   }

   function getQuote1() {
      fs.readFile(path.join(__dirname, "/src/Quotes/Think twice.jpg"), function (err, content) {
         if (err) {
            res.writeHead(400, { "Content-type": "text/plain" })
            res.end("Not found");
         } else {
            res.writeHead(200, { "Content-type": "image/jpg" });
            res.end(content);
         }
      });
   }

   function getQuote2() {
      fs.readFile(path.join(__dirname, "/src/Quotes/Linus.jpg"), function (err, content) {
         if (err) {
            res.writeHead(400, { "Content-type": "text/plain" })
            res.end("Not found");
         } else {
            res.writeHead(200, { "Content-type": "image/jpg" });
            res.end(content);
         }
      });
   }

   function CSSStyle() {
      res.writeHead(200, { "Content-Type": "text/css" });
      let cssPath = path.join(__dirname, req.url);
      let fileStream = fs.createReadStream(cssPath, "UTF-8");
      fileStream.pipe(res);
   }

   switch (req.url) {
      case '/':
         res.writeHead(200, { "Content-type": "text/html" })
         res.write(tasksHTML);
         res.end();
         break;
      case "/styles.css":
         CSSStyle()
         break;
      case '/quotes':
         res.writeHead(200, { "Content-type": "text/html" })
         res.write(quotesHTML)
         res.end()
         break;
      case '/Linus':
         getQuote2()
         break;
      case '/Think':
         getQuote1()
         break;
      case '/nature':
         res.writeHead(200, { "Content-type": "text/html" })
         res.write(natureHTML)
         res.end()
         break;
      case '/nat':
         getNaturePic1();
         break;
      case '/forest':
         getNaturePic2();
         break;
   }
});

server.listen(port, '127.0.0.1', () => {
   console.log(`server running at port: ${port}`)
});