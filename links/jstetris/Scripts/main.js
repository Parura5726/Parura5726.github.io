canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");
var font = new FontFace('premier', 'url(./fonts/Premier2019.ttf)');

var blockSize = 30;
var currentPiece;
var projectedPiece;
var blocks = [];
var cont = true;
var rotation = 0;
var score = 0;
var speeds = [1000, 850, 750, 650,  500,  400,  300,  250,  225,  200,  150,  50];
var scores = [200,  400, 800, 1000, 1500, 2500, 3000, 3500, 4000, 6000, 8000, 10000];
var target = 0;
var hs;
var lastMove = Date.now();
try {eval(document.cookie + ";");}          // Since this is a website and it shouldnt be able harm anything im guessing this is fine
catch {hs = 0};
if (hs == undefined) {
    hs = 0;
    document.cookie = "hs=0";
}

// TODO: fix random cookie clearing
// TODO: create other timer than setInterval
// TODO: make music and sfx, maybe
function main() {
    clearCanvas();
    updatePiece();
    projectPiece();
    renderPiece();
    renderBlocks();
}

function projectPiece() {
    projectedPiece = currentPiece;
    var x = currentPiece.x;             // This is so stupid that it generates its own gravitational field
    var y = currentPiece.y;
    cont = true;

    while (cont) {
        projectedPiece.y += blockSize;
        for (var i = 0; i < projectedPiece.blocks.length; i++) {          // Check if piece is touching the ground
            if (projectedPiece.y + projectedPiece.blocks[i].y == canvas.height - blockSize) {
                cont = false;
            }

            for (var j = 0; j < blocks.length; j++) {                     // Check if piece is touching blocks
                if (projectedPiece.blocks[i].x + projectedPiece.x == blocks[j].x && projectedPiece.blocks[i].y + projectedPiece.y == blocks[j].y - blockSize) {
                    cont = false
                }
            }
        }
    }

    ctx.fillStyle = "#AAAAAA";
    for (var i = 0; i < projectedPiece.blocks.length; i++) {
        ctx.beginPath();
        ctx.rect(projectedPiece.blocks[i].x + projectedPiece.x, projectedPiece.blocks[i].y + projectedPiece.y, blockSize, blockSize)
        ctx.fill();
        ctx.closePath();
    }

    currentPiece.x = x;
    currentPiece.y = y;
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
    // Set highscore if needed
    if (score > hs) {
        document.cookie = "hs=" + score;
        hs = score;
    }
    // Speed the piece updates up based on score
    if (score >= scores[target] && target < 12) {
        target++;
        clearInterval(interval);
        interval = setInterval(main, speeds[target]);
    }
}

function updatePiece() {
    cont = true;
    for (var i = 0; i < currentPiece.blocks.length; i++) {          // Check if piece is touching the ground
        if (currentPiece.y + currentPiece.blocks[i].y == canvas.height - blockSize) {
            for (var j = 0; j < currentPiece.blocks.length; j++) {
                currentPiece.blocks[j].x += currentPiece.x;
                currentPiece.blocks[j].y += currentPiece.y;
                blocks[blocks.length] = currentPiece.blocks[j];
            }
            spawnPiece();
            cont = false;
            checkRow();
            return;
        }
    }

    for (var i = 0; i < currentPiece.blocks.length; i++) {          // Check if piece is touching blocks
        for (var j = 0; j < blocks.length; j++) {
            if (currentPiece.blocks[i].x + currentPiece.x == blocks[j].x && currentPiece.blocks[i].y + currentPiece.y == blocks[j].y - blockSize
            && Date.now() - lastMove > 100) {                          // Coyote time
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
                spawnPiece();
                cont = false;
                checkRow();
                return;
            }
        }
    }

    if (Date.now() - lastMove < 100) return;
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
        lastMove = Date.now();
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
            projectPiece();
            renderPiece();
            renderBlocks();
        }
    }

    else if (e.key == "ArrowRight" || e.key == "d") {
        lastMove = Date.now();
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
            projectPiece();
            renderPiece();
            renderBlocks();
        }
    }

    else if (e.key == "ArrowDown" || e.key == "s") {
        clearCanvas();
        updatePiece();
        projectPiece();
        renderPiece();
        renderBlocks();
    }

    else if (e.key == " ") {
        cont = true;
        while (cont) {
            updatePiece();
        }
        clearCanvas();
        projectPiece();
        renderPiece();
        renderBlocks();
    }

    else if (e.key == "ArrowUp" || e.key == "w") {
        lastMove = Date.now();
        clearCanvas();
        if (rotation < 3) rotation++;
        else rotation = 0;
        piece.rotate(currentPiece, rotation, currentPiece.type)
        projectPiece();
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
var interval = setInterval(main, 2000, 1);
