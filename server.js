//Require / Import
var http = require('http');
var color = require('./color');
var assert = require('./utils').assert;
var PORT = require('./config').PORT;
var dispatcher = require('httpdispatcher');



//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');



//A sample GET request    
dispatcher.onPost("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
	
	try {
		console.log(req.body);
		var c = req.body;
		assert(c, "Missing parameter: color");
		
		//Convert any supported format to float array
		c = color.Color(JSON.parse(c));
	
		//Do logic
		
		res.end('Setting color to ' + c);
	}
	catch (e) {
		var err = {};
		err.message = e.message;
		err.stack = e.stack;
		res.end(JSON.stringify(err));
	}
});



//Fade mock
function fade(timeInSecs, endColor, startColor) {
	
}



//Handles a request
function handleRequest(request, response){
    try {
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}



//Create a server
var server = http.createServer(handleRequest);



//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", PORT);
});