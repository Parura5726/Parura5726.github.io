const canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function cell(x, y) {
    this.x = x;
    this.y = y;
    this.alive = false;
}

var cellSize = 10;
var cells = [];
for (var i = 0; i < canvas.width / cellSize; i++) {
    cells[i] = [];
    for (var j = 0; j < canvas.height / cellSize; j++) {
        cells[i][j] = new cell(i * cellSize, j * cellSize);
    }
}

function draw() {
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            ctx.beginPath();
            if (cells[i][j].alive) ctx.fillStyle = "#ffffff";
            else ctx.fillStyle = "#000000";
            ctx.rect(i * cellSize, j * cellSize, cellSize, cellSize);
            ctx.fill();
            ctx.closePath();
        }
    }
}

var oldCells = [];
var liveCells = 0;
function updateCells() {
    oldCells = cells;
    for (var i = 1; i < canvas.width / cellSize - 1; i++) {
        for (var j = 1; j < canvas.height / cellSize - 1; j++) {
            liveCells = 0
            // top
            if (oldCells[i-1][j-1].alive) liveCells++;
            if (oldCells[i][j-1].alive) liveCells++;
            if (oldCells[i+1][j-1].alive) liveCells++;
            // middle
            if (oldCells[i-1][j].alive) liveCells++;
            if (oldCells[i+1][j].alive) liveCells++;
            // bottom
            if (oldCells[i-1][j+1].alive) liveCells++;
            if (oldCells[i][j+1].alive) liveCells++;
            if (oldCells[i+1][j+1].alive) liveCells++;
            
            //if (liveCells != 0) console.log(liveCells, i, j);
            
            if (liveCells < 3) cells[i][j].alive = false;
            else if (liveCells > 4) cells[i][j].alive = false;
            else cells[i][j].alive = true;
        }
    } 
}

document.addEventListener("click", clickHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function clickHandler(e) {
    var x = Math.floor(e.clientX / 10) - 1;
    var y = Math.floor(e.clientY / 10) - 1;
    cells[x][y].alive = !cells[x][y].alive;
}
function keyUpHandler(e) {
    if (e.key == " ") {
        interval = setInterval(updateCells, 50);
    }
}
function keyDownHandler(e) {
    if (e.key == " ") {
        clearInterval(interval);
    }
}

draw();
var interval = setInterval(updateCells, 50);
setInterval(draw, 100);