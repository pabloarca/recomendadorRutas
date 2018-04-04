(function(EventEmitter, tmpl){
  /* LoginForm */
  var $root = document.getElementById('root'), 
    $container = document.createElement('div');

  EventEmitter.on('LoginForm:mount', function() {
    $container.innerHTML = tmpl('LoginForm', {})
    $root.appendChild($container)
  })

  EventEmitter.on('LoginForm:unmount', function() {
    $container.remove()
  })
})(window.EventEmitter, window.tmpl)
