$(window).load(function(a) {
  var url = "http://api.kairos.com/enroll";
  for (var i =0; i <arr.length; i++) {
    $("<img />")
      .attr('src', arr[i].image)
      .attr('id', arr[i].subject_id)
      .width("113px").height("133px")
      .appendTo($("#newDiv"));
  
      $.ajax(url, {
        headers: headers,
        type: "POST",
        data: JSON.stringify(arr[i]),
        dataType: "text"
      })
  
      };
      });
  
      $("#imageUploadForm").submit(function(e) {
      $(".newImg").empty();
      e.preventDefault();
      var input =$(#imageUpload")[0];
      var file = input.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        var imageData = String(reader.result);
  
        var image = new Image(),
          containerWidth = null,
          containerHeight = image.height;
        }
        image.src = imageData;
      console.log(imageData);