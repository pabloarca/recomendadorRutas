(function(win){
  var events = {};

  function on(event, listener) {
    if (typeof events[event] !== 'object') {
      events[event] = [];
    }
    events[event].push(listener);
  }

  function off(event, listener) {
    if (typeof events[event] === 'object') {
      var idx = events[event].indexOf(listener)
      if (idx > -1) {
        events[event].splice(idx, 1)
      }
    }
  }

  function emit() {
    var args = Array.prototype.slice.call(arguments);
    var event = args[0]
    if (typeof events[event] === 'object') {
      events[event].map(function (listener) {
        listener.apply(null, args.slice(1))
      })
    }
  }

  function once(event, listener) {
    function autoRemoveListener() {
      var args = Array.prototype.slice.call(arguments);
      off(event, autoRemoveListener)
      listener.apply(null, args)
    }
    on(event, autoRemoveListener)
  }

  win.EventEmitter = Object.freeze({
    on: on,
    off: off,
    emit: emit,
    once: once,
    events: events,
  })
})(window)


(function(win){
  // Simple JavaScript Templating
  // John Resig - https://johnresig.com/ - MIT Licensed
  // https://johnresig.com/blog/javascript-micro-templating/
  //
  // There are some minor modification done by me.
  var cache = {};
   
  function tmpl(str, data){
    var fn;
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    if (!/\W/.test(str)) {
      fn = cache[str] = cache[str] || tmpl(
        document.getElementById(str).innerHTML
      )
    } else {
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      fn = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" + 
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    }
    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };

  function ready(fn) {
    if (document.attachEvent 
      ? document.readyState === "complete" 
      : document.readyState !== "loading"
    ){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Save as global function
  window.tmpl = tmpl
  window.ready = ready
})(window);
