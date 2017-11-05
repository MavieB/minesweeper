
// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs); //To call Board methods, we'll have to create an instance of a Board inside of the Game constructor.
	}

	playMove(rowIndex, columnIndex) {
		//Add a method called playMove to the Game class. The method should take rowIndex and columnIndex as parameters.v
		this._board.flipTile(rowIndex, columnIndex); // can I  even call the flipTile method before i define it (done further below)
		console.log('If my code worked I would see this');
		if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
			//The statement should check if the playerBoard provided by this._board has a B and the given row index and column index.
			console.log('Game Over');
			this._board.print();
		} else if (!this._board.hasSafeTiles()) {
			console.log('You have won!');
		} else {
			console.log('Current Board:');
			this._board.print(); 
		}

	}
}