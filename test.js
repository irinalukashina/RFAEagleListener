
var xml2js = require('xml2js');


var parser = new xml2js.Parser({
    /*tagNameProcessors: function(name) {
        return name; //name.charAt(0).toLowerCase() + name.slice(1);
    },
    */explicitRoot: false,
    explicitArray : false,
    attrkey: '@'
});

// 1. parse xml string and save result in variable xmlParsed
var xml = getSrcXml();
parser.parseString(xml, function(err, result){
    // 2. make xmlParsed in JSoN string
    var builtJson = JSON.stringify(result);
    // 3. print to console
    console.log('result XML to Object:', builtJson);
});


function getSrcXml() {
    return ''.concat(
    '<rainforest macId="0xf0ad4e00ce69" timestamp="1355292588s">',
    '<InstantaneousDemand>',
    '<DeviceMacId> 0x00158d0000000004 </DeviceMacId>',
    '<MeterMacId> 0x00178d0000000004 </MeterMacId>',
    '<TimeStamp> 0x185adc1d </TimeStamp>',
    '<Demand> 0x001738 </Demand>',
    '<Multiplier> 0x00000001 </Multiplier>',
    '<Divisor> 0x000003e8 </Divisor>',
    '<DigitsRight> 0x03 </DigitsRight>',
    '<DigitsLeft> 0x00 </DigitsLeft>',
    '<SuppressLeadingZero> Y </SuppressLeadingZero>',
    '</InstantaneousDemand>',
    '</rainforest>');

}