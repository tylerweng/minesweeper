"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

var Tile = function () {
    function Tile(board, pos) {
        _classCallCheck(this, Tile);

        this.board = board;
        this.pos = pos;
        this.bombed = false;
        this.explored = false;
        this.flagged = false;
    }

    _createClass(Tile, [{
        key: "adjacentBombCount",
        value: function adjacentBombCount() {
            return this.adjacentTiles().filter(function (tile) {
                return tile.bombed;
            }).length;
        }
    }, {
        key: "adjacentTiles",
        value: function adjacentTiles() {
            var _this = this;

            var adjacentTiles = [];
            DELTAS.map(function (delta) {
                var adjacentPos = [_this.pos[0] + delta[0], _this.pos[1] + delta[1]];
                if (_this.board.isValidPos(adjacentPos)) {
                    adjacentTiles.push(_this.board.getTile(adjacentPos));
                }
            });
            return adjacentTiles;
        }
    }, {
        key: "explore",
        value: function explore() {
            if (this.flagged || this.explored) return this;
            this.explored = true;
            if (!this.bombed && this.adjacentBombCount() === 0) {
                this.adjacentTiles().forEach(function (tile) {
                    return tile.explore();
                });
            }
            return this;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.flagged) {
                return "F";
            } else if (this.explored) {
                return this.adjacentBombCount() === 0 ? "_" : this.adjacentBombCount().toString();
            } else {
                return "*";
            }
        }
    }, {
        key: "reveal",
        value: function reveal() {
            if (this.flagged) {
                return this.bombed ? "F" : "f";
            } else if (this.bombed) {
                return this.explored ? "X" : "B";
            } else {
                return this.adjacentBombCount() === 0 ? "_" : this.adjacentBombCount().toString();
            }
        }
    }]);

    return Tile;
}();

module.exports = Tile;
//# sourceMappingURL=tile.js.map