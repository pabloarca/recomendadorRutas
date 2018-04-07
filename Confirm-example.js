/**
 * Email confirmation function that uses AWS Cognito SDK. 
 * It wraps its API into a promise to better consume it from other parts of 
 * the application.
 */
function confirm(username, code) {
  User = new CognitoUser({
    Username : username,
    Pool: UserPool,
  });
  return new Promise(function(resolve, reject) {
    User.confirmRegistration(code, true, function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  })
}
/**
 * Resend email confirmation code function that uses AWS Cognito SDK. 
 * It wraps its API into a promise to better consume it from other parts of 
 * the application.
 */
function resendConfirmationCode() {
  return new Promise(function(resolve, reject) {
    // The user object was created during the user log in flow, so it should
    // be already defined. If you call this in a different way, you must first
    // instantiate it as a new instance of CognitoUser, passing it the username
    // and the corresponding Cognito User Pool.
    User.resendConfirmationCode(function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}
/**
 * Function to handle the confirm form submit event.
 * It gets the values from the inputs, handles error and success cases, and
 * other UI related actions.
 */
function handleSubmit(event) {
  event.preventDefault();
  var $inputs = $container.getElementsByTagName('input');
  startLoading();
  Cognito.confirm(email, $inputs.code.value)
  .then(function(result) {
    addAlert({
      type: 'success',
      message: 'Email confirmation done. Redirecting',
    })
    setTimeout(redirectToLogin, 3000);
    console.log(result);
  })
  .catch(function(error) {
    stopLoading();
    addAlert({
      type: 'error',
      message: error.message,
    });
    console.log(error);
  })
}
/**
 * Function to handle the resend of the confirm code to the user.
 * It gets the values from the inputs, handles error and success cases, and
 * other UI related actions.
 */
function handelResendCode(event) {
  event.preventDefault();
  Cognito.resendConfirmationCode()
  .then(function(result) {
    addAlert({
      type: 'info',
      message: 'A new confirmation code was sent.'
    });
    console.log(result);
  })
  .catch(function(error) {
    addAlert({
      type: 'error',
      message: error.message,
    });
    console.error(error);
  })
}
