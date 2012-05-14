function skin()
{
    __LOG("function skin() invoked.");
}

(function(){
    var Skin = {};
    
    var refCount = 0;
    
    Skin.test = function()
    {
        refCount++;
        __LOG("haha! Skin.test() #ref count: " + refCount.toString());
    }
    
    return Skin;
    
})();