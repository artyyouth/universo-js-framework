(function() {
    
    require("errors.js");

    var Debug = {};
    
    var exports = Debug;
    
    Debug._defaultLogScope = "DEFAULT";
    Debug.enabled = false;
    
    Debug.log = function()
    {
        if (!Debug.enabled) return;
    
        if (arguments.length === 1)
        {
            var scope = Debug._defaultLogScope;
            var message = arguments[0];
            
            if (K_LOG_SCOPES.indexOf(scope) >= 0)
            {
                __LOG(" <" + scope + "> : " + message);
            }
        }
        else if (arguments.length === 2)
        {
            var scope = arguments[0];
            var message = arguments[1];
            
            if (K_LOG_SCOPES.indexOf(scope) >= 0)
            {
                __LOG(" <" + scope + "> : " + message);
            }
        }
        else
        {
            throw new NotSupportedError;
        }
    }
    
    return exports;

})();