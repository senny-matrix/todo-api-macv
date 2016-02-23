//var person = {
//    name: 'Rogers',
//    age : 40
//};
//
//function updatePerson(obj){
////    obj = {
////        name: 'Rogers',
////        age : 39
////    };
//    obj.age = 39;
//}
//
//updatePerson(person);
//console.log(person);

// Array example
var grades = [15, 37];

function addGrades(grades){
    grades.push(35);
    debugger;
    // to debug run node debug name of file
    // it will break at the beginning.
    // To execute until we reach a 
    // break point (where we put debugger keyword)
    // type cont
    // To inspect variables and arrays at this point
    // use repl command
    // Type any variable name to see the values
    // You can also modify variable on the fly
    // like grades.push(11); will result into
    // [15, 37, 35, 11] in our case
    // Use Ctrl+c to get out of repl mode
    // Then you can use cont to let the program finish
    
    // To get out of debug mode, use kill command
    // use run command to start running the program
    // again while you are in debug mode.
    // To quit debugger, type quit
}

addGrades(grades);
console.log(grades);
