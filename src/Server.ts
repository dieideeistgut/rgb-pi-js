declare function require(name:string): any;		//Tell the TypeScript compiler that the method require() will exist at runtime

//Require / Import
var http = require('http');
var dispatcher = require('httpdispatcher');

import {Color} from "./Color";
import {Config} from "./Config";



module RGBPi {
	
	class RGBPiServer {
		
		server: any;
		private config: Config;
		private configChangedCallback: Function;
		
		constructor() {
			//Create a server
			this.server = http.createServer(this.handleRequest);
			
			//Listen to EADDRINUSE (port already in use)			
			this.server.on('error', (function(err: any) { 
				if (err.code === "EADDRINUSE") { 
					console.log("Port already in use. Retrying in "+this.config.getTimeout()+" seconds...");
					setTimeout((function() {
						this.startListening();
					}).bind(this), this.config.getTimeout() * 1000); 
				}
			}).bind(this));
			
			this.configChangedCallback = this.configChanged;
			this.config = new Config(this.configChangedCallback.bind(this));
			this.run();
		}
		
		//Run server
		run() {

			//For all your static (js/css/images/etc.) set the directory name (relative path).
			dispatcher.setStatic('resources');

			//A sample GET request    
			dispatcher.onPost("/", function(req: any, res: any) {
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
			

			//Lets start our server
			this.startListening();
		}
		
		
		
		//Handles a request
		private handleRequest(request: any, response: any){
			try {
				dispatcher.dispatch(request, response);
			} catch(err) {
				console.log(err);
			}
		}
		
		
		
		/**
		 * Starts listening
		 */
		private startListening(): void {
			var port: number = this.config.getPort();
			
			try {
				this.server.listen(port,  function() {
					console.log("Server listening on: http://localhost:%s", port);
				});
			}
			catch (e) {
				console.log(e.message);
			}
		}



		/**
		 * Stops listening and starts again with updated config
		 */		
		private configChanged(): void {
			this.server.close(function() {
				console.log("Stopped listening..");
			});
			this.startListening();
		}
		
	}
	
	
	//Start Server
	let s: RGBPiServer = new RGBPiServer();
}