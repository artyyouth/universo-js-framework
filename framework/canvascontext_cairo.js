(function() {

    function log(msg)
    {
        Debug.log(KS_CANVAS, msg);
    }
    
    function CanvasRenderingContext2D(canvas)
    {
        if (!canvas)
            throw new InvalidParameterError;
            
        this._canvas = canvas;
    }
    
    var exports = CanvasRenderingContext2D;
    
    CanvasRenderingContext2D.prototype._canvas = null;
    CanvasRenderingContext2D.prototype._context = null;
    CanvasRenderingContext2D.prototype._initialized = false;
    
    CanvasRenderingContext2D.prototype.updateContext = function(oldBuffer) {
        this._context = new SurfaceContext(this._canvas.backBuffer);
        if (!this._initialized)
        {
            this.init();
            this._initialized = true;
        }
        if (oldBuffer)
        {
            this.putImageData(oldBuffer, 0, 0, oldBuffer.width, oldBuffer.height, 0, 0);
        }
    }
    
    CanvasRenderingContext2D.prototype.prepare = function() {
        this._canvas.prepare();
        if (!this._context)
        {
            throw new UninitializedError;
        }
    }
    
    CanvasRenderingContext2D.prototype.init = function()
    {
        this.lineWidth = 1;
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.miterLimit = 10;
        this.strokeStyle = "black";
        this.fillStyle = "black";
        this.globalCompositeOperation = "source-over";
        this.textBaseline = "alphabetic";
        this.textAlign = "start";
        this.font = "10px sans-serif";
    }
    
    CanvasRenderingContext2D.prototype._stateStack = null;
    
    /* state */
    /* void */
    CanvasRenderingContext2D.prototype.save = function() {
        this.prepare();
        
        if (!this._stateStack) 
        {
            this._stateStack = new Array;
        }
        
        var state = {};
        state.strokeStyle = this.strokeStyle;
        state.fillStyle = this.fillStyle;
        state.globalAlpha = this.globalAlpha;
        state.lineWidth = this.lineWidth;
        state.lineCap = this.lineCap;
        state.lineJoin = this.lineJoin;
        state.miterLimit = this.miterLimit;
        state.shadowOffsetX = this.shadowOffsetX;
        state.shadowOffsetY = this.shadowOffsetY;
        state.shadowBlur = this.shadowBlur;
        state.shadowColor = this.shadowColor;
        state.globalCompositeOperation = this.globalCompositeOperation;
        
        this._stateStack.push(state);
        
        this._context.save();
    }; /* push state on state stack */
    
    /* void */
    CanvasRenderingContext2D.prototype.restore = function() {
        this.prepare();
        
        if (this._stateStack)
        {
            if (this._stateStack.length > 0)
            {
                var state = this._stateStack.pop();
                if (state)
                {
                    this.strokeStyle = state.strokeStyle;
                    this.fillStyle = state.fillStyle;
                    this.globalAlpha = state.globalAlpha;
                    this.lineWidth = state.lineWidth;
                    this.lineCap = state.lineCap;
                    this.lineJoin = state.lineJoin;
                    this.miterLimit = state.miterLimit;
                    this.shadowOffsetX = state.shadowOffsetX;
                    this.shadowOffsetY = state.shadowOffsetY;
                    this.shadowBlur = state.shadowBlur;
                    this.shadowColor = state.shadowColor;
                    this.globalCompositeOperation = state.globalCompositeOperation;
                }
            }
        }
        
        this._context.restore();
    }; /* pop state stack and restore state */

    /* transformations (default transform is the identity matrix) */
    /* void */
    CanvasRenderingContext2D.prototype.scale = function(/* double */ x, /* double */ y) {
        this.prepare();
        this._context.scale(x, y);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.rotate = function(/* double */ angle) {
        this.prepare();
        this._context.rotate(angle);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.translate = function(/* double */ x, /* double */ y) {
        this.prepare();
        this._context.translate(x, y);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.transform = function(/* double */ a, /* double */ b, /* double */ c, /* double */ d, /* double */ e, /* double */ f) {
        this.prepare();
        this._context.transform(a, b, c, d, e, f);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.setTransform = function(/* double */ a, /* double */ b, /* double */ c, /* double */ d, /* double */ e, /* double */ f) {
        this.prepare();
        this._context.setTransform(a, b, c, d, e, f);
    };

    /* compositing */
    /* attribute /* double */
    CanvasRenderingContext2D.prototype.globalAlpha = 1.0; /* (default 1.0) */
    
    /* attribute DOMString */
    const K_ENUM_COMPOSITE_OPERATION = ["source-over", "destination-over", "source-in", "destination-in", 
        "source-out", "destination-out", "source-atop", "destination-atop",
        "lighter", "darker", "xor", "copy"];
        
    const K_ENUM_COMPOSITE_OPERATION_VALUE = [2, 7, 3, 8, 
        4, 9, 5, 10,
        18, 17, 11, 1];
        
    const K_ATTR_GLOBALCOMPOSITEOPERATION = "globalCompositeOperation";
    
    CanvasRenderingContext2D.prototype._globalCompositeOperation = "source-over"; /* (default source-over) */
    
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_GLOBALCOMPOSITEOPERATION, function() {
        return this._globalCompositeOperation;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_GLOBALCOMPOSITEOPERATION, function(v) {
        this.prepare();
        v = v.toLowerCase();
        var idx = K_ENUM_COMPOSITE_OPERATION.indexOf(v);
        if (idx >= 0 && idx < K_ENUM_COMPOSITE_OPERATION.length)
        {
            this._context.setOperator(K_ENUM_COMPOSITE_OPERATION_VALUE[idx]);
            this._globalCompositeOperation = v;
        }
    });

    CanvasRenderingContext2D.prototype.parseNumber = function(num)
    {
        if (typeof num !== K_TYPE_STRING)
            throw new InvalidParameterError;
    
        if (num.substr(-1) === '%')
        {
            var v = num.substr(0, num.length - 1);
            var i = parseInt(v);
            if (i < 0) i = 0;
            if (i > 100) i = 100;
            i = i / 100;
            return i;
        }
        else
        {
            var v = parseInt(num);
            if (v < 0) v = 0;
            if (v > 255) v = 255;
            return v / 255;
        }
    }
    
    CanvasRenderingContext2D.prototype.parseHex = function(num)
    {
        if (typeof num !== K_TYPE_STRING)
            throw new InvalidParameterError;
            
        if (num.length === 1)
        {
            num = num + num;
        }
        var v = parseInt(num, 16);
        return v / 255;
    }
    
    /* colors and styles */
    CanvasRenderingContext2D.prototype.parseColorString = function(colorStr)
    {
        if (typeof colorStr !== K_TYPE_STRING)
            throw new InvalidParameterError;
            
        var color = {};
        
        if (!K_COLOR_MAP[colorStr])
        {
            if (colorStr.indexOf("rgb(") === 0)
            {
                var match = colorStr.match(/rgb\((?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*\)/m);
                if (match !== null)
                {
                    if (match.length === 4)
                    {
                        color.r = this.parseNumber(match[1]);
                        color.g = this.parseNumber(match[2]);
                        color.b = this.parseNumber(match[3]);
                        color.a = this.globalAlpha;
                        return color;
                    }
                }
                
            }
            else if (colorStr.indexOf("rgba(") === 0)
            {
                var match = colorStr.match(/rgba\((?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*((?:[01]\.)?\d{1,3}%?)(?:\s|\t)*\)/m);
                if (match !== null)
                {
                    if (match.length === 5)
                    {
                        color.r = this.parseNumber(match[1]);
                        color.g = this.parseNumber(match[2]);
                        color.b = this.parseNumber(match[3]);
                        color.a = parseFloat(match[4]);
                        if (color.a > 1.0) color.a = 1.0;
                        return color;
                    }
                }
            }
            else if (colorStr.indexOf("#") === 0)
            {
                var match = colorStr.match(/#([0-9a-fA-F]{6})|#([0-9a-fA-F]{3})/m);
                if (match !== null)
                {
                    if (match.length === 3)
                    {
                        if (typeof match[2] !== K_TYPE_UNDEFINED)
                        {
                            /* #ff0 */
                            var clr = match[2];
                            if (clr.length === 3)
                            {
                                color.r = this.parseHex(clr[0]);
                                color.g = this.parseHex(clr[1]);
                                color.b = this.parseHex(clr[2]);
                                color.a = this.globalAlpha;
                                return color;
                            }
                        }
                        else if (typeof match[1] !== K_TYPE_UNDEFINED)
                        {
                            /* #ff0000 */
                            var clr = match[1];
                            if (clr.length === 6)
                            {
                                color.r = this.parseHex(clr.substr(0,2));
                                color.g = this.parseHex(clr.substr(2,2));
                                color.b = this.parseHex(clr.substr(4,2));
                                color.a = this.globalAlpha;
                                return color;
                            }
                        }
                    }
                }
            }
            
            throw new SyntaxError;
        }
        else
        {
            /* pre-defined colors, e.g. black */
            var rgb = K_COLOR_MAP[colorStr];
            color.r = rgb[0];
            color.g = rgb[1];
            color.b = rgb[2];
            color.a = this.globalAlpha;
        }
        
        return color;
    }
    
    /* attribute any */
    CanvasRenderingContext2D.prototype._strokeStyle = "black"; /* (default black) */
    const K_ATTR_STROKESTYLE = "strokeStyle";
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_STROKESTYLE, function() {
        return this._strokeStyle;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_STROKESTYLE, function(v) {
        this.prepare();
        
        if (!v)
            throw new InvalidParameterError;
            
        if (typeof v === K_TYPE_STRING)
        {
            v = v.toLowerCase();
            /* parse color string */
            var color = this.parseColorString(v);
            this._context.setSourceRgba(color.r, color.g, color.b, color.a);
        }
        else if (v instanceof CanvasPattern)
        {
            this._context.setSource(v.raw);
        }
        else if (v instanceof CanvasGradient)
        {
            this._context.setSource(v.raw);
        }
        
        this._strokeStyle = v;
    });
    
    /* attribute any */
    CanvasRenderingContext2D.prototype._fillStyle = "black"; /* (default black) */
    const K_ATTR_FILLSTYLE = "fillStyle";
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_FILLSTYLE, function() {
        return this._fillStyle;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_FILLSTYLE, function(v) {
        this.prepare();
        
        if (!v)
            throw new InvalidParameterError;
            
        if (typeof v === K_TYPE_STRING)
        {
            /* parse color string */
            v = v.toLowerCase();
            var color = this.parseColorString(v);
            this._context.setSourceRgba(color.r, color.g, color.b, color.a);
        }
        else if (v instanceof CanvasPattern)
        {
            this._context.setSource(v.raw);
        }
        else if (v instanceof CanvasGradient)
        {
            this._context.setSource(v.raw);
        }
        
        this._fillStyle = v;
    });
    
    function CanvasGradient()
    {
        if (arguments.length === 4)
        {
            this.raw = new GradientLinear(
                arguments[0],
                arguments[1],
                arguments[2],
                arguments[3]
            );
        }
        else if (arguments.length === 6)
        {
            this.raw = new GradientRadial(
                arguments[0],
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
            );
        }
        else
        {
            throw new NotSupportedError;
        }
    }
    CanvasGradient.prototype.raw = null;
    CanvasGradient.prototype.addColorStop = function(offset, colorStr)
    {
        if (this.raw)
        {
            var color = Util.parseColorString(colorStr);
            this.raw.addColorStop(offset, color.r, color.g, color.b, color.a);
        }
        else
        {
            throw new NotSupportedError;
        }
    }
    
    /* CanvasGradient */
    CanvasRenderingContext2D.prototype.createLinearGradient = function(/* double */ x0, /* double */ y0, /* double */ x1, /* double */ y1) {
        return new CanvasGradient(x0, y0, x1, y1);
    };
    
    /* CanvasGradient */
    CanvasRenderingContext2D.prototype.createRadialGradient = function(/* double */ x0, /* double */ y0, /* double */ r0, /* double */ x1, /* double */ y1, /* double */ r1) {
        return new CanvasGradient(x0, y0, r0, x1, y1, r1);
    };
    
    /* CanvasPattern */ 
    const K_ENUM_PATTERN_REPETITION = ["no-repeat", "repeat", "repeat-x", "repeat-y"];
    
    function CanvasPattern(image, repetition)
    {
        if (typeof repetition !== K_TYPE_STRING)
            throw new InvalidParameterError;
            
        this.raw = new PatternSurface(image);
        this.repetition = repetition;
        
        var i = K_ENUM_PATTERN_REPETITION.indexOf(repetition);
        if (i < 0 || i >= K_ENUM_PATTERN_REPETITION.length)
        {
            /* default: repeat*/
            i = 1;
        }
        
        if (i >= 2)
        {
            throw new NotSupportedError;
        }
        
        this.raw.setExtend(i);
    }
    CanvasPattern.prototype.raw = null;
    CanvasPattern.prototype.repetition = null;
    
    CanvasRenderingContext2D.prototype.createPattern = function(/* HTMLImageElement */ image, /* DOMString */ repetition) {
        return new CanvasPattern(image, repetition);
    };

    /* line caps/joins */
    /* attribute double */
    const K_ATTR_LINEWIDTH = "lineWidth";
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_LINEWIDTH, function() {
        this.prepare();
        return this._context.getLineWidth();
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_LINEWIDTH, function(v) {
        this.prepare();
        
        if (typeof v !== K_TYPE_NUMBER)
            throw new InvalidParameterError;
        
        this._context.setLineWidth(v);
    });
    
    
    /* attribute DOMString */ 
    /* "butt", "round", "square" (default "butt") */
    const K_ATTR_LINECAP = "lineCap";
    const K_ENUM_LINECAP = ["butt", "round", "square"];
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_LINECAP, function() {
        this.prepare();
        var i = this._context.getLineCap();
        
        if (i < 0 || i >= K_ENUM_LINECAP.length)
        {
            i = 0;
        }
        
        return K_ENUM_LINECAP[i];
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_LINECAP, function(v) {
        this.prepare();
        
        if (typeof v !== K_TYPE_STRING)
            throw new InvalidParameterError;
        
        v = v.toLowerCase();
        var i = K_ENUM_LINECAP.indexOf(v);
        if (i < 0 || i >= K_ENUM_LINECAP.length)
        {
            i = 0;
        }
        
        this._context.setLineCap(i);
    });
    
    /* attribute DOMString */ 
    /* "round", "bevel", "miter" (default "miter") */
    const K_ATTR_LINEJOIN = "lineJoin";
    const K_ENUM_LINEJOIN = ["miter", "round", "bevel"];
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_LINEJOIN, function() {
        this.prepare();
        var i = this._context.getLineJoin();
        
        if (i < 0 || i >= K_ENUM_LINEJOIN.length)
        {
            i = 0;
        }
        
        return K_ENUM_LINEJOIN[i];
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_LINEJOIN, function(v) {
        this.prepare();
        
        if (typeof v !== K_TYPE_STRING)
            throw new InvalidParameterError;
        
        v = v.toLowerCase();
        var i = K_ENUM_LINEJOIN.indexOf(v);
        if (i < 0 || i >= K_ENUM_LINEJOIN.length)
        {
            i = 0;
        }
        
        this._context.setLineJoin(i);
    });
    
    /* attribute double */ 
    /* (default 10) */
    const K_ATTR_MITERLIMIT = "miterLimit";
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_MITERLIMIT, function() {
        this.prepare();
        return this._context.getMiterLimit();
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_MITERLIMIT, function(v) {
        this.prepare();

        if (typeof v !== K_TYPE_NUMBER)
            throw new InvalidParameterError;
            
        this._context.setMiterLimit(v);
    });

    /* shadows */
    /* attribute double */ 
    CanvasRenderingContext2D.prototype.shadowOffsetX = 0; /* (default 0) */
    
    /* attribute double */ 
    CanvasRenderingContext2D.prototype.shadowOffsetY = 0; /* (default 0) */
    
    /* attribute double */ 
    CanvasRenderingContext2D.prototype.shadowBlur = 0; /* (default 0) */
    
    /* attribute DOMString */ 
    CanvasRenderingContext2D.prototype.shadowColor = 0x00000000; /* (default transparent black) */

    /* rects */
    /* void */
    CanvasRenderingContext2D.prototype.clearRect = function(/* double */ x, /* double */ y, /* double */ w, /* double */ h) {
        this.prepare();
        this.save();
        this._context.setSourceRgba(0, 0, 0, 1.0);
        this._context.rect(x, y, w, h);
        this._context.fill();
        this.restore();
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.fillRect = function(/* double */ x, /* double */ y, /* double */ w, /* double */ h) {
        this.prepare();
        this._context.rect(x, y, w, h);
        this.fill();
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.strokeRect = function(/* double */ x, /* double */ y, /* double */ w, /* double */ h) {
        this.prepare();
        this._context.rect(x, y, w, h);
        this.stroke();
    };

    /* path API */
    /* void */
    CanvasRenderingContext2D.prototype.beginPath = function() {
        this.prepare();
        this._context.beginPath();
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.closePath = function() {
        this.prepare();
        this._context.closePath();
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.moveTo = function(/* double */ x, /* double */ y) {
        this.prepare();
        this._context.moveTo(x, y);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.lineTo = function(/* double */ x, /* double */ y) {
        this.prepare();
        this._context.lineTo(x, y);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.quadraticCurveTo = function(/* double */ cpx, /* double */ cpy, /* double */ x, /* double */ y) {
        this.prepare();
        this._context.quadraticCurveTo(cpx, cpy, x, y);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.bezierCurveTo = function(/* double */ cp1x, /* double */ cp1y, /* double */ cp2x, /* double */ cp2y, /* double */ x, /* double */ y) {
        this.prepare();
        this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.arcTo = function(/* double */ x1, /* double */ y1, /* double */ x2, /* double */ y2, /* double */ radius) {
        /* TODO */
        if (radius < 0)
            throw new IndexSizeError;
        
        throw new NotSupportedError;
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.rect = function(/* double */ x, /* double */ y, /* double */ w, /* double */ h) {
        this.prepare();
        this._context.rect(x, y, w, h);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.arc = function(/* double */ x, /* double */ y, /* double */ radius, /* double */ startAngle, /* double */ endAngle) {
        this.prepare();
        
        /* optional boolean anticlockwise*/
        var anticlockwise = false;
        if (arguments.length === 6)
        {
            anticlockwise = arguments[5];
        }
        
        if (anticlockwise)
        {
            endAngle = - endAngle;
        }
        
        this._context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.fill = function() {
        this.prepare();
        this.fillStyle = this.fillStyle;
        this._context.fill();
    };
    
    
    /* void */
    CanvasRenderingContext2D.prototype.stroke = function() {
        this.prepare();
        this.strokeStyle = this.strokeStyle;
        this._context.stroke();
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.drawSystemFocusRing = function(/* Element */ element) {
        throw new NotSupportedError;
    };
    
    /* boolean */
    CanvasRenderingContext2D.prototype.drawCustomFocusRing = function(/* Element */ element) {
        throw new NotSupportedError;
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.scrollPathIntoView = function() {
        throw new NotSupportedError;
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.clip = function() {
        this.prepare();
        this._context.clip();
    };
    
    /* boolean */
    CanvasRenderingContext2D.prototype.isPointInPath = function(/* double */ x, /* double */ y) {
        this.prepare();
        this._context.isPointInPath(x, y);
    };

    /* text */
    /* attribute DOMString */
    CanvasRenderingContext2D.prototype._font = "10px sans-serif"; /* (default 10px sans-serif) */
    CanvasRenderingContext2D.prototype._fontExtents = null;
    const K_ATTR_FONT = "font";
    const K_ENUM_FONT_SLANT = ["normal", "italic", "oblique"];
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_FONT, function() {
        this.prepare();
        return this._font;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_FONT, function(v) {
        this.prepare();

        if (typeof v !== K_TYPE_STRING)
            throw new InvalidParameterError;
        
        v = v.toLowerCase();        
        var fontFace = Util.parseFontString(v);
        
        var slant = 0;
        var weight = 0;
        
        if (fontFace.fontWeight !== "normal")
        {
            weight = 1;
        }
        
        if (fontFace.fontStyle === "italic")
        {
            slant = 1;
        }
        else if (fontFace.fontStyle === "oblique")
        {
            slant = 2;
        }
        
        // buggy! font family doesn't work
        // this._context.selectFontFace("cairo:" + fontFace.fontFamily, 1, 1);      
        this._context.setFont(FontCache.getFont(fontFace.fontFamily, fontFace.fontSize));
        this._context.setFontSize(fontFace.fontSize);
        
        this._font = v;
        this._fontExtents = this._context.fontExtents();
    });
    
    CanvasRenderingContext2D.prototype._dir = "ltr";
    const K_ATTR_DIR = "dir";
    const K_ENUM_DIR = ["ltr", "rtl", "auto"];
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_DIR, function() {
        this.prepare();
        return this._dir;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_DIR, function(v) {
        this.prepare();

        if (typeof v !== K_TYPE_STRING)
            throw new InvalidParameterError;
            
        v = v.toLowerCase();
        var idx = K_ENUM_DIR.indexOf(v);
        if (idx < 0)
        {
            throw new NotSupportedError;
        }
        
        this._dir = v;
    });
    
    /* attribute DOMString */
    CanvasRenderingContext2D.prototype._textAlign = "start"; /* "start", "end", "left", "right", "center" (default: "start") */
    const K_ATTR_TEXTALIGN = "textAlign";
    const K_ENUM_TEXTALIGN = ["start", "end", "left", "right", "center"];
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_TEXTALIGN, function() {
        this.prepare();
        return this._textAlign;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_TEXTALIGN, function(v) {
        this.prepare();

        if (typeof v !== K_TYPE_STRING)
            throw new InvalidParameterError;
        
        v = v.toLowerCase();
        var idx = K_ENUM_TEXTALIGN.indexOf(v);
        if (idx < 0)
        {
            throw new NotSupportedError;
        }
        
        this._textAlign = v;
    });
    
    /* attribute DOMString */
    CanvasRenderingContext2D.prototype._textBaseline = "alphabetic"; /* "top", "hanging", "middle", "alphabetic", "ideographic", "bottom" (default: "alphabetic") */
    const K_ATTR_TEXTBASELINE = "textBaseline";
    const K_ENUM_TEXTBASELINE = ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"];
    CanvasRenderingContext2D.prototype.__defineGetter__(K_ATTR_TEXTBASELINE, function() {
        this.prepare();
        return this._textBaseline;
    });
    
    CanvasRenderingContext2D.prototype.__defineSetter__(K_ATTR_TEXTBASELINE, function(v) {
        this.prepare();

        if (typeof v !== K_TYPE_STRING)
            throw new InvalidParameterError;
        
        v = v.toLowerCase();        
        var idx = K_ENUM_TEXTBASELINE.indexOf(v);
        if (idx < 0)
        {
            throw new NotSupportedError;
        }
        
        this._textBaseline = v;
    });
    
    CanvasRenderingContext2D.prototype.calcAnchor = function(x, y, te, fe)
    {
        var ret = {};
        
        // log("align: " + this.textAlign + " baseline: " + this.textBaseline);
        
        if (this.textAlign === 'left' ||
           (this.textAlign === 'start' && this.dir === 'ltr') ||
           (this.textAlign === 'end' && this.dir === 'rtl'))
        {
            ret.x = x;
        }
        else if (this.textAlign === 'right' ||
            (this.textAlign === 'end' && this.dir === 'ltr') ||
            (this.textAlign === 'start' && this.dir === 'rtl'))
        {
            ret.x = x - te.width;
        }
        else if (this.textAlign === 'center')
        {
            ret.x = x - (te.width / 2 + te.xBearing);
            // log("x=" + x + " te.width=" + te.width + " te.xBearing=" + te.xBearing);
        }
        
        if (this.textBaseline === 'top')
        {
            // ret.y = y + (fe.height - fe.descent);
            ret.y = y + te.height;
        }
        else if (this.textBaseline === 'hanging')
        {
            ret.y = y + fe.ascent;
        }
        else if (this.textBaseline === 'middle')
        {
            // Be careful!! te.yBearing may less than 0!! Ignore it now...
            ret.y = y + (te.height / 2);
            // ret.y = y + (te.height / 2 + te.yBearing);
            // log("y=" + y + " te.height=" + te.height + " te.yBearing=" + te.yBearing);
        }
        else if (this.textBaseline === 'alphabetic')
        {
            ret.y = y;
        }
        else if (this.textBaseline === 'ideographic')
        {
            ret.y = y;
        }
        else if (this.textBaseline === 'bottom')
        {
            ret.y = y - fe.descent;
        }
        
        return ret;
    }
    
    /* void */
    CanvasRenderingContext2D.prototype.fillText = function(/* DOMString */ text, /* double */ x, /* double */ y, /* optional double */ maxWidth) {
        if (typeof text !== K_TYPE_STRING ||
            typeof x !== K_TYPE_NUMBER ||
            typeof y !== K_TYPE_NUMBER)
        {
            throw new InvalidParameterError;
        }
        
        var max_w = 0;
        if (typeof maxWidth === K_TYPE_NUMBER)
        {
            max_w = maxWidth;
            if (max_w <= 0) return;
        }
        
        var tm = this.measureText(text);
        if (tm.width > 0)
        {
            this.prepare();
            
            if (!this._fontExtents)
            {
                this._fontExtents = this._context.fontExtents();
            }
            
            var te = tm.raw;
            var anchor = this.calcAnchor(x, y, te, this._fontExtents);
            
            // log("text anchor: " + anchor.x + " , " + anchor.y);
            
            this.moveTo(anchor.x, anchor.y);
            this._context.textPath(text);
            this.fill();
        }
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.strokeText = function(/* DOMString */ text, /* double */ x, /* double */ y, /* optional double */ maxWidth) {
        var max_w = -1;
        if (typeof maxWidth === K_TYPE_NUMBER)
        {
            max_w = maxWidth;
        }
        
        var max_w = 0;
        if (typeof maxWidth === K_TYPE_NUMBER)
        {
            max_w = maxWidth;
            if (max_w <= 0) return;
        }
        
        var tm = this.measureText(text);
        if (tm.width > 0)
        {
            this.prepare();
            
            if (!this._fontExtents)
            {
                this._fontExtents = this._context.fontExtents();
            }
            
            var te = tm.raw;
            var anchor = this.calcAnchor(x, y, te, this._fontExtents);
            
            this.moveTo(anchor.x, anchor.y);
            this._context.textPath(text);
            this.stroke();
        }
    };
    
    function TextMetrics(width)
    {
        if (typeof width === K_TYPE_NUMBER)
        {
            this.width = width;
            return;
        }
        
        throw new NotSupportedError;
    }
    TextMetrics.prototype.width = 0;
    TextMetrics.prototype.raw = null;
    
    /* TextMetrics */
    CanvasRenderingContext2D.prototype.measureText = function(/* DOMString */ text) {
        if (typeof text === K_TYPE_STRING)
        {
            if (text.length === 0)
            {
                return new TextMetrics(0);
            }
            else
            {
                this.prepare();
                var te = this._context.textExtents(text);
                var tm = new TextMetrics(te.width);
                tm.raw = te;
                return tm;
            }
        }
        
        throw new NotSupportedError;
    };
    

    /* drawing images */
    /* void */
    CanvasRenderingContext2D.prototype.drawImage = function() {
        if (arguments.length === 3)
        {
            /* HTMLImageElement */ 
            var image = arguments[0];
            /* double */ 
            var dx = arguments[1];
            /* double */ 
            var dy = arguments[2];
            
            this.prepare();
            this._context.setSourceSurface(image, dx - 0, dx - 0);
            this.rect(dx, dx, image.width, image.height);
            this._context.paintWithAlpha(this.globalAlpha);
        }
        else if (arguments.length === 5)
        {
            /* HTMLImageElement */ 
            var image = arguments[0];
            /* double */ 
            var dx = arguments[1];
            /* double */ 
            var dy = arguments[2];
            /* double */ 
            var dw = arguments[3];
            /* double */ 
            var dh = arguments[4];
            
            if (dw <= 0 || dh <= 0)
                throw new IndexSizeError;
            
            this.prepare();
            var src = image;
            if (dw !== image.width || dh !== image.height)
            {
                src = image.resize(dw, dh);
            }
            this._context.setSourceSurface(src, dx - 0, dy - 0);
            this._context.rect(dx, dy, dw, dh);
            this._context.paintWithAlpha(this.globalAlpha);
        }
        else if (arguments.length === 9)
        {
            /* HTMLImageElement */ 
            var image = arguments[0];
            /* double */ 
            var sx = arguments[1];
            /* double */ 
            var sy = arguments[2];
            /* double */ 
            var sw = arguments[3];
            /* double */ 
            var sh = arguments[4];
            /* double */ 
            var dx = arguments[5];
            /* double */ 
            var dy = arguments[6];
            /* double */ 
            var dw = arguments[7];
            /* double */ 
            var dh = arguments[8];
            
            if (sx < 0) sx = 0;
            if (sy < 0) sy = 0;
            
            if (sx + sw > image.width)
            {
                sw = image.width - sx;
            }
            
            if (sy + sh > image.height)
            {
                sh = image.height - sy;
            }
            
            if (sw <= 0 || sh <= 0 || sx >= image.width || sy >= image.height)
                throw new IndexSizeError;
            
            var src = this.createImageData(sw, sh);
            src.copyFrom(image, sx, sy, sw, sh, 0, 0);
            this.drawImage(src, dx, dy, dw, dh);
        }
        else
        {
            throw new NotSupportedError("Parameters doesn't meet the definition.");
        }
    };
    
    /* pixel manipulation */
    /* ImageData */
    
    CanvasRenderingContext2D.prototype.createImageData = function() {
        if (arguments.length === 1)
        {
            /* Returns an ImageData object with the same dimensions as the argument. All the pixels in the returned object are transparent black. */
            /* ImageData */ 
            var imagedata = arguments[0];
            
            // alpha channel must be false, or else drawImage doesn't work...
            return new SurfaceImage(imagedata.width, imagedata.height, false);
            
        }
        else if (arguments.length === 2)
        {
            /* Returns an ImageData object with the given dimensions in CSS pixels (which might map to a different number of actual device pixels exposed by the object itself). All the pixels in the returned object are transparent black.*/
            /* double */ 
            var sw = arguments[0];
            /* double */ 
            var sh = arguments[1];
            
            // alpha channel must be false, or else drawImage doesn't work...
            return new SurfaceImage(sw, sh, false);
        }
        else
        {
            throw new NotSupportedError("Parameters doesn't meet the definition.");
        }
    };
    
    /* ImageData */
    CanvasRenderingContext2D.prototype.getImageData = function(/* double */ sx, /* double */ sy, /* double */ sw, /* double */ sh) {
        var ret = this.createImageData(sw, sh);
        ret.copyFrom(this._canvas.backBuffer, sx, sy, sw, sh, 0, 0);
        return ret;
    };
    
    /* void */
    CanvasRenderingContext2D.prototype.putImageData = function() {
        if (arguments.length === 3)
        {
            /* ImageData */ 
            var image = arguments[0];
            /* double */ 
            var dx = arguments[1];
            /* double */ 
            var dy = arguments[2];
            
            var dirtyX = 0;
            var dirtyY = 0;
            var dirtyWidth = image.width;
            var dirtyHeight = image.height;
            
            this.putImageData(image, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
        }
        else if (arguments.length === 7)
        {
            /* ImageData */ 
            var image = arguments[0];
            /* double */ 
            var dx = arguments[1];
            /* double */ 
            var dy = arguments[2];
            /* double */ 
            var dirtyX = arguments[3];
            /* double */ 
            var dirtyY = arguments[4];
            /* double */ 
            var dirtyWidth = arguments[5];
            /* double */ 
            var dirtyHeight = arguments[6];
            
            if (dirtyWidth < 0)
            {
                dirtyX = dirtyX + dirtyWidth;
                dirtyWidth = Math.abs(dirtyWidth);
            }
            
            if (dirtyHeight < 0)
            {
                dirtyY = dirtyY + dirtyHeight;
                dirtyHeight = Math.abs(dirtyHeight);
            }
            
            if (dirtyX < 0)
            {
                dirtyWidth = dirtyWidth + dirtyX;
                dirtyX = 0;
            }
            
            if (dirtyY < 0)
            {
                dirtyHeight = dirtyHeight + dirtyY;
                dirtyY = 0;
            }
            
            if (dirtyX + dirtyWidth > image.width)
            {
                dirtyWidth = image.width - dirtyX;
            }
            
            if (dirtyY + dirtyHeight > image.height)
            {
                dirtyHeight = image.height - dirtyY;
            }
            
            if (dirtyWidth <= 0 || dirtyHeight <= 0) return;
            
            this.prepare();
            this._canvas.backBuffer.copyFrom(image, dirtyX, dirtyY, dirtyWidth, dirtyHeight, dx, dy);
        }
        else
        {
            throw new NotSupportedError("Parameters doesn't meet the definition.");
        }
    };

    return exports;
})();