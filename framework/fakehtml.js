const window = {};
const document = {};
const console = {};

window.innerWidth = Universo.getWidth();
window.innerHeight = Universo.getHeight();

document.createElement = function(tag)
{
    if (tag === 'canvas')
    {
        return CanvasBridge.createCanvas();
    }
    else
    {
        throw new NotSupportedError;
    }
}

document.addEventListener = function(type, listener, useCapture)
{
    Events.addEventListener(type, listener, useCapture);
}

window.addEventListener = document.addEventListener;

document.removeEventListener = function(type, listener, useCapture)
{
    Events.removeEventListener(type, listener, useCapture);
}

window.removeEventListener = document.removeEventListener;

console.warn = function(msg)
{
    Debug.log(msg);
}

console.log = function(msg)
{
    Debug.log(msg);
}

window.console = console;

const setTimeout = Util.setTimeout;
const setInterval = Util.setInterval;

window.setTimeout = setTimeout;
window.setInterval = setInterval;

const alert = function(msg)
{
    Debug.log(msg);
}

window.alert = alert;