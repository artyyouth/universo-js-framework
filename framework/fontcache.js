(function() {
    
    var FontCache = {};
    
    var exports = FontCache;
    
    function log(msg)
    {
        Debug.log(KS_FONT, msg);
    }
    
    FontCache.size = 0;
    FontCache.fonts = null;
    FontCache.rawFonts = null;
    
    FontCache.init = function()
    {
        if (!FontCache.fonts)
        {
            FontCache.fonts = new Array;
            FontCache.rawFonts = new Array;
        }
        FontCache.refresh();
    }
    
    FontCache.refresh = function()
    {
        FontCache.size = Font.getFontCount();
        log("Font count: " + FontCache.size);
        
        FontCache.fonts = new Array();
        FontCache.rawFonts = new Array();
        var name;
        for (var i = 0; i < FontCache.size; i++)
        {
            name = Font.getFontName(i);
            FontCache.rawFonts.push(name);
            FontCache.fonts.push(name.toLowerCase());
            log("Font[" + i + "]: " + name);
        }
    }
    
    FontCache.hasFont = function(fontName)
    {
        if (typeof fontName !== K_TYPE_STRING)
            throw new InvalidParameterError("Font name should be string.");
            
        var id = FontCache.fonts.indexOf(fontName.toLowerCase());
        if (id >= 0)
        {
            return id;
        }
        
        return false;
    }
    
    FontCache.getFont = function(fontName, size)
    {
        if ((typeof size !== K_TYPE_NUMBER) || (size <= 0))
            throw new InvalidParameterError("Font size should be number.");
        
        log("Get font: " + fontName + " size: " + size);
        var fontId = FontCache.hasFont(fontName);
        if (fontId === false) return FontCache.getDefaultFont(size);
        
        fontName = FontCache.rawFonts[fontId];
        return new Font(fontName, size);
    }
    
    FontCache.getDefaultFont = function(size)
    {
        var fontSize = 12;
        if ((typeof size === K_TYPE_NUMBER) && (size > 0))
        {
            fontSize = size;
        }
        log("Get default font, size = " + fontSize);
        return new Font("Arial", fontSize);
    }
    
    return exports;
    
})();