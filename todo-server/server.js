/**
 * Created by Yoav Rosenbaum and Nogah Goldberg
 */
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.PORT || 3001;

mongoose.connect('mongodb://yoro:yoroyoro@ds029828.mlab.com:29828/todo1db');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var TodoList = require('./models/TodoLists.js');
var User = require('./models/Users.js');
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Use our router configuration when we call /api
app.use('/api', router);


//------------------------------------------
//now we can set the route path & initialize the API
app.get('/', function(req, res) {
    console.log('http://' + req.hostname + req.url);
    res.redirect('http://' + req.hostname + req.url);
});

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.route('/login')

    .post(function(req, res) {
        User.find({username: req.body.username, password: req.body.password}, function(err, user){
            if (user.length != 0){
                console.log(user);
                res.json({message: "success"});
            }
            else
                res.json({message: "fail"})
        })
    });

router.route('/register')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username
        user.password= req.body.password
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully added!' });
        });
    });

router.route('/users')
    .get(function(req, res){
        User.find(function(err, users){
            if (err)
                res.send(err);

            res.json(users)
        })
    });


router.route('/todolists')

    .get(function(req, res) {
        TodoList.find(function(err, todoLists) {
            if (err)
                res.send(err);

            res.json(todoLists)
        });
    })

    .post(function(req, res) {
        var todoList = new TodoList();
        todoList.title = req.body.title
        todoList.username = req.body.username
        todoList.sharedWith = [];
        todoList.backgroundColor = "#00d8ff"
        todoList.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Todo list successfully added!' });
        });
    });

router.route('todolists/:todolist_id/comments')
    .get(function(req, res){
        TodoList.findById(req.params.todolist_id, function(err, todolist) {
            if (err)
                res.send(err);
            res.json(todolist.data);
        })
    })


router.route('/todolists/:todolist_id')
    .put(function(req, res) {
        TodoList.findById(req.params.todolist_id, function(err, todolist) {
            if (err)
                res.send(err);
            (req.body.data) ? todolist.data = req.body.data : null;
            (req.body.color) ? todolist.backgroundColor = req.body.color : null;
            todolist.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Todolist has been updated' });
            });
        });
    })
    .delete(function(req, res) {
        TodoList.remove({ _id: req.params.todolist_id }, function(err, todolist) {
            if (err)
                res.send(err);
            res.json({ message: 'Todolist has been deleted' })
        })
    });

router.route('/share/:todolist_id')
    .put(function(req, res) {
        TodoList.findById(req.params.todolist_id, function(err, todolist) {
            if (err)
                res.send(err);
            (req.body.username) ? todolist.sharedWith.push(req.body.username) : null;
            todolist.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'shared successfully'});
            })
        })
    })
//----------------------------------------------------------------------------


//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});
