import Tile from 'tile.js';

class Board {
    constructor(gridSize, numBombs) {
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
}
