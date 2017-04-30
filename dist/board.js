"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = require("./tile.js");

var Board = function () {
    function Board() {
        var gridSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
        var numBombs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

        _classCallCheck(this, Board);

        this.gridSize = gridSize;
        this.numBombs = numBombs;

        this.initializeGrid();
    }

    _createClass(Board, [{
        key: "initializeGrid",
        value: function initializeGrid() {
            this.grid = [];
            for (var i = 0; i < this.gridSize; i++) {
                var row = [];
                for (var j = 0; j < this.gridSize; j++) {
                    row.push(new Tile(this, [i, j]));
                }
                this.grid.push(row);
            }
            this.plantBombs();
        }
    }, {
        key: "plantBombs",
        value: function plantBombs() {
            var numBombs = 0;
            while (numBombs < this.numBombs) {
                var tile = this.getTile([Math.floor(Math.random() * this.gridSize), Math.floor(Math.random() * this.gridSize)]);
                if (!tile.bombed) {
                    tile.bombed = true;
                    numBombs++;
                }
            }
        }
    }, {
        key: "isValidPos",
        value: function isValidPos(pos) {
            for (var i = 0; i < pos.length; i++) {
                if (pos[i] < 0 || pos[i] >= this.gridSize) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "getTile",
        value: function getTile(pos) {
            return this.grid[pos[0]][pos[1]];
        }
    }, {
        key: "render",
        value: function render() {
            for (var i = 0; i < this.gridSize; i++) {
                var rowStr = "";
                for (var j = 0; j < this.gridSize; j++) {
                    var tile = this.getTile([i, j]);
                    rowStr += tile.render();
                }
                console.log(rowStr);
            }
        }
    }, {
        key: "reveal",
        value: function reveal() {
            for (var i = 0; i < this.gridSize; i++) {
                var rowStr = "";
                for (var j = 0; j < this.gridSize; j++) {
                    var tile = this.getTile([i, j]);
                    rowStr += tile.reveal();
                }
                console.log(rowStr);
            }
        }
    }, {
        key: "promptMove",
        value: function promptMove(reader, moveCallback) {
            this.render();
            reader.question("Enter rowNum,colNum: " + "\n", function (input) {
                var pos = input.split(",").map(function (el) {
                    return parseInt(el, 10);
                });
                moveCallback(pos);
            });
        }
    }, {
        key: "run",
        value: function run(reader, completionCallback) {
            var _this = this;

            this.promptMove(reader, function (pos) {
                if (!_this.isValidPos(pos)) {
                    console.log("Invalid move!");
                }
                var tile = _this.getTile(pos);
                if (tile.bombed) {
                    _this.reveal();
                    console.log("Game over!");
                } else {
                    tile.explore();
                    return _this.run(reader, completionCallback);
                }
            });
        }
    }]);

    return Board;
}();

module.exports = Board;
//# sourceMappingURL=board.js.map