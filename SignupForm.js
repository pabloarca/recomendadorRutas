(function(EventEmitter, tmpl) {

  var $root = document.getElementById('root'), 
    $container = document.createElement('div'),
    $loginLink;

  function handleLoginLink(event) {
    event.preventDefault();
    EventEmitter.emit('SignupForm:unmount')
    EventEmitter.emit('LoginForm:mount')
  }

  EventEmitter.on('SignupForm:mount', function() {
    $container.innerHTML = tmpl('SignupForm', {})
    $loginLink = $container.getElementsByClassName('Control__link')[0]
    $loginLink.addEventListener('click', handleLoginLink)
    $root.appendChild($container)
  })

  EventEmitter.on('SignupForm:unmount', function() {
    $loginLink.removeEventListener('click', handleLoginLink)
    $container.remove()
  })

})(window.EventEmitter, window.tmpl)
