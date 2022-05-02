canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");
var font = new FontFace('premier', 'url(./fonts/Premier2019.ttf)');

var blockSize = 30;
var currentPiece;
var blocks = [];
var cont = true;
var rotation = 0;
var score = 0;
var speeds = [1000, 850, 750, 650,  500,  400,  300,  250,  225,  200,  150,  50];
var scores = [200,  400, 800, 1000, 1500, 2500, 3000, 3500, 4000, 6000, 8000, 10000];
var target = 0;
var hs;
try {eval(document.cookie + ";");}          // Since this is a website and it shouldnt be able harm anything im guessing this is fine
catch {hs = 0};
if (hs == undefined) {
    hs = 0;
    document.cookie = "hs=0";
}

// TODO: make music and sfx, maybe
function main() {
    clearCanvas();
    updatePiece();
    checkRow();
    renderPiece();
    renderBlocks();
}

// Clear the canvas to black
function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
}

function checkRow() {
    var BlocksInRow;
    for (var i = 0; i < canvas.height; i += blockSize) {
        blocksInRow = 0;
        for (var j = 0; j < blocks.length; j++) {
            if (blocks[j].y == i) {
                blocksInRow++;
            }
        }
        if (blocksInRow == canvas.width / blockSize) {
            score += 100;
            for (var j = 0; j < blocks.length; j++) {
                if (blocks[j].y == i) {
                    blocks[j].x = 10 * -blockSize;
                    blocks[j].y = 10.1 * -blockSize;
                }
                else if (blocks[j].y < i) {
                    blocks[j].y += blockSize;
                }
            }
        }
    }
}

function updatePiece() {
    for (var i = 0; i < currentPiece.blocks.length; i++) {          // Check if piece is touching the ground
        if (currentPiece.y + currentPiece.blocks[i].y == canvas.height - blockSize) {
            for (var j = 0; j < currentPiece.blocks.length; j++) {
                currentPiece.blocks[j].x += currentPiece.x;
                currentPiece.blocks[j].y += currentPiece.y;
                blocks[blocks.length] = currentPiece.blocks[j];
            }
            spawnPiece();
            cont = false;
            return;
        }
    }

    for (var i = 0; i < currentPiece.blocks.length; i++) {          // Check if piece is touching blocks
        for (var j = 0; j < blocks.length; j++) {
            if (currentPiece.blocks[i].x + currentPiece.x == blocks[j].x && currentPiece.blocks[i].y + currentPiece.y == blocks[j].y - blockSize) {
                for (var k = 0; k < currentPiece.blocks.length; k++) {
                    currentPiece.blocks[k].x += currentPiece.x;
                    currentPiece.blocks[k].y += currentPiece.y;
                    blocks[blocks.length] = currentPiece.blocks[k];
                }
            // Loss state
            if (currentPiece.y <= blockSize) {
                alert("GAME OVER");
                window.location.reload();
            }

            // Speed the piece updates up based on score
            if (score >= scores[target] && target < 12) {
                target++;
                clearInterval(interval);
                interval = setInterval(main, speeds[target]);
            }

            // Set highscore if needed
            if (score > hs) {
                document.cookie = "hs=" + score;
                hs = score;
            }

            spawnPiece();
            cont = false;
            return;
            }
        }
    }

    // Move the piece downwards
    currentPiece.y += blockSize;
}

// Render the piece
function renderPiece() {
    for(var i = 0; i < currentPiece.blocks.length; i++) {
        var block = currentPiece.blocks[i];
        ctx.beginPath();
        ctx.fillStyle = block.color;
        ctx.rect(currentPiece.x + block.x, currentPiece.y +  block.y, blockSize, blockSize);
        ctx.fill();
        ctx.closePath();
    }

    // Draw the score text
    ctx.font = "25pt premier";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(score, 10, 35);
    ctx.fillText("H:" + hs, 10, 60);
}

// Render the individual blocks
function renderBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = blocks[i].color;
        ctx.rect(blocks[i].x, blocks[i].y, blockSize, blockSize);
        ctx.fill();
        ctx.closePath();
    }
}

// Input handler
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    var canMove = true;
    if (e.key == "ArrowLeft" || e.key == "a") {
        for (var i = 0; i < currentPiece.blocks.length; i++) {
            if (currentPiece.x + currentPiece.blocks[i].x == 0) canMove = false;

            for (var j = 0; j < blocks.length; j++) {
            if (currentPiece.blocks[i].x + currentPiece.x == blocks[j].x + blockSize && currentPiece.blocks[i].y + currentPiece.y == blocks[j].y) {
                canMove = false;
                break;
            }
        }
        }
        if (canMove){
            currentPiece.x -= blockSize;
            clearCanvas();
            renderPiece();
            renderBlocks();
        }
    }

    else if (e.key == "ArrowRight" || e.key == "d") {
        for (var i = 0; i < currentPiece.blocks.length; i++) {
            if (currentPiece.x + currentPiece.blocks[i].x == canvas.width - blockSize) canMove = false;

            for (var j = 0; j < blocks.length; j++) {
            if (currentPiece.blocks[i].x + currentPiece.x == blocks[j].x - blockSize && currentPiece.blocks[i].y + currentPiece.y == blocks[j].y) {
                canMove = false;
                break;
            }
        }
        }
        if (canMove){
            currentPiece.x += blockSize;
            clearCanvas();
            renderPiece();
            renderBlocks();
        }
    }

    else if (e.key == "ArrowDown" || e.key == "s") {
        clearCanvas();
        updatePiece();
        renderPiece();
        renderBlocks();
    }

    else if (e.key == " ") {
        cont = true;
        while (cont) {
            updatePiece();
        }
        clearCanvas();
        renderPiece();
        renderBlocks();
    }

    else if (e.key == "ArrowUp" || e.key == "w") {
        clearCanvas();
        if (rotation < 3) rotation++;
        else rotation = 0;
        piece.rotate(currentPiece, rotation, currentPiece.type)
        renderPiece();
        renderBlocks();
    }

}

// I know that making a function for a single line of code is stupid but I cant be bothered to rewrite all calls to it so thats a TODO there
function spawnPiece() {
    currentPiece = new piece(canvas.width / 2 - blockSize, 0, Math.floor(Math.random() * 7), 0);
    rotation = 0;
}

spawnPiece();
main();
var interval = setInterval(main, 2000);
