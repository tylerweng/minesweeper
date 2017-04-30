const Tile = require("./tile.js");

class Board {
    constructor(gridSize=9, numBombs=6) {
        this.gridSize = gridSize;
        this.numBombs = numBombs;

        this.initializeGrid();
    }

    initializeGrid() {
        this.grid = [];
        for (let i = 0; i < this.gridSize; i++) {
            const row = [];
            for (let j = 0; j < this.gridSize; j++) {
                row.push(new Tile(this, [i, j]));
            }
            this.grid.push(row);
        }
        this.plantBombs();
    }

    plantBombs() {
        let numBombs = 0;
        while (numBombs < this.numBombs) {
            const tile = this.getTile([
                Math.floor(Math.random() * this.gridSize),
                Math.floor(Math.random() * this.gridSize)
            ]);
            if (!tile.bombed) {
                tile.bombed = true;
                numBombs++;
            }
        }
    }

    isValidPos(pos) {
        for (let i = 0; i < pos.length; i++) {
            if (pos[i] < 0 || pos[i] >= this.gridSize) {
                return false;
            }
        }
        return true;
    }

    getTile(pos) {
        return this.grid[pos[0]][pos[1]];
    }

    render() {
        for (let i = 0; i < this.gridSize; i++) {
            let rowStr = "";
            for (let j = 0; j < this.gridSize; j++) {
                const tile = this.getTile([i, j]);
                rowStr += tile.render();
            }
            console.log(rowStr);
        }
    }

    reveal() {
        for (let i = 0; i < this.gridSize; i++) {
            let rowStr = "";
            for (let j = 0; j < this.gridSize; j++) {
                const tile = this.getTile([i, j]);
                rowStr += tile.reveal();
            }
            console.log(rowStr);
        }
    }

    promptMove(reader, moveCallback) {
        this.render();
        reader.question("Enter rowNum,colNum: " + "\n", input => {
            const pos = input.split(",").map(el => parseInt(el, 10));
            moveCallback(pos);
        });
    }

    run(reader, completionCallback) {
        this.promptMove(reader, pos => {
            if (!this.isValidPos(pos)) {
                console.log("Invalid move!");
            }
            const tile = this.getTile(pos);
            if (tile.bombed) {
                this.reveal();
                console.log("Game over!");
            } else {
                tile.explore();
                return this.run(reader, completionCallback);
            }
        });
    }
}

module.exports = Board;
