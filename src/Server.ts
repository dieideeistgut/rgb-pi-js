/// <reference path="typings/node.d.ts" />


//Require / Import
var connect = require('connect');
var favicon = require('serve-favicon');
var connect_static = require('serve-static');
var bodyParser = require('body-parser');

import * as http from "http";
import {Color} from "./Color";
import {Config} from "./Config";



module RGBPi {
	
	class RGBPiServer {
		
		private server: any;
		private config: Config;
		private configChangedCallback: Function;
		
		constructor() {
			
			// //Listen to EADDRINUSE (port already in use)			
			// this.server.on('error', (function(err: any) { 
			// 	if (err.code === "EADDRINUSE") { 
			// 		console.log("Port already in use. Retrying in "+this.config.getTimeout()+" seconds...");
			// 		setTimeout((function() {
			// 			this.startListening();
			// 		}).bind(this), this.config.getTimeout() * 1000); 
			// 	}
			// }).bind(this));
			
			this.configChangedCallback = this.configChanged;
			this.config = new Config(this.configChangedCallback.bind(this));
			// this.run();
			
			//Using connect
			var app = connect()
				.use(favicon(__dirname + '/pub/img/favicon.ico'))
				.use('/admin', connect_static(__dirname + '/pub', {fallthrough: false}))
				.use(bodyParser.json({ type: '*/*' }))
				.use(
					function(req:any, res: any) {

						
						try {
							console.log(req.body);
							res.setHeader('Content-Type', 'application/json');

							//Do logic
							let commands = req.body["commands"];
							
							//Hard coded for testing purposes
							let ccCommand = commands[0];
							let c: Color = new Color(ccCommand.color);
							
							let result = {
								"color":{
									R: c.getByteArray()[0],
									G: c.getByteArray()[1],
									B: c.getByteArray()[2]	
								}
							};
							
							//response.end('Setting color to ' + c.toString());
							res.end(JSON.stringify(result, null, 2));
						}
						catch (Error) {
							console.error(Error.stack);
						}
					})
				.listen(1234);
			
		}
		
		//Run server
		run() {

			// //For all your static (js/css/images/etc.) set the directory name (relative path).
			// dispatcher.setStatic('resources');

			// //A sample GET request    
			// dispatcher.onPost("/", function(req: any, res: any) {
			// 	res.writeHead(200, {'Content-Type': 'text/JSON'});
			

			// //Lets start our server
			// this.startListening();
		}
		
		
		
		//Handles a request
		private handleRequest(request: any, response: any){
			// try {
			// 	dispatcher.dispatch(request, response);
			// } catch(err) {
			// 	console.log(err);
			// }
		}
		
		
		
		/**
		 * Starts listening
		 */
		private startListening(): void {
			// var port: number = this.config.getPort();
			
			// try {
			// 	this.server.listen(port,  function() {
			// 		console.log("Server listening on: http://localhost:%s", port);
			// 	});
			// }
			// catch (e) {
			// 	console.log(e.message);
			// }
		}



		/**
		 * Stops listening and starts again with updated config
		 */		
		private configChanged(): void {
			// this.server.close(function() {
			// 	console.log("Stopped listening..");
			// });
			// this.startListening();
		}
		
	}
	
	
	//Start Server
	let s: RGBPiServer = new RGBPiServer();
}