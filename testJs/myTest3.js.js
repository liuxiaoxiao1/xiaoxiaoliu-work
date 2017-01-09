/**
 * Created by liuxiaoxiao1 on 16/8/8.
 */
// Load the fs (filesystem) module
var fs = require('fs');

// Read the contents of the file into memory.
fs.readFile('../logs/logs.txt', function (err, logData) {

    // If an error occurred, throwing it will
    // display the exception and end our app.
    if (err) throw err;

    // logData is a Buffer, convert to string.
    var text = logData.toString();
    console.log(text);

    var lines = text.split('\n');

    lines.forEach(function(line) {
        console.log('****');
        console.log(line);
    })

})
fs.appendFile('../logs/logs.txt',"testss我是",'utf-8', function(){
    console.log(12132);
});
