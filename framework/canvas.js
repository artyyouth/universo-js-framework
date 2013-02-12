(function() {
    
    const CanvasRenderingContext2D = require("canvascontext.js");
    const WebGLRenderingContext = require("glcontext.js");
    
    function Canvas()
    {
        if (arguments.length === 2)
        {
            if (isNaN(arguments[0]) || isNaN(arguments[1]))
                throw new NotSupportedError;
            
            this.width = arguments[0];
            this.height = arguments[1];
        }
    }
    
    var exports = Canvas;
    
    /*
    Canvas.prototype._width = 0;
    Canvas.prototype._height = 0;
    
    Canvas.prototype.__defineGetter__("width",
        function() {
            return this._width;
        }
    );
    
    Canvas.prototype.__defineSetter__("width",
        function(v) {
            if (isNaN(v))
                throw new InvalidParameterError;
            this._width = v;
            this.reSize(this._width, this._height);
        }
    );
    
    Canvas.prototype.__defineGetter__("height",
        function() {
            return this._height;
        }
    );
    
    Canvas.prototype.__defineSetter__("height",
        function(v) {
            if (isNaN(v))
                throw new InvalidParameterError;
            this._height = v;
            this.reSize(this._width, this._height);
        }
    );
    */
    
    Canvas.prototype.width = 0;
    Canvas.prototype.height = 0;
    
    Canvas.prototype.backBuffer = null;
    Canvas.prototype._context2d = null;
    Canvas.prototype._glcontext = null;
    Canvas.prototype.texture = null;
    Canvas.prototype._mode = K_CANVAS_MODE_UNKNOWN;
    
    Canvas.prototype.setMode = function(mode) {
        this._mode = mode;
    };
    
    Canvas.prototype.getMode = function() {
        return this._mode;
    };
    
    Canvas.prototype.prepare = function() {
        if (this._mode === K_CANVAS_MODE_2D)
        {
            var oldBuffer = this.backBuffer;
            if (!this.backBuffer)
            {
                if (this.width > 0 && this.height > 0)
                {
                    this.backBuffer = new SurfaceImage(this.width, this.height, false);
                    this.texture = this.backBuffer.toTexture();
                    
                    if (!this._context2d)
                    {
                        this._context2d = new CanvasRenderingContext2D(this);
                    }
                    
                    if (this._context2d != null)
                    {
                        this._context2d.updateContext(oldBuffer);
                    }
                }
            }
            else
            {
                if (this.backBuffer.width != this.width || this.backBuffer.height != this.height)
                {
                    this.backBuffer = new SurfaceImage(this.width, this.height, false);
                    this.texture = this.backBuffer.toTexture();
                    
                    if (!this._context2d)
                    {
                        this._context2d = new CanvasRenderingContext2D(this);
                    }
                    
                    if (this._context2d != null)
                    {
                        this._context2d.updateContext(oldBuffer);
                    }
                }
            }
        }
    }
    
    Canvas.prototype.toDataURL = function() {
        throw new NotSupportedError;
    }
    
    Canvas.prototype.toBlob = function() {
        throw new NotSupportedError;
    }
    
    Canvas.prototype.getContext = function(canvasType)
    {
        if (typeof canvasType === K_TYPE_STRING)
        {
            canvasType = canvasType.toLowerCase();
            if (canvasType === "2d")
            {            
                if (this._glcontext) return null;
            
                this._mode = K_CANVAS_MODE_2D;
            
                if (!this._context2d)
                {
                    this._context2d = new CanvasRenderingContext2D(this);
                }
                
                return this._context2d;
            }
            else if (canvasType === "webgl" || 
                    canvasType === "webkit-3d" || 
                    canvasType === "experimental-webgl" ||
                    canvasType === "moz-webgl")
            {
                if (this._context2d) return null;
                
                this._mode = K_CANVAS_MODE_GL;
                
                if (!this._glcontext)
                {
                    if (arguments.length > 1)
                    {
                        this._glcontext = new WebGLRenderingContext(this, arguments[1]);
                    }
                    else
                    {
                        this._glcontext = new WebGLRenderingContext(this);
                    }
                }
                
                return this._glcontext;
            }
        }
        
        throw new NotSupportError;
    }
    
    return Canvas;
    
})();