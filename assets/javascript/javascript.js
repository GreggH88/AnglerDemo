 // put your keys in the header
 var headers = {
  "Content-type": "application/json",
  "app_id": "70b81cdf",
  "app_key": "729f0abb1441490c5d08621adfa12ebc"
};
var payload1 = {
  "image": "https://res.cloudinary.com/demo/image/upload/w_300/golfer.jpg",
  "gallery_name": "project1",
  "subject_id": "Tiger Woods",
};

var payload2 = {
  "image": "https://cdn.movieweb.com/img.news/NE9sBI5eYx3ecc_1_1.jpg",
  "gallery_name": "project1",
  "subject_id": "Ian McKellen",
};

var payload3 = {
  "image": "http://www.femalefirst.co.uk/image-library/square/500/g/george-clooney---wi05-13.jpg",
  "gallery_name": "project1",
  "subject_id": "George Clooney",
};

var payload4 = {
  "image": "http://www.femalefirst.co.uk/image-library/square/500/j/jennifer-lawrence-premiere-image-2.jpg",
  "gallery_name": "project1",
  "subject_id": "Jennifer Lawrence",
};

var payload5 = {
  "image": "https://transtr.files.wordpress.com/2015/04/al-pacino-in-a-500x500.jpg",
  "gallery_name": "project1",
  "subject_id": "Al Pacino",
};

var arr = [payload1, payload2, payload3, payload4, payload5];
console.log(arr.image);


//console.log(arr);
//console.log(arr[0].image);

$(window).load(function (a) {



  // url
  var url = "http://api.kairos.com/enroll";

  for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      $("<img />")
          .attr('src', arr[i].image)
          .attr('id', arr[i].subject_id)
          .width("113px").height("113px")
          .appendTo($("#newDiv"));
        
     //$( "<img />" ).click(function() {
     
       //.appendTo($(".displayImg"))
}

      

      $.ajax(url, {
          headers: headers,
          type: "POST",
          data: JSON.stringify(arr[i]),
          dataType: "text"
      })

  });
  
//});

// $( "#newDiv" ).click(function() {
   //       $("<img />")
 // .attr("src", arr)
//     .appendTo($(".displayImg"))
//   })

$("#imageUploadForm").submit(function (e) {

  $(".newImg").empty();
  e.preventDefault();
  var input = $("#imageUpload")[0];
  var file = input.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
      var imageData = String(reader.result);
      //console.log(imageData);
      var image = new Image(),
              containerWidth = null,
              containerHeight = null;
          image.onload = function () {
              containerWidth = image.width;
              containerHeight = image.height;
          }
          image.src = imageData;
  
      $(".newImg").append(image);
  
      var payload = {
          "image": imageData,
          "gallery_name": "project1",
          "threshold" : 0.000
      };
      //console.log(payload);
      var url = "http://api.kairos.com/recognize";
      // make request
      $.ajax(url, {
          headers: headers,
          type: "POST",
          data: JSON.stringify(payload),
          dataType: "text"
      }).done(function (response) {
          //console.log(JSON.parse(response));
          var obj = JSON.parse(response);
          console.log(obj);
        
          //message if no face detected
          if (obj.Errors != undefined) {
            $("#error").append(obj.Errors["0"].Message)
          } 
        

          //var objConfidence = obj.images[0].transaction.confidence;
          //console.log(objConfidence);
          var objConfidence = obj.images["0"].transaction.confidence;
          //console.log(objConfidence);

          objName = obj.images["0"].transaction.subject_id;
          //objName = arr[i].subject_id;
          console.log(objName);

        //for (var i = 0; i < arr.length; i++) {
              if (objConfidence > 0.600) {
              var percentMatch = objConfidence * 100;
              $("#percent-match").append(percentMatch + "% match to " + objName);
              }
              if (objConfidence < 0.600) {
              $("#percent-match").append("This face is not in the current gallery");