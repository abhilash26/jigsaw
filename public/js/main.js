
let video = document.createElement("video");
let canvasElement = document.getElementById("canvas");
let canvas = canvasElement.getContext("2d");
let detect = document.getElementById("detect");
let QRMessage = document.getElementById("QRMessage");
let buttonNew = document.getElementById('new');

let messageShow = false;

navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } }) // TO get rear camera
  .then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(draw);
  });


function draw(){

    if(messageShow) {
        requestAnimationFrame(draw);
        return;
    } else {
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        let imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
        );
        let QR = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
        });

        if (QR) {
        detect.innerText = "QR Code detected";
        drawBoundingBox([
            QR.location.topLeftCorner,
            QR.location.topRightCorner,
            QR.location.bottomRightCorner,
            QR.location.bottomLeftCorner
        ]);
        QRMessage.innerText = QR.data;
        messageShow = true;
        QRMessage.hidden = false;
        } else {
        detect.innerText = "No QR detected";
        QRMessage.hidden = true;
        }
        requestAnimationFrame(draw);
    }

}


function drawBoundingBox(points){
    points.push(points[0]);
    canvas.strokeStyle = "green";
    canvas.lineWidth = 4;
    canvas.beginPath();
    for (let index = 0; index < points.length -1 ; index++) {
        const point1 = points[index];
        const point2 = points[index+1];
        canvas.moveTo(point1.x, point1.y);
        canvas.lineTo(point2.x, point2.y);
    }
    canvas.stroke();
}


buttonNew.addEventListener('click', function(){
    messageShow = false;
});