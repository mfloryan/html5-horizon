var canvas = document.getElementById("horizonCanvas");

var vanishingPoint = {x: canvas.width / 2, y: 20 };

var numOfLines = 10;
var numOfRows = 20;

var grid = [];

for (var row = 0; row < numOfRows; row++) {

    grid[row] = [];

    var y = canvas.height - ((canvas.height - vanishingPoint.y) / numOfRows) * Math.log((row/2) +1) * 8.5;

    for (var col = 0; col < numOfLines; col++) {
        grid[row][col] = {};

        var x = (canvas.width / (numOfLines - 1)) * col;

        grid[row][col].y = y;
        grid[0][col].x = x;

        if (col == 0) {
            grid[row][0].x = (vanishingPoint.x * (canvas.height - y)) / canvas.height;
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
