function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}


function ingreso(){

  var email2 = document.getElementById('email2').value;
  var contrasena = document.getElementById('contrasena').value;


  firebase.auth().createUserWithEmailAndPassword(email2, contrasena)

  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});

}


function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log('existe usuario activo')
      aparece();
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log('no existe usuario activo')
    // ...
  }
});
}

//ejecutamos autmanticamente el observador
observador();

function aparece(){
  var contenido = document.getElementById('contenido');
  contenido.innerHTML = "solo lo ve usuario activo";

}
