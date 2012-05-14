(function() {

    var Util = {};
    
    var exports = Util;
    
    Util.globalAlpha = 1.0;
    
    Util.defaultFontSize = 16.0; // in px == 12pt, refer to: http://pxtoem.com/
    
    Util.parseFontSize = function(fontSize)
    {
        // defaultFontSize == 1em == 100% == 12pt
        if (typeof fontSize !== K_TYPE_STRING || fontSize.length === 0)
        {
            throw new InvalidParameterError;
        }
        
        fontSize = fontSize.toLowerCase();
        
        if (fontSize === "normal")
        {
            return Util.defaultFontSize;
        }
        
        if (fontSize.indexOf("px"))
        {
            fontSize = fontSize.replace("px", "");
            return parseInt(fontSize);
        }
        else if (fontSize.indexOf("em"))
        {
            fontSize = fontSize.replace("em", "");
            var emValue = parseFloat(fontSize);
            return emValue * defaultFontSize;
        }
        else if (fontSize.indexOf("%"))
        {
            fontSize = fontSize.replace("%", "");
            var percentage = parseInt(fontSize) / 100;
            return defaultFontSize * percentage;
        }
        else if (fontSize.indexOf("pt"))
        {
            fontSize = fontSize.replace("pt", "");
            var ptValue = parseFloat(fontSize);
            return (defaultFontSize / 12) * ptValue;
        }
        else
        {
            throw new SyntaxError;
        }
    }
    
    Util.parseFontString = function(fontStr)
    {
        // another reference: http://www.codeproject.com/KB/recipes/CSSParser.aspx
        var fontFamily = null,
            fontSize = null,
            fontStyle = "normal",
            fontWeight = "normal",
            fontVariant = "normal",
            lineHeight = "normal";

        var elements = fontStr.split(/\s+/);
        outer: while (true)
        {
            var element = elements.shift();
            if (!element) break outer;
            
            switch (element)
            {
                case "normal":
                    break;

                case "italic":
                case "oblique":
                    fontStyle = element;
                    break;

                case "small-caps":
                    fontVariant = element;
                    break;

                case "bold":
                case "bolder":
                case "lighter":
                case "100":
                case "200":
                case "300":
                case "400":
                case "500":
                case "600":
                case "700":
                case "800":
                case "900":
                    fontWeight = element;
                    break;

                default:
                    if (!fontSize)
                    {
                        var parts = element.split("/");
                        fontSize = parts[0];
                        if (parts.length > 1) lineHeight = parts[1];
                        break;
                    }

                    fontFamily = element;
                    if (elements.length)
                        fontFamily += " " + elements.join(" ");
                    break outer;
            }
        }

        return {
            "fontStyle": fontStyle,
            "fontVariant": fontVariant,
            "fontWeight": fontWeight,
            "fontSize": Util.parseFontSize(fontSize),
            "lineHeight": Util.parseFontSize(lineHeight),
            "fontFamily": fontFamily
        }
    }
    
    Util.parseNumber = function(num)
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
    
    Util.parseHex = function(num)
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
    Util.parseColorString = function(colorStr)
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
                        color.r = Util.parseNumber(match[1]);
                        color.g = Util.parseNumber(match[2]);
                        color.b = Util.parseNumber(match[3]);
                        color.a = Util.globalAlpha;
                        return color;
                    }
                }
                
            }
            else if (colorStr.indexOf("rgba(") === 0)
            {
                var match = colorStr.match(/rgba\((?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*(-?\d{1,3}%?)(?:\s|\t)*,(?:\s|\t)*((?:[10]\.)?\d{1,3}%?)(?:\s|\t)*\)/m);
                if (match !== null)
                {
                    if (match.length === 5)
                    {
                        color.r = Util.parseNumber(match[1]);
                        color.g = Util.parseNumber(match[2]);
                        color.b = Util.parseNumber(match[3]);
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
                                color.r = Util.parseHex(clr[0]);
                                color.g = Util.parseHex(clr[1]);
                                color.b = Util.parseHex(clr[2]);
                                color.a = Util.globalAlpha;
                                return color;
                            }
                        }
                        else if (typeof match[1] !== K_TYPE_UNDEFINED)
                        {
                            /* #ff0000 */
                            var clr = match[1];
                            if (clr.length === 6)
                            {
                                color.r = Util.parseHex(clr.substr(0,2));
                                color.g = Util.parseHex(clr.substr(2,2));
                                color.b = Util.parseHex(clr.substr(4,2));
                                color.a = Util.globalAlpha;
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
            color.a = Util.globalAlpha;
        }
        
        return color;
    }
    
    Util.getCurrentTick = function()
    {
        // in microsecond precision!!
        var tick = Universo.getCurrentTick();
        return tick / 1000;
    }
    
    Util.setTimeout = function(func, delay)
    {
        var extra;
        if (arguments.length > 2)
        {
            extra = new Array;
            var i = 2;
            while (i < arguments.length)
            {
                extra.push(arguments[i]);
                i++;
            }
        }
        
        var t = new Task(func, delay, false, extra);
        return t;
    }
    
    Util.clearTimeout = function(task)
    {
        if (task instanceof Task)
        {
            task.cancel();
        }
    }
    
    Util.setInterval = function(func, interval)
    {
        var extra;
        if (arguments.length > 2)
        {
            extra = new Array;
            var i = 2;
            while (i < arguments.length)
            {
                extra.push(arguments[i]);
                i++;
            }
        }
        
        var t = new Task(func, interval, true, extra);
        return t;
    }
    
    Util.clearInterval = function(task)
    {
        if (task instanceof Task)
        {
            task.cancel();
        }
    }
    
    return exports;

})();