var canvas = document.getElementById("horizonCanvas");

var vanishingPoint = {x: canvas.width / 2, y: 20 };

var numOfLines = 10;
var numOfRows = 20;

var grid = [];
grid[0] = [];

for (var i = 0; i < numOfLines; i++) {
    var x = (canvas.width / (numOfLines - 1)) * i;
    grid[0][i] = {x:x};
}

for (i = 0; i < numOfRows; i++) {
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
}

var context = canvas.getContext("2d");

context.moveTo(0, 20.5);
context.lineTo(canvas.width, 20.5);

context.strokeStyle = "#000";
context.stroke();

context.beginPath();

for (var i = 0; i < numOfLines; i++) {
    context.moveTo(grid[0][i].x, canvas.height);
    context.lineTo(vanishingPoint.x, vanishingPoint.y);
}
context.stroke();

context.beginPath();
context.strokeStyle = "#888";

for (var i = 0; i < numOfRows; i++) {

    context.moveTo(i * 21, grid[i][0].y);
    context.lineTo(canvas.width - (i * 21), grid[i][0].y);
}
context.stroke();
