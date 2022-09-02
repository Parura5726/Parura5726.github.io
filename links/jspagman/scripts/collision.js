function wallCollide() {
    for (var i = walls.length - 1; i >= 0; i--) {
        if (pagmanOrigin.x < walls[i].x + walls[i].w &&
            pagmanOrigin.x + pagman.size * 2 > walls[i].x &&
            pagmanOrigin.y < walls[i].y + walls[i].h &&
            pagman.size * 2 + pagmanOrigin.y > walls[i].y) {

            if (pagman.direction == 3 && pagman.y > pagman.size) pagman.y += pagman.speed;
            else if (pagman.direction == 4 && pagman.x < canvas.width - pagman.size) pagman.x -= pagman.speed;
            else if (pagman.direction == 1 && pagman.y < canvas.height - pagman.size) pagman.y -= pagman.speed;
            else if (pagman.direction == 2 && pagman.x > pagman.size) pagman.x += pagman.speed;
        }
    }
}

function dotCollide() {
    for (var i = 0; i < dots.length; i++) {
        if (dots[i] != undefined) {
            if (!dots[i].super) {
                if (Math.sqrt(Math.pow(pagman.x - dots[i].x, 2) + Math.pow(pagman.y - dots[i].y, 2)) < pagman.size + dotSize) {
                    dots[i] = undefined;
                    score += 50;
                }
            }
            else {
                if (Math.sqrt(Math.pow(pagman.x - dots[i].x, 2) + Math.pow(pagman.y - dots[i].y, 2)) < pagman.size + dotSize) {
                    dots[i] = undefined;
                    score += 200;
                    if (!pagman.boost) {
                        pagman.boost = true;
                        if (ghostSpeed > 0) ghostSpeed = -ghostSpeed;
                        setTimeout(clearBoost, 3000);
                        pagman.speed = pagman.speed * 2;
                    }
                }
            }
        }
    }
}

function ghostCollide() {
    if (pagmanOrigin.x < ghost.x + ghostSize &&
        pagmanOrigin.x + pagman.size * 2 > ghost.x &&
        pagmanOrigin.y < ghost.y + ghostSize &&
        pagman.size * 2 + pagmanOrigin.y > ghost.y) {
        if (pagman.boost) {
            score += 400;
            ghost = undefined;
            clearBoost();
            clearTimeout(clearBoost);
            spawnGhost();
        }
        else {
            alert("GAME OVER");
            window.location.reload(); 
        }
    }
}