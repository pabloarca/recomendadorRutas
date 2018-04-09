//all the provided keys are examples, go to Amazon Cognito and get yours

AWSCognito.config.region = 'eu-central-1'; //This is required to derive the endpoint

var poolData = {
    UserPoolId : 'eu-central-1_RJgUcRNLj', // your user pool id here
    ClientId : '7scaq5pcjfe390t9fosolpgl1c' // your client id here
};

var identityPoolId = 'eu-central-1:ed98c61f-23a0-4fbf-9f6e-1f1541bb9a0b'; //go to AWS Cognito Federated Identites

var userAttributes = ['email']; //the standard attributes you require in AWS Cognito

var MFARequired = true; //do you require your clients to use MFA?
