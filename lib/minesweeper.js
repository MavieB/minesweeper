class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs); //To call Board methods, we'll have to create an instance of a Board inside of the Game constructor.
	}

	playMove(rowIndex, columnIndex) {
		//Add a method called playMove to the Game class. The method should take rowIndex and columnIndex as parameters.v
		this._board.flipTile(rowIndex, columnIndex); // can I  even call the flipTile method before i define it (done further below)
		if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
			//The statement should check if the playerBoard provided by this._board has a B and the given row index and column index.
			console.log('Game Over');
			this._board.print();
		} else if (!this._board.hasSafeTiles()) {
			console.log('You have won!');
		} else {
			console.log('Current Board:');
			this._board.print(); //I had print(this._board); // here I need to print the board
		}
	}

}

class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		//when a user creates an instance of a board (using the constructor), they will need to specify the size of the board as well as the number of bombs on the board (which is what the parameters represent	
		this._numberOfBombs = numberOfBombs; //use this to set an instance property called _numberOfBombs equal to the numberOfBombs argument.
		//Next: set an instance property called _numberOfTiles equal to the product of numberOfRows and numberOfColumns (numberOfRows * numberOfColumns).
		//This instance property will represent the size of the game board and will be used to determine if the game is over or not at the end of each turn.
		this._numberOfTiles = numberOfRows * numberOfColumns; //check if I need () here
		//On the next line, create an instance property called _playerBoard. Set it equal to calling the generatePlayerBoard() function on Board.
		//You should pass in numberOfRows and numberOfColumns to generatePlayerBoard().
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	//Next, we'll need to add a getter method to the class. What exactly will this method "get", or return?
	// It should return an instance's playerBoard. On the next line, define a getter method called playerBoard.
	get playerBoard() {
		return this._playerBoard;
	}

	flipTile(rowIndex, columnIndex) {
		if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
			// what would happen if I write [rowIndex, columnIndex]?
			return 'This tile has already been flipped';
		} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B';
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			// why can i not directly call variable numberOfBombs?;
		}
		this._numberOfTiles--;
	}

	// tried to clean up this function according to point 15. Not sure if I included. this at the right spots. Instructions said
	//Make sure to reference instance properties using this and underscores (this should be a matter of simply adding this to existing variable names in the function, like bombBoard)


	getNumberOfNeighborBombs(rowIndex, columnIndex) {
		let NeighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length; // here the hint said "const numberOfRows = bombBoard[0].length;
		let numberOfBombs = 0;

		NeighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0]; // why can I use a variable offset here I didn't define anywhere?
			const neighborColumnIndex = columnIndex + offset[1];
			if (neighborRowIndex >= 0 && neighborRowIndex < this._numberOfRows && // here instructions say <
			neighborColumnIndex >= 0 && neighborColumnIndex < this._numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
					this._numberOfBombs++;
				}
			}
		});
		return this._numberOfBombs; // here is where I struggle again
	} // closes getNumberOf NeighborBombs

	//We'll need a way of informing the user that they've won the game. 
	//A user wins when there are no non-bomb ("safe") tiles remaining to be flipped.
	//On the next line, add a method called .
	//.hasSafeTiles() will need to check the numberOfTileson the board versus the numberOfBombs on the board.
	//If these two values are equal, then the player has won the game (there are no more safe tiles on the board!).
	//Otherwise, if the values are not equal, the player has to continue playing the game (flipping tiles).

	hasSafeTiles() {
		//if (this._numberOfTiles !== this._numberOfBombs) Actually, the expression inside of the if statement is truthy, meaning we don't need an if statement to evaluate it.
		//Delete the if statement, but do not delete the expression the if statement was checking. Instead, simply return this expression. Don't forget your semicolon at the end!
		return this._numberOfTiles !== this._numberOfBombs;
	}
	// i deleeted a { here

	// }; not sure where this belongs

	// this is in the sample code: 
	//print() {
	//   console.log(this._playerBoard.map(row => row.join(" | ")).join("\n"));
	// }

	// print(board)  {
	// 	console.log(board.map(row => row.join(' | ')).join('\n'));
	// 	return board;
	// 	}


	print() {
		console.log(this._playerBoard.map(row => row.join(" | ")).join("\n"));
	}

	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];
		for (let row = 0; row < numberOfRows; row++) {
			let row = [];
			for (let column = 0; column < numberOfColumns; column++) {
				row.push(" ");
			}
			board.push(row);
		}
		return board;
	}

	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];
		for (let row = 0; row < numberOfRows; row++) {
			let row = [];
			for (let column = 0; column < numberOfColumns; column++) {
				row.push(null);
			}
			board.push(row);
		}

		// static generatePlayerBoard(numberOfRows, numberOfColumns) {  //Remove const and replace it with static to make this a class method
		//   let board = []; 
		//   for (numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
		//     let row = [];

		//     for (numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
		//       row.push(' '); // here i have to probably use .join

		//     }
		//     board.push(row);
		//   } 

		//  return board;  
		// };  // closes generate player board


		// static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		// 	let board = []; 
		//   for (numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
		//     let row = [];

		//   for (numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
		//       row.push(null); 

		//     }
		//     board.push(row);
		//   }

		let numberOfBombsPlaced = 0;

		while (numberOfBombsPlaced < numberOfBombs) {
			let randomRowIndex = Math.floor(Math.random() * numberOfRows);
			let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if (board[randomRowIndex][randomColumnIndex] !== 'B') {
				board[randomRowIndex][randomColumnIndex] = 'B';
				numberOfBombsPlaced++;
			}
		}
		return board;
	} // closes generateBombBoard

} // This here shoudl close the class


const g = new Game(5, 5, 3); //Create a constant called g and instantiate a new Game. The game should be a 3 x 3 board, with a total of 3 bombs on the board.
g.playMove(0, 2);

// generatePlayerBoard(2,3);

// let playerBoard = generatePlayerBoard(3, 4); // do I have to add .this?
// let bombBoard = generateBombBoard(3, 4, 5); // do I have to add .this?
// console.log('Player Board: '); 
// print(this._playerBoard);
// console.log('Bomb Board: ');
// print(this._bombBoard);

// flipTile(playerBoard, bombBoard,0,0);
// console.log('Updated Player Board: ');
// printBoard(playerBoard);