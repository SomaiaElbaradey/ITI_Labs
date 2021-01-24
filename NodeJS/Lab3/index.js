const express = require('express')
const app = express()
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const os = require('os')
// const path = require('path')
// const { stringify } = require('querystring')
// const deviceUser = os.userInfo().username
const { nanoid } = require('nanoid')
const { use } = require('express/lib/application')
// const toDosData = require('./helpers/getData')

app.use(express.static("public"));
//middleware to parse the json body to deal with it 
app.use(bodyParser.json());
//middleware that logs the request url, method, and current time 
let logs = (req, res, next) => {
    console.log('the request url:', req.url);
    console.log('the request method:', req.method);
    console.log('the current time:', new Date());
    next();
}
app.use(logs);
//global error handler 
app.use(function (err, req, res, next) {
    res.status(500).send('My internal server error!')
    next();
});

function getToDoData() {
    fs.readFile("./toDos.json", function (err, data) {
        if (err) return console.error(err);
        const toDos = JSON.parse(data);
        return toDos;
    })
}

function getUsersData() {
    fs.readFile("./users.json", function (err, data) {
        if (err) return console.error(err);
        const users = JSON.parse(data);
        return users;
    })
}

//get all
app.get('/todos', function (req, res) {
    fs.readFile("./toDos.json", function (err, data) {
        if (err) return console.error(err);
        const toDos = JSON.parse(data);
        res.status(200).send(toDos)
    })
})

//get for one user
app.get('/todos/:userName', function (req, res) {
    let { userName } = req.params
    fs.readFile("./toDos.json", function (err, data) {
        if (err) return console.error(err);
        const toDos = JSON.parse(data);
        let list = [];
        toDos.forEach(element => {
            if (element.userName == userName) {
                list.push(element)
            }
        });
        res.status(200).send(list)
    })
})

//update one
app.post('/todos', function (req, res) {
    let { userName, tittle } = req.body;
    fs.readFile("./users.json", function (err, data) {
        if (err) return console.error(err);
        const users = JSON.parse(data);
        users.forEach(element => {
            if (element.userName == userName) {
                if (element.loggedIn == true) {
                    fs.readFile("./toDos.json", function (err, data) {
                        if (err) return console.error(err);
                        let toDos = JSON.parse(data);
                        toDos.push({
                            'tittle': tittle,
                            'userName': userName,
                            'status': 'to-do'
                        })
                        fs.writeFile("./toDos.json", JSON.stringify(toDos), err => {
                            if (err) return console.error(err)
                            console.log('the tittle has been added successfully!')
                        })
                    })
                }
            }
        });
        res.status(200).send('the to do has been created successfully!')
    })
})

//register
app.post('/register', function (req, res) {
    let { userName, password, firstName } = req.body
    let valid = 1;
    if (!userName || !password || !firstName) valid = 0
    if (!valid) res.status(422).send('invalid attributes!')
    else {
        fs.readFile("./users.json", function (err, data) {
            if (err) return console.error(err);
            let user = JSON.parse(data);
            user.push({
                'userName': userName,
                'password': password,
                'firstName': firstName,
                "loggedIn": false,
                "id": nanoid()
            })
            fs.writeFile("./users.json", JSON.stringify(user), err => {
                if (err) return console.error(err)
                res.status(200).send('user was registered successfully!')
            })
        })
    }
})

//login
app.post('/login', function (req, res) {
    let { userName } = req.body;
    fs.readFile("./users.json", (err, data) => {
        if (err) return console.error(err);
        let users = JSON.parse(data);
        users.forEach(element => {
            if (element.userName == userName) {
                element.loggedIn = true;
                fs.writeFile("./users.json", JSON.stringify(users), err => {
                    if (err) return console.error(err)
                    res.status(200).send('the user has been logged In successfully!')
                })
            }
        })
        res.status(401)
    })
})

//delete 
app.delete('/todos/:id', function (req, res) {
    let { id } = req.params
    fs.readFile("./users.json", function (err, data) {
        if (err) return console.error(err);
        let users = JSON.parse(data);
        users = users.filter(element => {
           return element.id != id
        })
        fs.writeFile("./users.json", JSON.stringify(users), err => {
            if (err) return console.error(err)
            res.status(200).send("the user has been deleted successfully!")
        })
    }) 
    res.status(401)       
})

//Edit the todo 
app.patch('/todos/:id', function (req, res) {
    let { tittle, status } = req.body
    let { id } = req.params
    users = require('./users.json');
    users.forEach((element) => {
        if (element.id == id) {
            //I should get the username and update the to do file.
            element.tittle = tittle;
            element.status = status;
            fs.writeFile("data.json", JSON.stringify(users), "utf8");
        }
    })
    res.send('user has been updated successfully');
})

app.listen(2919)