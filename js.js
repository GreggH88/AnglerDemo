(function () {
  // $('#authdisabled').attr('disabled','disabled');
  // firebase config and initialization
  var config = {
    apiKey: "AIzaSyB5zgm0cMycq5Go4XObni0kGPvFl8EjRAQ",
    authDomain: "angler-c5724.firebaseapp.com",
    databaseURL: "https://angler-c5724.firebaseio.com",
    projectId: "angler-c5724",
    storageBucket: "angler-c5724.appspot.com",
    messagingSenderId: "423460196917"
  };
  firebase.initializeApp(config);
  // firebaseui auth config options
  var uiConfig = {
    signInSuccessUrl: 'https://greggh88.github.io/AnglerDemo/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign('<your-privacy-policy-url>');
    }
  };
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.