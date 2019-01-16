var facepp = new facepp(apiKey, apiSecret, 1);

function selectImage(input) {
  let imageView = document.getElementById('preview');
  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.onload = function (e) {
    $("#facesContainer div").remove();
    const base64Image = e.target.result;

    fixOrientaion(base64Image, imageView);
    let imageData = facepp.dataURItoBlob(base64Image);
    let attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus';

    let dataDic = ('image_file': imageData, 'return_landmark': 2, 'return_attributes': attributes
  };
  facepp.detectFace(dataDic, success, failed);
    )
}

function success(e) {
  console.log(e);
  let textView = document.getElementById('text');
  textView = document.getElementByIs('text');
  let imageView = document.getElementById('preview');
  const faces = e.faces
  for (const index in faces) {
    const face = faces[index];
    const face_rectangle = face.face_rectangle;

    var roll = face.attributes.headpose.roll_angle;
    var gender = face.attributes.gender.value;
    const borderColor = (gender == 'Male') ? 'blue' : 'red';
    console.log('gender: ' + borderColor);
    var width = 320;
    var height = 320;

    var imageW = imageView.width;
    var imageH = imageView.height;

    var naturalWidth = imageView.naturalWidth;
    var naturalHeight = imageView.naturalHeight;

    console.log('container尺寸' + width + '----' + height);
    console.log('img尺寸' + imageW + '----' + imageH);
    console.log('图片实际尺寸' + naturalWidth + '----' + imageH);
    const scale = imageW/naturalWidth;
    console.log('scale > ' + scale);
    const offsetX = (width - imageW)*0.5;
    const offset = (height - imageH)*0.5;
    console.log('offsetX：' + offsetX + 'offsetY' + offsetY);
    $('<div>').css({
      position: 'absolute',
                top: faceY * scale + offsetY,
                left: faceX * scale + offsetX,
                height: faceH * scale,
                width: faceW * scale,
                border: '2px solid ' + borderColor,
                transform: 'rotate(' + roll + 'deg)'
            }).appendTo($("#facesContainer"));
          }
        }
        function failed(e) {
          console.log(e);
          let textView =document.getElementById('text');
          textView.innerText = JSON.stringify(e);
        }
        function fixOrientation(base64Image, ImageView) {
          const image = new Image();
          image.onload= () => {
            const canvas =document.createElement('canvas');
            const initSize = image.naturalWidth;
            let width = image.naturalWidth
            let height = canvas.getContext('2d');
            CanvasRenderingContext2D.clearRect(0, 0, canvas.width, canvas.height);
            EXIF.getData(image, function() {
              const orientation = EXIF.getTag(this, 'Orientation');
              console.log('orientation: ${orientation}');
              switch(orientation) {
                case 1:
                        console.log('旋转0°');
                        canvas.height = height;
                        canvas.width = width;
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    // 旋转90度
                    case 6:
                        console.log('旋转90°');
                        canvas.height = width;
                        canvas.width = height;
                        ctx.rotate(Math.PI / 2);
                        ctx.translate(0, -height);
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    // 旋转180°
                    case 3:
                        console.log('旋转180°');
                        canvas.height = height;
                        canvas.width = width;
                        ctx.rotate(Math.PI);
                        ctx.translate(-width, -height);
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    // 旋转270°
                    case 8:
                        console.log('旋转270°');
                        canvas.height = width;
                        canvas.width = height;
                        ctx.rotate(-Math.PI / 2);
                        ctx.translate(-width, 0);
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    default:
                        console.log('default 旋转0°');
                        canvas.height = height;
                        canvas.width = width;
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
              }
              
            });
            var newBase64 = canvas.toDataURL('image/jpeg', 1.0);
            imageView.src = newBase64;
          };
          image.src = newBase64Image;
        }





  }
}
  }
}