(function() {
    
    function TimerTask(callback, delay, repeat, extra)
    {
        if (typeof callback !== K_TYPE_FUNCTION ||
            typeof delay !== K_TYPE_NUMBER ||
            ((arguments.length > 2) && (typeof repeat !== K_TYPE_BOOLEAN)))
        {
            throw new InvalidParameterError;
        }
        
        delay = Math.floor(delay);
        
        this.callback = callback;
        this.time = Util.getCurrentTick() + delay;
        this.delay = delay;
        if (repeat)
        {
            this.repeat = repeat;
        }
        
        if (extra && (extra instanceof Array))
        {
            this.extra = extra;
        }
        
        TimerTask.scheduleTask(this);
    }
    
    var exports = TimerTask;
    
    TimerTask.prototype.callback = null;
    TimerTask.prototype.time = null;
    TimerTask.prototype.delay = null;
    TimerTask.prototype.repeat = false;
    TimerTask.prototype.canceled = false;
    TimerTask.prototype.extra = null;
    
    TimerTask.prototype.cancel = function()
    {
        this.canceled = true;
        TimerTask.cancelTask(this);
    }
    
    TimerTask.prototype.reset = function()
    {
        if (this.canceled) return;
        
        this.time = Util.getCurrentTick() + this.delay;
        
        TimerTask.scheduleTask(this);
    }
    
    TimerTask.prototype.run = function()
    {
        if (this.canceled) return;
        
        if (this.callback)
        {
            if (this.extra && (this.extra instanceof Array))
            {
                this.callback.apply(undefined, this.extra);
            }
            else
            {
                this.callback();
            }
        }
    }
    
    TimerTask.taskArray = null;
    TimerTask.scheduleTask = function(task)
    {
        if (!TimerTask.taskArray)
        {
            TimerTask.taskArray = new Array;
        }
        
        var tasks = TimerTask.taskArray;
        var taskCount = tasks.length;
        var i = 0;
        
        for (i = 0; i < taskCount; i++)
        {
            if (task.time < tasks[i].time)
            {
                break;
            }
        }
        
        tasks.splice(i, 0, task);
        
        Universo.requestTimerCallback(task.delay / 1000);
    }
    
    TimerTask.cancelTask = function(task)
    {
        if (TimerTask.taskArray)
        {
            var tasks = TimerTask.taskArray;
            var i = tasks.indexOf(task);
            if (i >= 0)
            {
                tasks.splice(i, 1);
            }
        }
    }
    
    TimerTask.runOneTask = function()
    {
        if (TimerTask.taskArray)
        {
            var tasks = TimerTask.taskArray;
            if (tasks.length > 0)
            {
                var t = tasks[0];
                if (t.time - Util.getCurrentTick() <= 0)
                {
                    tasks.shift();
                    t.run();
                    
                    if (t.repeat && !t.canceled)
                    {
                        t.reset();
                    }
                }
            }
        }
    }
    
    return exports;
})();