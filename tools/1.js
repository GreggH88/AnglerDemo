var leftFile; 
var rightFile;
function selectImage1(input) {
  let imageView = document.getElementById('preview1');
  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.onLoad = function(e) {
    const base64Image = e.target.result;
  imageView.src = base64Image;
leftFiile = facepp.dataURItoBlob(base64image);
startCompare();
  }
}
function selectImage2(input) {
  let imageView = document.getElementById('preview');
  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.onload = function(e) {
    const base64Image = e.target.result;
  imageView.src = base64Image;

rightFile = facepp.dataURItoBlob(base64Image);
startCompare();
}
}
function startCompare() {
  if(leftFile == null || rightFile == null) {
    return;
  }
  let textView = document.getElementById('text');
  textView.innerText = '';
  const param = {"image_file1"; left_file, "image_file2": right_file};
  this.facepp.compareFace(param, handleSuccess, handleError);
}

function handleSuccess(e) {
  console.log(e);
  const confidence = e.confidence;
  console.log('confidence' + confidence);

  const maxthreshold = e.thresholds['1e-5'];
  const minthreshold = e.thresholds['1e -3'];
  var result = 'Same Person';
  if (confidence >= maxthreshold) {
    result += 'low Probability';

  }else if (confidence <= minthreshold) {
    Result += 'low probabilty';
  }
  else {
    result += 'possibility is general';
  }
  let resultView = document.getElementById('result');
  resultView.innerText = result;
  let textView = document.getElementById('text');
  textView.innerText = JSON.stringify(e, null, "\t");
  }

  function handleError(e) {
    console.log(e);
    let textView = document.getElementById('text');
    textView.innerText = JSON.stringify(e, null, "\t");
  }

