export class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) { //when a user creates an instance of a board (using the constructor), they will need to specify the size of the board as well as the number of bombs on the board (which is what the parameters represent	
		this._numberOfBombs =  numberOfBombs; //use this to set an instance property called _numberOfBombs equal to the numberOfBombs argument.

	    this._numberOfTiles = numberOfRows * numberOfColumns; //check if I need () here
	   
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}   
	

	get playerBoard() {return this._playerBoard;};


	flipTile(rowIndex, columnIndex) {
		if (this._playerBoard[rowIndex] [columnIndex] !== ' ') {  // what would happen if I write [rowIndex, columnIndex]?
			return 'This tile has already been flipped';
		} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B'
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex); // why can i not directly call variable numberOfBombs?;
		}
		this._numberOfTiles--;
	};


	getNumberOfNeighborBombs(rowIndex, columnIndex) { 
		let NeighborOffsets = [

		[-1, -1], 
		[-1, 0], 
		[-1, 1], 
		[0, -1], 
		[0, 1], 
		[1, -1], 
		[1, 0], 
		[1, 1],];

		const numberOfRows = this._bombBoard.length; 
		const numberOfColumns = this._bombBoard[0].length; // here the hint said "const numberOfRows = bombBoard[0].length;
		let numberOfBombs = 0;
	
		NeighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0]; // why can I use a variable offset here I didn't define anywhere?
			const neighborColumnIndex = columnIndex + offset[1];
			if (neighborRowIndex >= 0 && 
				neighborRowIndex < this._numberOfRows &&  // here instructions say <
				neighborColumnIndex >= 0 && 
				neighborColumnIndex < this._numberOfColumns) {
				if (this._bombBoard[neighborRowIndex] [neighborColumnIndex] === 'B') {
					this._numberOfBombs++;
				}
			}
		});  // I deleted a ) here that I put after (offset in line
		return this._numberOfBombs; // here is where I struggle again
	};  


	hasSafeTiles() {
		
		return this._numberOfTiles !== this._numberOfBombs;

	}

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

		let numberOfBombsPlaced = 0;

		while (numberOfBombsPlaced < numberOfBombs) {
			let randomRowIndex = Math.floor(Math.random() * numberOfRows);
			let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if (board[randomRowIndex] [randomColumnIndex] !== 'B') {
				board[randomRowIndex][randomColumnIndex] = 'B';
				numberOfBombsPlaced++;
			}
		}
		return board; 
	}  

};