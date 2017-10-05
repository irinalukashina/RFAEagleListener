var http = require('http');
var xml2js = require('xml2js');
var database = require('./database');
var handleEagleMessage = require('./eagleMessageHandler');

var builder = new xml2js.Builder();
var parser = new xml2js.Parser({async : true, explicitRoot: false , explicitArray : false});


var httpRequestHandler = function(request, response){
    // TODO: check request type == "xml" AND maybe other checks

    request.on('error', function() {
        console.error(err);
    });

    var chunks = [];
    request.on('data', function(chunk) {
        chunks.push(chunk);
    });

    request.on('end', function() {
        var eagleMessageXML = Buffer.concat(chunks).toString();
        parser.parseString(eagleMessageXML, function (err, eagleMessage) {
            // TODO: add error check
            var eagleCommand =  handleEagleMessage(eagleMessage);
            // test empty command result
            if(eagleCommand) {
                response.writeHead(200);

                var eagleCommandXml = builder.buildObject(eagleCommand);
                response.end(eagleCommandXml);
            }
            else {
                response.writeHead(200);
                response.end();
            }
        });
    });

}

var httpServer = http.createServer(httpRequestHandler);

database.connectDB(function(){
    httpServer.listen(3000);
});

