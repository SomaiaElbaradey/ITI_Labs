const express = require('express')
const app = express()
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const { nanoid } = require('nanoid')
const { toDosData } = require('./helpers/getData')
const { usersData } = require('./helpers/getUsers')

app.set('view engine', 'hbs');

app.use(express.static("public"));
//middleware to parse the json body to deal with it 
app.use(bodyParser.json());
//middleware that logs the request url, method, and current time 
let logs = (req, res, next) => {
    console.log('the request url:', req.url);
    console.log('the request method:', req.method);
    console.log('the current time:', new Date());
    next();
};
app.use(logs);
//global error handler 
app.use(function (err, req, res, next) {
    res.status(500).send('My internal server error!');
    next();
});

app.get('/toDosView',async function(req, res) {
    res.locals = {
        todos: await toDosData()
    }
    res.render('todos');
});

//get all
app.get('/todos', async function (req, res) {
    const todos = await toDosData();
    res.status(200).send(todos);
});

//get for one user
app.get('/todos/:userName', async function (req, res) {
    let { userName } = req.params;
    const todos = await toDosData();
    let list = [];
    todos.forEach(element => {
        if (element.userName == userName) {
            list.push(element)
        }
    });
    res.status(200).send(list);
});

//update one
app.post('/todos', async function (req, res) {
    let { userName, tittle } = req.body;
    const users = await usersData();
    let found = 0;
    users.forEach(async function (element) {
        if (element.userName == userName) {
            if (element.loggedIn == true) {
                found = 1;
                const todos = await toDosData();
                const newTodo = {
                    'tittle': tittle,
                    'userName': userName,
                    'status': 'to-do'
                }
                const allTodos = todos.concat(newTodo);
                fs.writeFile("./toDos.json", JSON.stringify(allTodos), err => {
                    if (err) return console.error(err)
                    console.log('the tittle has been added successfully!')
                })
            }
        }
    });
    if (found) res.status(200).send('the to do has been created successfully!')
    else res.status(422).send('invalid attributes!')
})

//register
app.post('/register', async function (req, res) {
    let { userName, password, firstName } = req.body
    let valid = 1;
    if (!userName || !password || !firstName) valid = 0
    if (!valid) res.status(422).send('invalid attributes!')
    const users = await usersData();
    const newUser = {
        'userName': userName,
        'password': password,
        'firstName': firstName,
        "loggedIn": false,
        "id": nanoid()
    }
    const allUsers = users.concat(newUser);
    fs.writeFile("./users.json", JSON.stringify(allUsers), err => {
        if (err) return console.error(err)
        res.status(200).send('user was registered successfully!')
    })
})

//login
app.post('/login', async function (req, res) {
    let { userName } = req.body;
    let users = await usersData();
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

//delete 
app.delete('/todos/:id', async function (req, res) {
    let { id } = req.params;
    let users = await usersData();
    users = users.filter(element => {
        return element.id != id;
    })
    fs.writeFile("./users.json", JSON.stringify(users), err => {
        if (err) return console.error(err)
        res.status(200).send("the user has been deleted successfully!");
    })
    res.status(401);
})

//Edit the todo 
app.patch('/todos/:id', function (req, res) {
    let { tittle, status } = req.body
    let { id } = req.params
    users = require('./users.json');
    users.forEach((element) => {
        if (element.id == id) {
            // there's no id for specific todo  which means there's no option to edit one for now
            element.tittle = tittle;
            element.status = status;
            fs.writeFile("data.json", JSON.stringify(users), "utf8");
        }
    })
    res.send('user has been updated successfully');
})

app.listen(2919)