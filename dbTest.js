var mongo = require('mongodb');

var mongoClient = mongo.MongoClient;

mongoClient.connect('mongodb://eagle:start123@ds157624.mlab.com:57624/eagle', function(err, connection){
    var deviceCol = connection.collection('device');
    deviceCol.findOne({}, function(err, result){

            console.log('device:', result);

    });

    connection.close();
});

console.log('Hi');