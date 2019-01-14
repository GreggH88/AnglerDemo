$('#authdisabled').attr('disabled','disabled');

var config = {
  apiKey: "AIzaSyB5zgm0cMycq5Go4XObni0kGPvFl8EjRAQ",
  authDomain: "angler-c5724.firebaseapp.com",
  databaseURL: "https://angler-c5724.firebaseio.com",
  projectId: "angler-c5724",
  storageBucket: "angler-c5724.appspot.com",
  messagingSenderId: "423460196917"
};
firebase.initializeApp(config);

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
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     document.body.innerHTML=
//   }
// })

$("#imageUploadForm").submit(function(e) {
  e.preventDefault();
  var input = $("#imageUpload")[0];
  var file = input.files[0];
  var reader  = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
      var imageData = String(reader.result);
      // put your keys in the header
      var headers = {
          "Content-type"    : "application/json",
          "app_id"          : "7d63bc1e",
          "app_key"         : "d3fa34ac9965ddd79fc3202444189f31"
      };
      var payload = { "image" : imageData , 
                      "gallery_name" : "myGallery", 
                      "subject_id" : "mySubjectID"};
      var url = "http://api.kairos.com/enroll";
      // make request
      $.ajax(url, {
          headers  : headers,
          type: "POST",
          data: JSON.stringify(payload),
          dataType: "text"
      }).done(function(response){
          console.log(JSON.parse(response));
      });
  };
});