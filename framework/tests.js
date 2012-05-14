const UT = (function() {

    var scope = "TESTS";

    var log = function(msg)
    {
        Debug.log(scope, msg);
    }
    
    var objStr = "{\"a\":1,\"b\":2}";
    var obj = JSON.parse(objStr);
    log("Parse JSON: obj.a=" + obj.a.toString() + "; obj.b=" + obj.b.toString());

    var oStr = JSON.stringify(obj);
    log("Stringify Object: " + oStr);

    const Skin = require("skin.js");
    Skin.test();

    require("ui/window.js");

    var s = require("skin.js");
    s.test();

    var ss = require("skin.js");
    ss.test();
    
    var d = new Date();
    log(d.toString());
    
    var t = 100;
    const Test = {};
    var exports = Test;
    Test.test = function()
    {
        log("t = " + t);
    }
    return Test;

})();

// Test.test() // not accessable
Debug.log(t);  // undefined
Debug.log(App); // object object
UT.test(); // 100
var t = 10; // pass
UT.test(); // t = 100
Debug.log(t); // t = 10
//const t = 11;  // redeclare error
