const K_MODULE_CACHE_ID = "module_cache";
const Global = this;

const K_MODULE_LOADING_STACK = new Array();

Global.require = function(path)
{
    var moduleCache = Universo.retrieveObject(K_MODULE_CACHE_ID);
    if (typeof moduleCache === 'undefined' || !moduleCache)
    {
        moduleCache = {};
        Universo.persistObject(K_MODULE_CACHE_ID, moduleCache);
    }
    
    if (typeof moduleCache[path] === 'undefined')
    {
        if (K_MODULE_LOADING_STACK.indexOf(path) >= 0)
        {
            throw new Error("Recursive loading the [" + path + "]!");
        }
        
        K_MODULE_LOADING_STACK.push(path);
        var ret = __LOAD(path);
        K_MODULE_LOADING_STACK.pop();
        if (typeof ret === 'undefined')
        {
            moduleCache[path] = null;
        }
        else
        {
            moduleCache[path] = ret;
        }
    }
    
    return moduleCache[path];
}