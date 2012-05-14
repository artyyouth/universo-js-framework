(function() {
    
    var Events = {};
    
    var exports = Events;
    
    Events.addEventListener = function(type, listener, useCapture)
    {
        if (typeof type !== K_TYPE_STRING)
        {
            throw new InvalidParameterError();
        }
        
        if (typeof listener !== K_TYPE_FUNCTION)
        {
            throw new InvalidParameterError();
        }
    
        if (!Events[type])
        {
            Events[type] = new Array();
        }
        
        var id = Events[type].indexOf(listener);
        if (id < 0)
        {
            Events[type].push(listener);
        }
    }
    
    Events.removeEventListener = function(type, listener, useCapture)
    {
        if (typeof type !== K_TYPE_STRING)
        {
            return;
        }
        
        if (typeof listener !== K_TYPE_FUNCTION)
        {
            return;
        }
    
        if (!Events[type])
        {
            return;
        }
        
        var id = Events[type].indexOf(listener);
        if (id >= 0)
        {
            Events[type].splice(id, 1);
        }
    }
    
    Events.emitEvent = function(type, evt)
    {
        if (!Events[type])
        {
            return;
        }
        
        if (!evt)
        {
            throw new InvalidParameterError;
        }
        
        var listeners = Events[type];
        var len = listeners.length;
        
        for (var i = 0; i < len; i++)
        {
            var callback = listeners[i];
            callback(evt);
        }
    }
    
    
    return Events;
    
})();