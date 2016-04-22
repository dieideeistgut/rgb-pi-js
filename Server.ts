declare function require(name:string);		//Tell the TypeScript compiler that the method require() will exist at runtime

//Require / Import
var http = require('http');
var dispatcher = require('httpdispatcher');

import {Color} from "./Color";
import {Config} from "./Config";



module RGBPi {
	
	class RGBPiServer {
		
		constructor() {
			this.run();
		}
		
		//Run server
		run() {

			//For all your static (js/css/images/etc.) set the directory name (relative path).
			dispatcher.setStatic('resources');

			//A sample GET request    
			dispatcher.onPost("/", function(req, res) {
				res.writeHead(200, {'Content-Type': 'text/JSON'});
				
				try {
					let request = JSON.parse(req.body);
					
					//Do logic
					let commands = request["commands"];
					
					//Hard coded for testing purposes
					let ccCommand = commands[0];
					let c: Color = new Color(ccCommand.color);
					
					res.end('Setting color to ' + c.toString());
				}
				catch (Error) {
					let m:string = JSON.stringify({ message: Error.message, stack: Error.stack });
					console.error(m);
					res.end(m);
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
			server.listen(Config.PORT, function(){
				//Callback triggered when server is successfully listening.
				console.log("Server listening on: http://localhost:%s", Config.PORT);
			});
		}
		
	}
	
	//Start Server
	let s: RGBPiServer = new RGBPiServer();
}