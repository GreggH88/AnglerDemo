var facepp = new FACEPP(APIKEY,APISERET,1);
    /*
    // 以图片URL的方式上传图片
    let dic = {'image_url' : 'https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic6.jpg'};
    facepp.detectFace(dic,success,failed);
    */
    // 选择照片
    function selectImage(input){
        let imageView = document.getElementById('preview');
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            //移除之前的人脸框
            $("#facesContainer div").remove();
            //图片的base64数据
            const base64Image = e.target.result;
            //显示图片
            //修复显示方向不对问题
            fixOrientention(base64Image,imageView);
            /*
            //base64方式上传图片
            let dic = {'image_base64' : base64Image};
            facepp.detectFace(dic,success,failed);
            */
            // 以二进制的方式上传图片
            // 将base64转为二进制
            let imageData = facepp.dataURItoBlob(base64Image);
            //根据个人需求填写的参数,这里全部写上了,包括年龄性别等,详情看官方文档
            let attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus';
            //上传图片,获取结果
            let dataDic = {'image_file':imageData,'return_landmark':2,'return_attributes':attributes};
            //调用接口，检测人脸
            facepp.detectFace(dataDic,success,failed);
        }
    }
    //成功的回调
    function success(e){
        //显示结果
        console.log(e);
        let textView = document.getElementById('text');
        textView.innerText = JSON.stringify(e,null,"\t");
        // 画上人脸框,男女颜色不一样
        let imageView = document.getElementById('preview');
        const faces = e.faces;
        for (const index in faces){
            const face = faces[index];
            const face_rectangle = face.face_rectangle;
            //脸部旋转角度
            var roll = face.attributes.headpose.roll_angle;
            //性别
            var gender = face.attributes.gender.value;
            const borderColor = (gender == 'Male') ? 'blue' : 'red';
            console.log('人脸框颜色：' + borderColor);
            //脸部坐标
            var faceX = face_rectangle.left;
            var faceY = face_rectangle.top;
            var faceW = face_rectangle.width;
            var faceH = face_rectangle.height;
            //faceContainer尺寸
            var width = 320;
            var height = 320;
            //img尺寸
            var imageW = imageView.width;
            var imageH = imageView.height;
            //图片实际尺寸
            var naturalWidth = imageView.naturalWidth;
            var naturalHeight = imageView.naturalHeight;
            console.log('container尺寸' + width + '----' +  height);
            console.log('img尺寸' + imageW + '----' + imageH);
            console.log('图片实际尺寸' + naturalWidth + '----' + imageH);
            const scale = imageW / naturalWidth;
            console.log('scale > ' + scale);
            const offsetX = (width - imageW)*0.5;
            const offsetY = (height - imageH)*0.5;
            console.log('offsetX：' + offsetX + 'offsetY' + offsetY);
            //添加人脸框
            $('<div/>').css({
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
    //失败的回调
    function failed(e){
        console.log(e);
        let textView = document.getElementById('text');
        textView.innerText = JSON.stringify(e);
    }
    //图片方向矫正
    function fixOrientention(base64Image,imageView) {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const initSize = image.src.length;
            let width = image.naturalWidth;
            let height = image.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 旋转图片操作
            EXIF.getData(image, function () {
                const orientation = EXIF.getTag(this, 'Orientation');
                console.log(`orientation:${orientation}`);
                switch (orientation) {
                    // 正常状态
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
        image.src = base64Image;
    }
</script>