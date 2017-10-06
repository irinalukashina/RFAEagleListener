
var database = require('./database');

//milliseconds between 2000 and 1970
var millisecondsToAdd = 10957 * 24 * 60 * 60 * 1000;

var handleInstantaneousDemand = function(eagleMessage) {
    var attributes = eagleMessage.$;
    var instantaneousDemand = eagleMessage.InstantaneousDemand;

    var demand  = parseInt(instantaneousDemand.Demand);
    var multiplier = parseInt(instantaneousDemand.Multiplier);
    var divisor = parseInt(instantaneousDemand.Divisor);

    var timeStamp = new Date(parseInt(instantaneousDemand.TimeStamp)  * 1000 + millisecondsToAdd);

    var messageTimestampStr = attributes.timestamp.substring(0, attributes.timestamp.length - 1);
    var messageTimestamp = new Date(parseInt(messageTimestampStr)  * 1000);

    database.findDevice(attributes.macId, function(err, device) {
        var instantaneousDemand = {device: device._id, messageTimestamp: messageTimestamp, timeStamp: timeStamp, demand: demand * multiplier / divisor};
        database.insertInstantaneousDemand([instantaneousDemand], function(err, results){
            console.log('Inserted');
        });
    });
}

var handleCurrentSummationDelivered = function(eagleMessage){
    var attributes = eagleMessage.$;
    var summationDelivered = parseInt(eagleMessage.CurrentSummationDelivered.SummationDelivered);
    var summationReceived = parseInt(eagleMessage.CurrentSummationDelivered.SummationReceived);

    var multiplier = parseInt(eagleMessage.CurrentSummationDelivered.Multiplier);
    var divisor = parseInt(eagleMessage.CurrentSummationDelivered.Divisor);

    var timeStamp = new Date(parseInt(eagleMessage.CurrentSummationDelivered.TimeStamp)  * 1000 + millisecondsToAdd);

    var messageTimestampStr = attributes.timestamp.substring(0, attributes.timestamp.length - 1);
    var messageTimestamp = new Date(parseInt(messageTimestampStr)  * 1000);

    database.findDevice(attributes.macId, function(err, device) {
        var currentSummationDelivered = {device: device._id, messageTimestamp: messageTimestamp, timeStamp: timeStamp, summationDelivered: summationDelivered * multiplier / divisor, summationReceived: summationReceived};
        database.insertCurrentSummationDelivered([currentSummationDelivered], function(err, results){
            console.log('Inserted');
        });
    });

}


module.exports = function (eagleMessage) {
    if(eagleMessage.InstantaneousDemand) {
        handleInstantaneousDemand(eagleMessage);
    }else {
       if(eagleMessage.CurrentSummationDelivered){
            handleCurrentSummationDelivered(eagleMessage);
            console.log(eagleMessage.CurrentSummationDelivered);

        }
    }

    return null;
};
