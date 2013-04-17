var HorizonVisualisation = function (canvasElement) {

    var canvas = canvasElement;
    var context = canvas.getContext("2d");

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

    var drawGrid = function() {
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

    function drawSquare(col, row, fillStyle) {
        var points = [
            {x:grid[row+1][col].x,y:grid[row+1][col].y},
            {x:grid[row+1][col+1].x,y:grid[row+1][col+1].y},
            {x:grid[row][col+1].x,y:grid[row][col+1].y},
            {x:grid[row][col].x,y:grid[row][col].y}
        ];

        context.beginPath();
        context.fillStyle = fillStyle;
        context.strokeStyle = "#000";

        context.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.lineTo(points[0].x, points[0].y);

        context.fill();
    }

    var Square = function (col) {

        var row = 0;
        var fillStyle = "rgb("+
            Math.floor(Math.random() *256) + ","+
            Math.floor(Math.random() *256) + "," +
            Math.floor(Math.random() *256) + ")";

        var advance = function() {
            row++;
            return row < (numOfRows - 2);
        };

        var draw = function() {
            drawSquare(col, row, fillStyle);
        };

        return {advance: advance, draw: draw};
    };

    var squares = [];

    var start = function() {
        squares.push(new Square(5));
        setTimeout(step, 200);
    };

    var step = function() {
        context.clearRect(0,0,canvas.width, canvas.height);
        drawGrid();

        var newSquares = [];

        for (var i=0; i < squares.length; i++) {
            squares[i].draw();
            if (squares[i].advance()) {
                newSquares.push(squares[i]);
            }
        }
        squares = newSquares;

        var random = Math.floor(Math.random() * numOfLines * 1.5);

        if (random < numOfLines - 1) {
            squares.push(new Square(random));
        }

        setTimeout(step, 200);
    };

    return {start: start};
};

var horizon = new HorizonVisualisation(document.getElementById("horizonCanvas"));
horizon.start();