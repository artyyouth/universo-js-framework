__LOG("Universo start running!");

/* Bootstrap Start */
__LOAD("module.js");
require("consts.js");
require("errors.js");
const Debug = require("debug.js");
const Util = require("util.js");
const Events = require("events.js");
const Task = require("task.js");
/* HTML5 Canvas API support */
const FontCache = require("fontcache.js");
const CanvasBridge = require("bridge.js");
require("fakehtml.js");
const App = require("application.js");
/* Bootstrap Complete */

/* require("tests.js"); */
/* require("typedarraytests.js"); */

Global.main = function()
{
    App.main();
}

Global.slice = function()
{
    App.slice();
}

Global.shutDown = function()
{
    App.shutDown();
}

Global.draw = function()
{
    App.draw();
}

Global.mouseUp = function(e)
{
    App.mouseUp(e);
}

Global.mouseDown = function(e)
{
    App.mouseDown(e);
}

Global.mouseMove = function(e)
{
    App.mouseMove(e);
}

Global.mouseDrag = function(e)
{
    App.mouseDrag(e);
}

Global.mouseWheel = function(e)
{
    App.mouseWheel(e);
}

Global.keyUp = function(e)
{
    App.keyUp(e);
}

Global.keyDown = function(e)
{
    App.keyDown(e);
}

Global.sizeChanged = function(width, height)
{
    App.sizeChanged(width, height);
}

Global.touchBegan = function(e)
{
    App.touchBegan(e);
}

Global.touchMoved = function(e)
{
    App.touchMoved(e);
}

Global.touchEnded = function(e)
{
    App.touchEnded(e);
}