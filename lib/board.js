'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		//when a user creates an instance of a board (using the constructor), they will need to specify the size of the board as well as the number of bombs on the board (which is what the parameters represent	
		this._numberOfBombs = numberOfBombs; //use this to set an instance property called _numberOfBombs equal to the numberOfBombs argument.

		this._numberOfTiles = numberOfRows * numberOfColumns; //check if I need () here

		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				// what would happen if I write [rowIndex, columnIndex]?
				return 'This tile has already been flipped';
			} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex); // why can i not directly call variable numberOfBombs?;
			}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var NeighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length; // here the hint said "const numberOfRows = bombBoard[0].length;
			var numberOfBombs = 0;

			NeighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0]; // why can I use a variable offset here I didn't define anywhere?
				var neighborColumnIndex = columnIndex + offset[1];
				if (neighborRowIndex >= 0 && neighborRowIndex < _this._numberOfRows && // here instructions say <
				neighborColumnIndex >= 0 && neighborColumnIndex < _this._numberOfColumns) {
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						_this._numberOfBombs++;
					}
				}
			}); // I deleted a ) here that I put after (offset in line
			return this._numberOfBombs; // here is where I struggle again
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {

			return this._numberOfTiles !== this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(" | ");
			}).join("\n"));
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var row = 0; row < numberOfRows; row++) {
				var row = [];
				for (var column = 0; column < numberOfColumns; column++) {
					row.push(" ");
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];
			for (var row = 0; row < numberOfRows; row++) {
				var row = [];
				for (var column = 0; column < numberOfColumns; column++) {
					row.push(null);
				}
				board.push(row);
			}

			var numberOfBombsPlaced = 0;

			while (numberOfBombsPlaced < numberOfBombs) {
				var randomRowIndex = Math.floor(Math.random() * numberOfRows);
				var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
				if (board[randomRowIndex][randomColumnIndex] !== 'B') {
					board[randomRowIndex][randomColumnIndex] = 'B';
					numberOfBombsPlaced++;
				}
			}
			return board;
		}
	}]);

	return Board;
}();

;