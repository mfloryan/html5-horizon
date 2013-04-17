var canvas = document.getElementById("horizonCanvas");
var context = canvas.getContext("2d");

var grid = [];

var vanishingPoint = {x: canvas.width / 2, y: 20 };

context.moveTo(0, 20.5);
context.lineTo(canvas.width, 20.5);

context.strokeStyle = "#000";
context.stroke();

var numOfLines = 10;
var numOfRows = 20;

grid[0] = [];

for (var i = 0; i < numOfLines; i++) {
    var x = (canvas.width / (numOfLines - 1)) * i;
    grid[0][i] = {x:x};
    context.moveTo(x, canvas.height);
    context.lineTo(vanishingPoint.x, vanishingPoint.y);
}
context.stroke();

context.beginPath();
context.strokeStyle = "#888";

for (var i = 0; i < numOfRows; i++) {
    var y = canvas.height - ((canvas.height - vanishingPoint.y) / numOfRows) * Math.log((i/2) +1) * 8.5;

    if (!grid[i]) grid[i] = [];
    for (var j = 0; j < numOfLines; j++) {
        if (!grid[i][j]) grid[i][j] = {y:y};
        else {
            grid[i][j].y = y;
        }
        if (j == 0) {
            grid[i][j].x = ((canvas.width/2) * (canvas.height - y)) / canvas.height;
        }
    }

    //zmienić X i szerokość

    context.moveTo(i * 21, y);
    context.lineTo(canvas.width - (i * 21), y);
}

//zakolorowane kwadraty

context.stroke();
