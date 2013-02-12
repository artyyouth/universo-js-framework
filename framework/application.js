(function() {

    function log(msg)
    {
        Debug.log(KS_APP, msg);
    }
    
    var Application = {};
    var exports = Application;
    
    var app_main = require("app/main.js");
    var lastFrameTicks = 0;
    
    Application.main = function()
    {
        Debug.enabled = true;
        log("Start main()");
        FontCache.init();
        var screenCanvas = CanvasBridge.getScreenCanvas();
        // screenCanvas.setMode(K_CANVAS_MODE_GL);
        // screenCanvas.setMode(K_CANVAS_MODE_2D);
        screenCanvas.width = Universo.getWidth();
        screenCanvas.height = Universo.getHeight();
        log("Screen size: " + screenCanvas.width + " : " + screenCanvas.height);
        screenCanvas.prepare();
        if (typeof app_main === K_TYPE_FUNCTION)
        {
            var t = new Task(app_main, 0);
            // app_main();
        }
        Debug.log("End main()");
    }
    
    Application.slice = function()
    {
        log("VM slice()");
        Task.runOneTask();
    }
    
    Application.shutDown = function()
    {
    
    }
    
    Application.draw = function()
    {
        Debug.log(KS_DRAW, "Start draw()");
        var beginTick = Util.getCurrentTick();
        CanvasBridge.emitAnimationCallbacks();
        var renderTick = Util.getCurrentTick();
        CanvasBridge.drawFPSCounter(lastFrameTicks);
        CanvasBridge.drawScreenCanvas();
        var endTick = Util.getCurrentTick();
        Debug.log(KS_PERF, "Draw time: " + beginTick + " - " + renderTick + " - " + endTick + 
            " | draw time: " + (endTick - beginTick) + 
            " | render time: " + (renderTick - beginTick) +
            " | blit time: " + (endTick - renderTick));
        Debug.log(KS_DRAW, "End draw()");
        lastFrameTicks = endTick - beginTick;
    }
    
    Application.mouseUp = function(e)
    {
        Debug.log(KS_MOUSE, "MouseUp: " + e.clientX + " : " + e.clientY);
        Events.emitEvent('mouseup', e);
        Universo.requestReDraw();
    }

    Application.mouseDown = function(e)
    {
        Debug.log(KS_MOUSE, "MouseDown: " + e.clientX + " : " + e.clientY);
        Events.emitEvent('mousedown', e);
        Universo.requestReDraw();
    }

    Application.mouseMove = function(e)
    {
        Debug.log(KS_MOUSE, "MouseMove: " + e.clientX + " : " + e.clientY);
        Events.emitEvent('mousemove', e);
        Universo.requestReDraw();
    }

    Application.mouseDrag = function(e)
    {
        Debug.log(KS_MOUSE, "MouseDrag: " + e.clientX + " : " + e.clientY);
        Events.emitEvent('mousedrag', e);
        Events.emitEvent('mousemove', e);  // in DOM event, only mouse move is supported.
        Universo.requestReDraw();
    }

    Application.mouseWheel = function(e)
    {
        Debug.log(KS_MOUSE, "MouseWheel: " + e.clientX + " : " + e.clientY);
        Events.emitEvent('mousewheel', e);
        Universo.requestReDraw();
    }

    Application.keyUp = function(e)
    {
        Debug.log(KS_KEY, "KeyUp: " + e.key);
        Events.emitEvent('keyup', e);
        Universo.requestReDraw();
    }

    Application.keyDown = function(e)
    {
        Debug.log(KS_KEY, "KeyDown: " + e.key);
        Events.emitEvent('keydown', e);
        Universo.requestReDraw();
    }

    Application.sizeChanged = function(width, height)
    {
        /* Resize the canvas buffer */
        var screenCanvas = CanvasBridge.getScreenCanvas();
        screenCanvas.width = width;
        screenCanvas.height = height;
        screenCanvas.prepare();
        var e = {};
        e.width = width;
        e.height = height;
        Events.emitEvent('sizechanged', e);
        Universo.requestReDraw();
    }

    Application.touchBegan = function(e)
    {
        Events.emitEvent('touchbegan', e);
        Universo.requestReDraw();
    }

    Application.touchMoved = function(e)
    {
        Events.emitEvent('touchmoved', e);
        Universo.requestReDraw();
    }

    Application.touchEnded = function(e)
    {
        Events.emitEvent('touchended', e);
        Universo.requestReDraw();
    }
    
    return exports;
    
})();