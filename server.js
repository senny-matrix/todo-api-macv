var express = require('express');
var app     = express();
var PORT    = process.env.PORT || 3000;
var todos   = [
    {
        id         : 1,
        description: 'Meet Mom for Lunch',
        completed  : false
    },
    {
        id          : 2,
        description : 'Go to Market',
        completed   : false
    },
    {
        id          : 3,
        description : 'Send Onyx Money',
        completed   : true
    }
]

// Route for /
app.get('/', function(req, res){
   res.send('Todo API Root'); 
});

// Get request. URL : /todos
app.get('/todos', function(req, res){
    // You can direct send convert array or object to string and 
    // send it back as follows
    res.json(todos);
});

// Get individual todo request. URL : /todos/:id
app.get('/todos/:id', function(req, res){
    var matchedTodo;
    var theID = parseInt(req.params.id, 10)
    todos.forEach(function(todo){
        if(todo.id === theID){
            matchedTodo = todo;
        }
    });
    
    if (!matchedTodo){
        res.status(404).send();
        return
    }else{
        res.json(matchedTodo);
    }
    
});

app.listen(PORT, function(){
   console.log('Express listening at port ' + PORT + '!'); 
});