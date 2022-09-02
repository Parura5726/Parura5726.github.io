var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000080";
    ctx.fill();
    ctx.closePath();
}

function drawPagman() {
    ctx.beginPath();
    ctx.arc(pagman.x, pagman.y, pagman.size, -pagman.frame / 2 + Math.PI / 2 * pagman.direction, Math.PI + Math.PI / 2 * pagman.direction);
    ctx.arc(pagman.x, pagman.y, pagman.size, pagman.frame / 2 + Math.PI / 2 * pagman.direction, Math.PI + Math.PI / 2 * pagman.direction, true);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.closePath();
}

function drawWalls() {
    ctx.beginPath();
    for (var i = 0; i < walls.length; i++) {
        ctx.rect(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
    }
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawDots() {
    for (var i = 0; i < dots.length; i++) {
        if (dots[i] !== undefined) {
            if (!dots[i].super) {
                ctx.beginPath();
                ctx.arc(dots[i].x, dots[i].y, dotSize, 0, Math.PI * 2);
                ctx.fillStyle = "#FFFF88";
                ctx.fill();
                ctx.closePath();
            }
            else {
                ctx.beginPath();
                ctx.arc(dots[i].x, dots[i].y, dotSize * 2, 0, Math.PI * 2);
                ctx.fillStyle = "#FFFF88";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "40px premier";
    ctx.fillStyle = "#FFFF00";
    ctx.fillText(score, 10, 35);
}

function drawGhosts() {
    ghost.ai();
    if (!pagman.boost) ctx.drawImage(spriteImg, 0, ghost.type * 17, 16, 17, ghost.x, ghost.y, ghostSize, ghostSize);
    else ctx.drawImage(spriteImg, 0, 17, 16, 17, ghost.x, ghost.y, ghostSize, ghostSize);
}