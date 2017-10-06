var MongoClient = require('mongodb').MongoClient;
var Map = require("collections/map");

var mongoUrl = 'mongodb://eagle:start123@ds157624.mlab.com:57624/eagle';
var connection;

var deviceMacId2DeviceMap = new Map();

module.exports.connectDB = function(callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
        if(err) throw err;
        connection = db;
        callback();
    });
};

module.exports.insertDevice = function(device, callback) {
    var collection = connection.collection('device');
    collection.insertOne(device, callback);
};

module.exports.findDevice = function(deviceMacId, callback) {
    if (deviceMacId2DeviceMap.has(deviceMacId)) {
        callback(null, deviceMacId2DeviceMap.get(deviceMacId));
    }
    else {
        var collection = connection.collection('device');
        collection.findOne({deviceMacId: deviceMacId}, function (err, device) {
            deviceMacId2DeviceMap.set(deviceMacId, device);
            callback(null, device);
        });
    }
}

module.exports.insertInstantaneousDemand = function(demands, callback) {
    var collection = connection.collection('instantDemand');
    collection.insertMany(demands, callback);
};

module.exports.insertCurrentSummationDelivered = function(demands, callback) {
    var collection = connection.collection('currentSummationDelivered');
    collection.insertMany(demands, callback);
};
