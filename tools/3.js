$(window).load(function (a) { 
$("#imageUploadForm").submit(function(e) {
  $(".newImg").empty();
  e.preventDefault();
  var input = $("#imageUpload")[0];
  var file = imput.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    var imageData = String(reader.result);
    var image = new Image(),
      containerWidth = null,
      containerHeight = image.Height;
    }
    image.src = imageData;
    console.log(imageData);
    var payload = {
      "image": imageData,
      "gallery_name": "project1",
    };
    console.log(payload);
    var url = "http://api.kairos.com/recognize";
    $.ajax(url, {
    headers: headers,
    type: "POST",
    data: JSON.stringify(payload),
    dataType: "text"
    }).then(function (response) {
    console.log(JSON.parse(response));
    $(".newImg").append(image);
  
    });
  });
));

