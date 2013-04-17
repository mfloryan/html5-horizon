var canvas = document.getElementById("horizonCanvas");
var context = canvas.getContext("2d");


context.moveTo(0,20.5);
context.lineTo(canvas.width,20.5);

context.strokeStyle = "#000";
context.stroke();

var coordinates = [];

var numOfLines = 10;

coordinates[0] = [];
for (var i = 0; i < numOfLines; i++) {
    var x = (canvas.width / (numOfLines - 1)) * i;
    coordinates[0][i] = {x:x};
    context.moveTo(x, canvas.height);
    context.lineTo(canvas.width/2, 20);
}
context.stroke();

var numOfRows = 20;

context.beginPath();
context.strokeStyle = "#888";

for (var i = 0; i < numOfRows; i++) {
    var y = canvas.height - ((canvas.height - 20) / numOfRows) * Math.log((i/2) +1) * 8.5;

    if (!coordinates[i]) coordinates[i] = [];
    for (var j = 0; j < numOfLines; j++) {
        if (!coordinates[i][j]) coordinates[i][j] = {y:y};
        else {
            coordinates[i][j].y = y;
        }
        if (j == 0) {
            coordinates[i][j].x = ((canvas.width/2) * (canvas.height - y)) / canvas.height;
        }
    }

    //zmienić X i szerokość

    context.moveTo(i * 21, y);
    context.lineTo(canvas.width - (i * 21), y);
}

//zakolorowane kwadraty

context.stroke();



//context.beginPath();
//context.moveTo(40,40);
//context.lineTo(50,50);
//context.lineTo(50,80);
//context.lineTo(40,80);
//context.lineTo(40,40);
//context.fill();
