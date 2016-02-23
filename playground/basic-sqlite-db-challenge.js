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

sequelize.sync({}).then(function(){
	console.log('Everything is sync');
	
	Todo.findById(2).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		}else{
			console.log('TODO NOT FOUND!');
		}
	})	
})