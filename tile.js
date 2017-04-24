const DELTAS = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0, -1],
    [ 0,  1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1]
];

class Tile {

    constructor(board, pos) {
        this.board = board;
        this.pos = pos;
        this.bombed = false;
        this.explored = false;
        this.flagged = false;
    }

    adjacentBombCount() {
        return this.adjacentTiles.filter(tile => tile.bombed).length;
    }

    adjacentTiles() {
        const adjacentTiles = [];
        DELTAS.map((dx, dy) => {
            const adjacentPos = [this.pos[0] + dx, this.pos[1] + dy];
            if (this.board.isValidPos(adjacentPos)) {
                adjacentTiles.push(this.board.getTile(adjacentPos));
            }
        });
        return adjacentTiles;
    }

    explore() {
        if (this.flagged || this.explored) return this;
        this.explored = true;
        if (!this.bombed && this.adjacentBombCount() === 0) {
            this.adjacentTiles.forEach(tile => tile.explore);
        }
        return this;
    }

    render() {
        if (this.flagged) {
            return "F";
        } else if (this.explored) {
            return this.adjacentBombCount() === 0 ? "_" : this.adjacentBombCount().toString();
        } else {
            return "*";
        }
    }

    reveal() {
        if (this.flagged) {
            return this.bombed ? "F" : "f";
        } else if (this.bombed) {
            return this.explored ? "X" : "B";
        } else {
            return this.adjacentBombCount() === 0 ? "_" : this.adjacentBombCount().toString();
        }
    }

}

export default Tile;
