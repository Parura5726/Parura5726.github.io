// Manually set coordinates of every wall, organized into neat rectangles.
var wallsXList = [40, 140, 260, 320, 440,
                40, 140, 200, 380, 440,
                0, 160, 260, 320, 440,
                140, 200, 380,
                40, 140, 260, 320, 440,
                0, 80, 200, 380, 500,
                40, 140, 260, 440, 320];
var wallsYList = [40, 40 , 0, 40, 40,
                120, 120, 120, 120, 120, 
                180, 180, 140, 180, 180,
                300, 360, 300,
                420, 420, 380, 420, 420,
                480, 440, 480, 440, 480,
                540, 480, 500, 480, 540];
var wallsWList = [60, 80, 20, 80, 60,
                60, 20, 140, 20, 60,
                100, 60, 20, 60, 100,
                20, 140, 20,
                60, 80, 20, 80, 60,
                40, 20, 140, 20, 40,
                180, 20, 20, 20, 180];
var wallsHList = [40, 40, 80, 40, 40,
                20, 140, 20, 140, 20,
                200, 20, 60, 20, 200,
                80, 20, 80,
                20, 20, 60, 20, 20,
                20, 60, 20, 60, 20,
                20, 60, 60, 60, 20];

var score = 0;

var font = new FontFace('premier', 'url(./fonts/Premier2019.ttf)');

var walls = [];
function spawnWalls() {
    for (var i = 0; i < wallsXList.length; i++) {
        walls[i] = new wall(wallsXList[i], wallsYList[i], wallsWList[i], wallsHList[i]);
    }
}

var pagman = {x : 30, y : 20, size : 15, frame : 0, direction : 4, speed : 5, boost : false};
var pagmanOrigin = {x : pagman.x - pagman.size, y : pagman.y - pagman.size};

// This is stupid but it works  ¯\_(ツ)_/¯
function clearBoost() {
    pagman.boost = false;
    if (ghostSpeed < 0) ghostSpeed = -ghostSpeed;
    pagman.speed = 5;
}

var dotSize = 5;
var dots = [];
var dotIndex = 0;
function spawnDots() {
    for (var ix = 20; ix < 540; ix += 20) {
        for (var iy = 20; iy < 600; iy += 20) {
            dots[dotIndex] = new dot(ix, iy);
            
            // The dots have been spawned at every position now, this checks whether they collide with any walls and removes those
            for (var j = 0; j < walls.length; j++) {
                if (dots[dotIndex].x <= walls[j].x + walls[j].w &&
                    dots[dotIndex].x + dotSize >= walls[j].x &&
                    dots[dotIndex].y <= walls[j].y + walls[j].h &&
                    dots[dotIndex].y + dotSize >= walls[j].y) {
                        dots.splice(dotIndex, 1)
                        dotIndex--;
                }
            }
            dotIndex++;
        }
    }
}    

function wall(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

function dot(x, y) {
    this.x = x;
    this.y = y;
    if (Math.random() < 0.02) {
        this.super = true;
    }
    else this.super = false;
}

spriteImg = new Image();
spriteImg.src = 'assets/ghosts.png';

var ghostStartPos = { x: 260, y: 260 };
var ghostSize = 30;
var ghostSpeed = 0.3;
// This is an artifact from an older attempt but I cant be bothered to change it
function ghostPrototype(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.ai = function movementAI() {
        ghostCollide()
        var distance = new Vector2(this.x - pagmanOrigin.x, this.y - pagmanOrigin.y);
        this.x -= (distance.x / distance.m) / ghostSpeed;
        this.y -= (distance.y / distance.m) / ghostSpeed;
    };
}

function spawnGhost() {
    ghost = new ghostPrototype(ghostStartPos.x, ghostStartPos.y, 0);
}
spawnGhost();

function Vector2(x, y) {
    this.x = x;
    this.y = y;
    this.m = Math.sqrt(x*x + y*y);
}