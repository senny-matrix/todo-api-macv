// Require Sequelize
var Sequelize = require('sequelize');

// Create instance of Sequalize
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect' : 'sqlite',
	'storage' : __dirname + '/basic-sqlite-database.sqlite' // Specific for SQLITE
});

var Todo = sequelize.define('todo', {
	description : {
		type      : Sequelize.STRING,
		allowNull : false,
		validate  : {
			//notEmpty : true
			len : [1, 250]
		}
	},
	completed : {
		type         : Sequelize.BOOLEAN,
		allowNull    : false,
		defaultValue : false
	}
})

sequelize.sync({force:true}).then(function(){
	console.log('Everything is sync');

	// Insert a record
	Todo.create({
		description : 'Walk my Dog',
		completed : false // You can leave this and it will 
						  // still work as we have default
						  // value for this field
	}).then(function(todo){
		//console.log('Finished');
		//console.log(todo);
		return Todo.create({
			description : 'Clean Office',
		});
	}).then(function(){
		//return Todo.findById(1)
		return Todo.findAll({
			where : {
				description : {
					$like : '%Walk%'
				}
			}
		});
	}).then(function(todos){
		if(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		}else{
			console.log('No TODO found!!!');
		}
	}).catch(function(e){
		console.log(e);
	});
})