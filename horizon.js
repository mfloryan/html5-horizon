var HorizonVisualisation = function (canvasElement) {

    var canvas = canvasElement;

    var vanishingPoint = {x: canvas.width / 2, y: 20.5 };

    var numOfLines = 10;
    var numOfRows = 20;

    var grid = [];

    for (var row = 0; row < numOfRows; row++) {

        grid[row] = [];

        var y = canvas.height - ((canvas.height - vanishingPoint.y) / numOfRows) * Math.log((row/2) +1) * 8.5;
        var totalY = canvas.height - vanishingPoint.y;

        for (var col = 0; col < numOfLines; col++) {
            grid[row][col] = {y: y};

            var firstRow = grid[0][col];
            if (row == 0) {
                firstRow.x = (canvas.width / (numOfLines - 1)) * col;
            } else {
                var dy = firstRow.y - y;
                var totalX = vanishingPoint.x - firstRow.x;
                grid[row][col].x = firstRow.x + ((totalX * dy) / (totalY));
            }
        }
    }

    var drawGrid = function(context) {
        context.moveTo(0, vanishingPoint.y);
        context.lineTo(canvas.width, vanishingPoint.y);

        context.strokeStyle = "#000";
        context.stroke();

        context.beginPath();

        for (var i = 0; i < numOfLines; i++) {
            context.moveTo(grid[0][i].x, grid[0][i].y);
            context.lineTo(vanishingPoint.x, vanishingPoint.y);
        }
        context.stroke();

        context.beginPath();
        context.strokeStyle = "#888";

        for (var i = 0; i < numOfRows; i++) {
            context.moveTo(grid[i][0].x, grid[i][0].y);
            context.lineTo(grid[i][numOfLines - 1].x, grid[i][0].y);
        }
        context.stroke();
    }

    var start = function() {
        drawGrid(canvas.getContext("2d"));
    };

    return {start: start};
};

var horizon = new HorizonVisualisation(document.getElementById("horizonCanvas"));
horizon.start();