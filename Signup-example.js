/**
 * Signup function that uses AWS Cognito SDK. It wraps its API into a promise
 * to consume it easily from other parts of the app. 
 */
function signUp(email, password) {
  var attributes = [new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  })]
  return new Promise(function(resolve, reject) {
    UserPool.signUp(
      email,
      password,
      attributes,
      null,
      function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        User = result.user;
        resolve(User);
        return;
      }
    )
  });
}
/**
 * Function to handle the form submit event.
 * It gets the values from the inputs, handles error and success cases, and
 * other UI related actions.
 */
function handleSubmit(event) {
  event.preventDefault()
  // Get all form inputs.
  var $inputs = $container.getElementsByTagName('input');
  // Check if password and password confirmation values match.
  if ($inputs.password.value !== $inputs.repeatPassword.value) {
    // Alert the user of the password mismatch.
    addAlert({
      type: 'error',
      message: 'Passwords do not match.',
    })
    return;
  }
  // Modify the status of the submit button.
  startLoading()
  // Call the signup function on Cognito's object.
  Cognito.signUp($inputs.email.value, $inputs.password.value)
  .then(function(result) {
    // Restore the submit button.
    stopLoading()
    // Alert the user that the account was successfully created.
    addAlert({
      type: 'success',
      message: 'Usuario creado correctamente.',
    })
  })
  .catch(function(error) {
    // Restore the submit button.
    stopLoading()
    // Alert the user that some values were incorrect.
    addAlert({
      type: 'error',
      message: error.message,
    })
  })
}
