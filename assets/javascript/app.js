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
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName;
    $('#authdisabled').removeAttr('disabled');
$("#loginCard").text("You are currently logged in as " + displayName + "!")
  }
})



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
          "app_id"          : "5b6685b7",
          "app_key"         : "0ad64398332e96a02468d3bbf72d6f29"
      };
      var payload = { "image" : imageData , 
                      "gallery_name" : "myGallery", 
                      "subject_id" : "mySubjectID"};
      var url = "https://api.kairos.com/enroll";
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

}());

