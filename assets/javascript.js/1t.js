Var facepp = new FACEPP(APIKEY, APISERET, 1);
/*
/ / Upload the image as a picture URL
Let dic = {'image_url' : 'https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic6.jpg'};
facepp.detectFace(dic,success,failed);
*/
// choose a photo
Function selectImage(input){
  Let imageView = document.getElementById('preview');
  Const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  Reader.onload = function (e) {
    / / Remove the previous face frame
    $("#facesContainer div").remove();
    //The base64 data of the image
    Const base64Image = e.target.result;
    //display image
    / / Fix the display direction is wrong
    fixOrientention(base64Image, imageView);
    /*
    //base64 way to upload images
    Let dic = {'image_base64' : base64Image};
    facepp.detectFace(dic,success,failed);
    */
    // upload the image in binary mode
    // turn base64 into binary
    Let imageData = facepp.dataURItoBlob(base64Image);
    / / According to the individual needs to fill in the parameters, here are all written, including age and gender, etc., see the official document for details
            Let attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus';
    / / Upload pictures, get results
    Let dataDic = { 'image_file': imageData, 'return_landmark': 2, 'return_attributes': attributes };
    / / Call the interface to detect faces
    facepp.detectFace(dataDic, success, failed);
  }
}
//Successful callback
Function success(e){
  //show result
  Console.log(e);
  Let textView = document.getElementById('text');
  textView.innerText = JSON.stringify(e, null, "\t");
  // Draw a face frame, the color of men and women is different
  Let imageView = document.getElementById('preview');
  Const faces = e.faces;
  For(const index in faces) {
    Const face = faces[index];
    Const face_rectangle = face.face_rectangle;
    //Face rotation angle
    Var roll = face.attributes.headpose.roll_angle;
    //gender
    Var gender = face.attributes.gender.value;
    Const borderColor = (gender == 'Male') ? 'blue' : 'red';
    Console.log('face color: ' + borderColor);
    //face coordinates
    Var faceX = face_rectangle.left;
    Var faceY = face_rectangle.top;
    Var faceW = face_rectangle.width;
    Var faceH = face_rectangle.height;
    //faceContainer size
    Var width = 320;
    Var height = 320;
    //img size
    Var imageW = imageView.width;
    Var imageH = imageView.height;
    //Image actual size
    Var naturalWidth = imageView.naturalWidth;
    Var naturalHeight = imageView.naturalHeight;
    Console.log('container size' + width + '----' + height);
    Console.log('img size' + imageW + '----' + imageH);
    Console.log('Image actual size' + naturalWidth + '----' + imageH);
    Const scale = imageW / naturalWidth;
    Console.log('scale > ' + scale);
    Const offsetX = (width - imageW) * 0.5;
    Const offsetY = (height - imageH) * 0.5;
    Console.log('offsetX:' + offsetX + 'offsetY' + offsetY);
    //Add a face frame
    $('<div/>').css({
      Position: 'absolute',
      Top: faceY * scale + offsetY,
      Left: faceX * scale + offsetX,
      Height: faceH * scale,
      Width: faceW * scale,
      Border: '2px solid ' + borderColor,
      Transform: 'rotate(' + roll + 'deg)'
    }).appendTo($("#facesContainer"));
  }
}
//Failed callback
Function failed(e){
  Console.log(e);
  Let textView = document.getElementById('text');
  textView.innerText = JSON.stringify(e);
}
//Image direction correction
Function fixOrientention(base64Image, imageView) {
  Const image = new Image();
  Image.onload = () => {
    Const canvas = document.createElement('canvas');
    Const initSize = image.src.length;
    Let width = image.naturalWidth;
    Let height = image.naturalHeight;
    Const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // rotate the image operation
    EXIF.getData(image, function () {
      Const orientation = EXIF.getTag(this, 'Orientation');
      Console.log(`orientation:${orientation}`);
      Switch(orientation) {
        // normal status
        Case 1:
        Console.log('rotate 0°');
        Canvas.height = height;
        Canvas.width = width;
        ctx.drawImage(image, 0, 0, width, height);
        Break;
        // Rotate 90 degrees
        Case 6:
        Console.log('rotate 90°');
        Canvas.height = width;
        Canvas.width = height;
        Ctx.rotate(Math.PI / 2);
        Ctx.translate(0, -height);
        ctx.drawImage(image, 0

          case 6:
          console.log('旋转90°');
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(Math.PI / 2);
        ctx.translate(0, -height);
        ctx.drawImage(image, 0, 0, width, height);
        break;

        // rotate 180°
        Case 3:
        Console.log('rotate 180°');
        Canvas.height = height;
        Canvas.width = width;
        Ctx.rotate(Math.PI);
        Ctx.translate(-width, -height);
        ctx.drawImage(image, 0, 0, width, height);
        Break;
        // rotate 270°
        Case 8:
        Console.log('rotate 270°');
        Canvas.height = width;
        Canvas.width = height;
        Ctx.rotate(-Math.PI / 2);
        Ctx.translate(-width, 0);
        ctx.drawImage(image, 0, 0, width, height);
        Break;
        Default:
        Console.log('default rotate 0°');
        Canvas.height = height;
        Canvas.width = width;
        ctx.drawImage(image, 0, 0, width, height);
        Break;
      }
    });
    Var newBase64 = canvas.toDataURL('image/jpeg', 1.0);
    imageView.src = newBase64;
  };
  Image.src = base64Image;
}
          </script >

