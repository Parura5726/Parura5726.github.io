// Main function.
function draw() {
    wallCollide();
    clearCanvas();
    updatePagman();
    dotCollide();
    wallCollide();
    drawWalls();
    drawDots();
    drawPagman();
    drawGhosts();
    drawScore();
}

// Pacman movement
function updatePagman() {
    pagman.frame += 1;
    if (pagman.frame >= 3) {
        pagman.frame = 0;
    }

    if (pagman.direction == 3 && pagman.y > pagman.size) pagman.y -= pagman.speed;
    else if (pagman.direction == 4 && pagman.x < canvas.width - pagman.size) pagman.x += pagman.speed;
    else if (pagman.direction == 1 && pagman.y < canvas.height - pagman.size) pagman.y += pagman.speed;
    else if (pagman.direction == 2 && pagman.x > pagman.size) pagman.x -= pagman.speed;

    pagmanOrigin.x = pagman.x - pagman.size;
    pagmanOrigin.y = pagman.y - pagman.size;
}

// Input management
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.key == "ArrowUp") pagman.direction = 3;
    else if(e.key == "ArrowRight") pagman.direction = 4;
    else if(e.key == "ArrowDown") pagman.direction = 1;
    else if(e.key == "ArrowLeft") pagman.direction = 2;
}

spawnWalls();
spawnDots();