"use strict";
//Require / Import
var http = require('http');
var dispatcher = require('httpdispatcher');
var Color_1 = require("./Color");
var Config_1 = require("./Config");
var RGBPi;
(function (RGBPi) {
    var RGBPiServer = (function () {
        function RGBPiServer() {
            this.run();
        }
        //Run server
        RGBPiServer.prototype.run = function () {
            //For all your static (js/css/images/etc.) set the directory name (relative path).
            dispatcher.setStatic('resources');
            //A sample GET request    
            dispatcher.onPost("/", function (req, res) {
                res.writeHead(200, { 'Content-Type': 'text/JSON' });
                try {
                    var request = JSON.parse(req.body);
                    //Do logic
                    var commands = request["commands"];
                    //Hard coded for testing purposes
                    var ccCommand = commands[0];
                    var c = new Color_1.Color(ccCommand.color);
                    res.end('Setting color to ' + c.toString());
                }
                catch (Error) {
                    var m = JSON.stringify({ message: Error.message, stack: Error.stack });
                    console.error(m);
                    res.end(m);
                }
            });
            //Fade mock
            function fade(timeInSecs, endColor, startColor) {
            }
            //Handles a request
            function handleRequest(request, response) {
                try {
                    dispatcher.dispatch(request, response);
                }
                catch (err) {
                    console.log(err);
                }
            }
            //Create a server
            var server = http.createServer(handleRequest);
            //Lets start our server
            server.listen(Config_1.Config.PORT, function () {
                //Callback triggered when server is successfully listening.
                console.log("Server listening on: http://localhost:%s", Config_1.Config.PORT);
            });
        };
        return RGBPiServer;
    }());
    //Start Server
    var s = new RGBPiServer();
})(RGBPi || (RGBPi = {}));
