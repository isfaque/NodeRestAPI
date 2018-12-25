var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer')
var upload = multer()
var app = express()
var user = require('./controller/user')
var tasks = require('./controller/tasks');
var users = require('./controller/users');

app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());



app.use('/user', user)
app.use('/tasks', tasks)
app.use('/users', users)

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(3000, () => console.log('App Listening on port 3000'))