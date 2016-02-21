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

// Get request. URL : /todos?completed=true
app.get('/todos', function(req, res){
    // You can direct send convert array or object to string and 
    // send it back as follows
    var queryParams = req.query;
    filteredTodos = todos;
    
    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
        filteredTodos = _.where(filteredTodos,{completed:true});
    }else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
        filteredTodos = _.where(filteredTodos,{completed:false});
    }
    
    
    res.json(filteredTodos);
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

// DELETE : URL-> /todos/:id
app.delete('/todos/:id', function(req, res){
    var todoId      = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id : todoId});
    
    if(!matchedTodo){
        res.status(404).json({"error" : "No todo found with that ID!"});
    }else{
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
});

// PUT : URL -> /todos/:id (update)
app.put('/todos/:id', function(req, res){
    var todoId      = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos,{id:todoId});
    var body            = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};
    
    if(!matchedTodo){
        return res.status(404).json({"error":"There is no TODO with given ID!"});
    }
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        validAttributes.completed = body.completed;
    }else if(body.hasOwnProperty('completed')){
        // Bad
        return res.status(400).json({"error": "Bad data, should be true or false"});
    }else{
        // Never provided attributes, no problem here
    }
    
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
        validAttributes.description = body.description;
    }else if(body.hasOwnProperty('description')){
        // Bad
        return res.status(400).json({"error": "Bad Description"});
    }else{
        // Never provided attibutes, no problem
    }
    
    // If we reach this far, then everything is ok, we can proceed
    // updating
    matchedTodo = _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});

app.listen(PORT, function(){
   console.log('Express listening at port ' + PORT + '!'); 
});