canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

var startSnekLength = 5;
var snekLength;
var snekWidth = 10;
var snekHeight = 10;
var speedx = 0;
var speedy = 0;
var direction;
var appleWidth = 10;
var appleHeight = 10;
var gameSpeed = 100;

var apple = {x : 0, y : 0};
var snek = [];

// Reinitialises the snek length and position
function initSnek() {
    snekLength = startSnekLength;
    snek = [];
    direction = 2;
    for (var i = 0; i < snekLength; i++) {
        snek[i] = {x : i * 10, y : 0}
    }
}
initSnek();

// Snek front is snek[0]
// Updates snek position
function updateSnek() {
    for (var i = snekLength; i > 0; i--) {
        var x = snek[i-1].x;
        var y = snek[i-1].y;
        snek[i] = {x : x, y : y};
    }
    if (direction == 0) {
        snek[0].x += 0;
        snek[0].y += -10;
    }
    else if (direction == 1) {
        snek[0].x += 10;
        snek[0].y += 0;
    }
    else if (direction == 2) {
        snek[0].x += 0;
        snek[0].y += 10;
    }
    else if (direction == 3) {
        snek[0].x += -10;
        snek[0].y += 0;
    }
    snekCollision();
}

// Spawn a new apple
function newApple() {
    apple.x = Math.floor(Math.random() * canvas.width / 10) * 10;
    apple.y = Math.floor(Math.random() * canvas.height / 10) * 10;
    for (var i = 0; i < snekLength; i++) {
        if (snek[i].x == apple.x && snek[i].y == apple.y) {
            newApple();
        }
    }
}

// Draw the apple
function drawApple() {
    ctx.beginPath();
    ctx.rect(apple.x, apple.y, appleWidth, appleHeight);
    ctx.fillStyle = "#CC0000";
    ctx.fill();
    ctx.closePath();
}

// Handle the collisions with the walls, the snek and the apple
function snekCollision() {
    if (snek[0].x < 0 || snek[0].x > canvas.width - 10 || snek[0].y < 0 || snek[0].y > canvas.height - 10) {
        alert("GAME OVER");
        newApple();
        initSnek();
    }
    for(var i = 1; i < snekLength; i++) {
        if(snek[i].x == snek[0].x && snek[i].y == snek[0].y) {
            alert("GAME OVER");
            newApple();
            initSnek();
        }
    }
    if (snek[0].x == apple.x && snek[0].y == apple.y) {
        snekLength += 1;
        newApple();
    }
}

// Draws the snek
function drawSnek() {
    // Draw head (slightly darker)
    ctx.beginPath();
    ctx.rect(snek[0].x, snek[0].y, snekWidth, snekHeight);
    ctx.fillStyle = "#004444"
    ctx.fill();
    ctx.closePath();

    // Draw body
    for (var i = 1; i < snekLength; i++) {
        ctx.beginPath();
        ctx.rect(snek[i].x, snek[i].y, snekWidth, snekHeight);
        ctx.fillStyle = "#00CCCC"
        ctx.fill();
        ctx.closePath();
    }
}

// Draw the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + (snekLength - 5), 8, 20);
}

// Draws everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnek();
    drawSnek();
    drawApple();
    drawScore();
}

// Input handler
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {

    // Movement
    if((e.key == "ArrowUp" || e.key == "w") && direction != 2) {
        direction = 0;
    } 
    else if((e.key == "ArrowRight" || e.key == "d") && direction != 3) {
        direction = 1;
    } 
    else if((e.key == "ArrowDown" || e.key == "s") && direction != 0) {
        direction = 2;
    } 
    else if((e.key == "ArrowLeft" || e.key == "a") && direction != 1) {
        direction = 3;
    }

    // Pausing
    if(e.key == "Escape") {
        alert("PAUSE: press ESC, Enter or OK to resume.");
    }
}

newApple();
// Calls draw every 100 ms
setInterval(draw, gameSpeed);