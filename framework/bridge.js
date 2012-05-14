(function() {

    var Bridge = {};
    
    var exports = Bridge;

    Bridge._animationCallbackList = new Array;
    
    Bridge._animationTask = null;
    
    Bridge.startAnimation = function()
    {
        Universo.requestReDraw();
        
        var delay = 1000 / K_MAX_FPS;
        if (Bridge._fps < K_MAX_FPS) delay = 0;
        
        Bridge._animationTask = new Task(Bridge.startAnimation, delay, false);
    }
    
    Bridge.stopAnimation = function()
    {
        if (Bridge._animationTask)
        {
            Bridge._animationTask.cancel();
            Bridge._animationTask = null;
        }
    }

    Bridge.requestAnimationFrame = function(callback)
    {
        if (typeof callback === K_TYPE_FUNCTION)
        {
            if (Bridge._animationCallbackList.indexOf(callback) < 0)
            {
                Bridge._animationCallbackList.push(callback);
                
                //Debug.log("Universo.requestReDraw");
                //Universo.requestReDraw();
                //return;
                
                Debug.log("Bridge.requestAnimationFrame");
                if (Bridge._animationTask === null)
                {
                    Bridge.startAnimation();
                }
            }
        }
    }
    
    Bridge.emitAnimationCallbacks = function()
    {
        var callbackList = new Array();
        while (Bridge._animationCallbackList.length > 0)
        {
            var callback = Bridge._animationCallbackList.pop();
            if (typeof callback === K_TYPE_FUNCTION)
            {
                callbackList.push(callback);
            }
        }
        
        while (callbackList.length > 0)
        {
            var callback = callbackList.pop();
            callback(Date.now());
        }
    }
    
    const CanvasClass = require("canvas.js");
    
    Bridge.createCanvas = function()
    {
        return new CanvasClass();
    }
    
    Bridge._screenCanvas = null;
    
    Bridge.getScreenCanvas = function()
    {
        if (!Bridge._screenCanvas)
        {
            Bridge._screenCanvas = new CanvasClass();
        }
        
        return Bridge._screenCanvas;
    }
    
    Bridge.drawScreenCanvas = function()
    {
        var screenTexture = null;
        var canvas = Bridge.getScreenCanvas();
        
        if (canvas.getMode() !== K_CANVAS_MODE_2D) return;
        
        if (screenTexture !== canvas.texture)
        {
            screenTexture = canvas.texture;
            Debug.log(KS_DRAW, "Set screen texture!");
            if (screenTexture)
            {
                screenTexture.enableAndBind();
            }
        }
        
/*        
        Debug.log(KS_DRAW, "Clear screen first.");
        GL.clear(0, 0, 0, 1.0, true);
*/

        if (screenTexture)
        {
            Debug.log(KS_DRAW, "Update screen texture!");
            screenTexture.update(canvas.backBuffer);
            
            Debug.log(KS_DRAW, "Start blit to screen");
            GL.drawTexture(screenTexture, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            Debug.log(KS_DRAW, "End blit to screen");
        }
    }
    
    Bridge._fps = 0;
    
    Bridge.drawFPSCounter = function(lastFrameTicks)
    {   
        if (typeof lastFrameTicks === K_TYPE_NUMBER)
        {
            var canvas = Bridge.getScreenCanvas();
            if (canvas.getMode() !== K_CANVAS_MODE_2D) return;
        
            var fps = Math.round((lastFrameTicks < 1) ? 0 : (1000 / lastFrameTicks));
            var txt = fps + " FPS";
            var ctx = canvas.getContext("2d");
            ctx.save();
            ctx.font = "30px Vrinda";
            var tm = ctx.measureText(txt);
            var h = tm.raw.height;
            var w = tm.raw.width;
            // Debug.log(fps + " FPS counter size: " + w + " , " + h);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "green";
            ctx.textBaseline = "top";
            ctx.textAlign = "left";
            ctx.fillText(txt, 0, 0);
            ctx.restore();
            
            Bridge._fps = fps;
        }
    }
    
    return exports;
    
})();