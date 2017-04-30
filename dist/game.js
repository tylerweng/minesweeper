"use strict";

var readline = require("readline");
var Board = require("./board.js");

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var board = new Board();
board.run(reader, completionCallback);

function completionCallback() {
    reader.question("Play again? y or n:", function (response) {
        if (response === "y") {
            board = new Board();
            board.run(reader, completionCallback);
        } else {
            reader.close();
        }
    });
}
//# sourceMappingURL=game.js.map