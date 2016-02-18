var express    = require('express');
var bodyParser = require('body-parser');
var _          = require('underscore');
var app        = express();
var PORT       = process.env.PORT || 3000;
var todos      = [];
var todoNextID = 1;

// Set up body-parser middleware using app.use
app.use(bodyParser.json());

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
    var todoId = parseInt(req.params.id, 10)
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    if (!matchedTodo){
        res.status(404).send();
        return
    }else{
        res.json(matchedTodo);
    }
    
});

// POST. URL -> /todos (You will need body-parser module)
// body-parser is an express middleware
app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'description', 'completed');
    
    // Perform validation to make sure description
    // is string and completed is boolean
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        // 400 means request can't be completed because
        // bad data was provided
        return res.status(400).send();
    }
    
    // Make the body.description to be the trimmed value
    body.description = body.description.trim();
    
    // Add id attribute to the body object
    body.id = todoNextID++;
    
    // Push the body object to the todos array
    todos.push(body)
    
    // send the result back to user
    res.json(body);
});

app.listen(PORT, function(){
   console.log('Express listening at port ' + PORT + '!'); 
});