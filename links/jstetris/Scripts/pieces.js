// Template for a single block
function block(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

// Template for a piece
class piece {
    type = 0;
    constructor(x, y, type, rotation) {
        this.x = x;
        this.y = y;
        this.blocks = [];
        this.rotation = rotation;
        this.type = type;

        piece.rotate(this, 0, type);
    }

    // Update rotation
    // A rotation increase is rotating left by 90deg
    // This could have been done in a so much cleaner way but idc
    static rotate(piece, rotation, type) {
    switch (type) {      // This is a transgression against the laws of indentation but indenting it correctly is a pain and mostly useless
        case 0:                                     // Line
            var color = "#0000FF";                  // Second block is center
            if (rotation % 2 == 0) {
                piece.blocks = [new block(-blockSize, 0, color), new block(0, 0, color), new block(blockSize, 0, color), new block(2 * blockSize, 0, color)];
            }
            else {
                 piece.blocks = [new block(0, -blockSize, color), new block(0, 0, color), new block(0, blockSize, color), new block(0, 2 * blockSize, color)];
            }
            break;

        case 1:                                     // T
            var color = "#6666FF";                  // middle of the bar is center
            switch (rotation) {
                case 0:
                    piece.blocks = [new block(-blockSize, 0, color), new block(0, blockSize, color), new block(0, 0, color), new block(blockSize, 0, color)];
                    break;
                case 1:
                    piece.blocks = [new block(-blockSize, 0, color), new block(0, blockSize, color), new block(0, 0, color), new block(0, -blockSize, color)];
                    break;
                case 2:
                    piece.blocks = [new block(-blockSize, 0, color), new block(0, -blockSize, color), new block(0, 0, color), new block(blockSize, 0, color)];
                    break;
                 case 3:
                    piece.blocks = [new block(0, blockSize, color), new block(0, 0, color), new block(0, -blockSize, color), new block(blockSize, 0, color)];
                    break;
            }
            break;

        case 2:                                     // z
            var color = "#CCFF00";                  // middle is the top/right center piece
            if (rotation % 2 == 0) {
                piece.blocks = [new block(-blockSize, 0, color), new block(0, 0, color), new block(0, blockSize, color), new block(blockSize, blockSize, color)];
            }
            else {
                piece.blocks = [new block(-blockSize, 0, color), new block(-blockSize, blockSize, color), new block(0, -blockSize, color), new block(0, 0, color)];

            }
            break;

        case 3:                                     // s
            var color = "#FF0000";                  // middle is same as on z
            if (rotation % 2 == 0) {
                piece.blocks = [new block(-blockSize, blockSize, color), new block(0, 0, color), new block(0, blockSize, color), new block(blockSize, 0, color)];
            }
            else {
                piece.blocks = [new block(-blockSize, -blockSize, color), new block(-blockSize, 0, color), new block(0, 0, color), new block(0, blockSize, color)];
            }
            break;

        case 4:                                     // L
            var color = "#FF00CC";                  // center at middle of long bar
            switch (rotation) {
                case 0:
                    piece.blocks = [new block(0, -blockSize, color), new block(0, 0, color), new block(0, blockSize, color), new block(blockSize, blockSize, color)];
                    break;
                case 1:
                    piece.blocks = [new block(-blockSize, 0, color), new block(0, 0, color), new block(blockSize, 0, color), new block(blockSize, -blockSize, color)];
                    break;
                case 2:
                    piece.blocks = [new block(-blockSize, -blockSize, color), new block(0, -blockSize, color), new block(0, 0, color), new block(0, blockSize, color)];
                    break;
                case 3:
                    piece.blocks = [new block(-blockSize, blockSize, color), new block(-blockSize, 0, color), new block(0, 0, color), new block(blockSize, 0, color)];
                    break;
            }
            break;
 
        case 5:                                     // reverse L
            var color = "#00FF00";                  // center same as L
            switch (rotation) {
                case 0:
                    piece.blocks = [new block(0, -blockSize, color), new block(0, 0, color), new block(0, blockSize, color), new block(-blockSize, blockSize, color)];
                    break;
                case 1:
                    piece.blocks = [new block(-blockSize, 0, color), new block(0, 0, color), new block(blockSize, 0, color), new block(blockSize, blockSize, color)];
                    break;
                case 2:
                    piece.blocks = [new block(blockSize, -blockSize, color), new block(0, -blockSize, color), new block(0, 0, color), new block(0, blockSize, color)];
                    break;
                case 3:
                    piece.blocks = [new block(-blockSize, -blockSize, color), new block(-blockSize, 0, color), new block(0, 0, color), new block(blockSize, 0, color)];
                    break;
            }
            break;

        case 6:                                     // c u b
            var color = "#333333";
            piece.blocks = [new block(0, 0, color), new block (blockSize, 0, color), new block(0, blockSize, color), new block(blockSize, blockSize, color)];
            break;
    }

    for (var i = 0; i < piece.blocks.length; i++) {          // Check for oob or clipping
        if (piece.blocks[i].x + piece.x >= canvas.width || piece.blocks[i].x + piece.x < 0) {
            if (rotation > 0) rotation--;
            else rotation = 4;
            this.rotate(piece, rotation, type);
            break;
        }
        for (var j = 0; j < blocks.length; j++) {
            if (piece.blocks[i].x + piece.x == blocks[j].x && piece.blocks[i].y + piece.y == blocks[j].y) {
                if (rotation > 0) rotation--;
                else rotation = 4;
                this.rotate(piece, rotation, type);
                break;
            }
        }
    }
    }
};
