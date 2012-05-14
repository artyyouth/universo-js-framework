(function() {

    function log(msg)
    {
        Debug.log(KS_CANVAS, msg);
    }
    
	var exports = null;

	if (Universo.getPlatform() === K_PLATFORM_COCOA_TOUCH)
	{
		log("Use CoreGraphic backend");
		exports = require("canvascontext_cocoa.js");
	}
	else
	{
		log("Use Cairo backend");
		exports = require("canvascontext_cairo.js");
	}
    
    return exports;
})();