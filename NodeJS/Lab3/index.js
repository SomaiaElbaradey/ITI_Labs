const express = require('express')
const app = express()
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const os = require('os');
const { stringify } = require('querystring');
const deviceUser = os.userInfo().username

//middleware to parse the json body to deal with it 
app.use(bodyParser.json());
//global error handler 
app.use(function (err, req, res, next) {
    res.status(500).send('My internal server error!');
})
//middleware that logs the request url, method, and current time 
let logs = (req, res, next) => {
    console.log('the request url:', req.url);
    console.log('the request method:', req.method);
    console.log('the current time:', new Date());
    next();
};
app.use(logs);


function getToDoData(res) {
    let toDos;
    try {
        toDos = fs.readJsonSync('./toDos.json', 'utf-8')
        return toDos
    }
    catch (err) {
        res.status(500).send('error in reading the data')
        throw 'error'
    }
}

function getUsersData(res) {
    let users;
    try {
        users = fs.readJsonSync('./users.json', 'utf-8')
        return users
    }
    catch (err) {
        res.status(500).send('error in reading users the data')
        throw 'error'
    }
}

//get requests
app.get('/todos', function (req, res) {
    res.status(200).send(getToDoData(res))
})

app.get('/todos/:userName', function (req, res) {
    const toDos = getToDoData(res);
    let userName = req.params.userName
    let list = []
    for (const key in toDos) {
        if (toDos[key].userName == userName) {
            list.push(toDos[key])
        }
    }
    res.status(200).send(list)
})

//post requests
app.post('/todos', function (req, res) {
    let toDoData = {
        'userName': req.body.userName,
        'tittle': req.body.tittle
    }
    const users = getUsersData(res);
    for (const key in users) {
        if (users[key].userName == toDoData['userName']) {
            if (users[key].loggedIn == true) {
                //add to do
                //fs.writeFileSync('./toDos.json', stringify(toDoData));
            }
        }
    }
    res.status(200).send('the to do has been created successfully!')
})

app.post('/register', function (req, res) {
    let toDoData = {
        'userName': req.body.userName,
        'password': req.body.password,
        'firstName': req.body.firstName
    }
    let valid = 0;
    //check validation, add if valid
    if (!valid) res.status(422).send('invalid attributes!')
    else res.status(200).send('the user has been registed successfully!')
})


app.post('/login', function (req, res) {
    let toDoData = {
        'userName': req.body.userName
    }
    const users = getUsersData(res);
    let found = 0;
    for (const key in users) {
        if (users[key].userName == toDoData['userName']) {
            users[key].loggedIn = true; //should be written
            found = 1;
        }
    }
    if (!found) res.status(401).send('invalid credentials!')
    else res.status(200).send('the user has been logged In successfully!')
})

app.listen(2919)