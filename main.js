	/**
	 * Othello
	 * Javascript project for CIS 343.
	 * Command-line version of Othello.
	 * Author: Christian Tsoungui Nkoulou and Jongin Seon
	 * Date: 3/19/19
	 */

	// Import our board definitions
	const board = require('./board.js');
	// Import a synchronous prompt library
	const prompt = require('prompt-sync')();

	/**
	 * saveFile
	 * SYNCHRONOUS (blocking) file save function.
	 * @param file - The full filename path we want to save to.
	 * @param contents - The object we wish to save as a JSON file.
	 */
	function saveFile(file, contents){
		let fs = require('fs');
		fs.writeFileSync(file, JSON.stringify(contents));
	}

	/**
	 * loadFile
	 * SYNCHRONOUS (blocking) file read function.
	 * @param file - The full filename path we wish to load an object from.
	 * @return contents - The object converted from JSON.
	 */
	function loadFile(file){
		let fs = require('fs');
		let content = fs.readFileSync(file);
		let obj = JSON.parse(content);
		return obj;
	}

	/**
	 * Driver function.  "main" method, if you will.
	 */
	function start(){
	 	// Local variables
	 	let fs = require('fs');
	 	let file = "test.json";
	 	let myBoard;
	 	let disc;
	 	let height;
	 	let width;
	 	let turn;
	 	let response;
	 	let p1Disc;
		let p2Disc;

	 	console.log('<<<<< Welcom to the game of Othello >>>>>\n');
	 	try{
	 		if(fs.existsSync(file))
	 		{
	 			//if file not empty
	 			if(fs.readFileSync(file) != null)
	 			{
	 				let newBoard = loadFile(file);
	 				
	 				myBoard = new board(newBoard.height, newBoard.width);
					myBoard.board = newBoard.board;

	 				// if myBoard is not full
	 				if(!(myBoard.isBoardFull()))
	 				{
	 					// ask user if he would like to continue previous game
	 					response = prompt('Would you like to continue the game you saved? Enter Y for Yes or N for No > ').toUpperCase();
	 					// if yes 
	 					if(response == 'Y')
	 					{
	 						turn = 1;
	 						disc = 'B';
	 						// load content of file into board
	 						if(turn == 1){
								p1Disc = disc;
								p2Disc = disc == 'W' ? 'B' : 'W';
							}else {
								p2Disc = disc;
								p1Disc = disc == 'W' ? 'B' : 'W';
							}
	 						
	 					}else if(response == 'N')// if no 
	 					{
	 						//create new game
	 						height = prompt('What height for your board? ');
							while(height < 4)
							{
								console.log('\nHeight is too small\nPlease enter a number greater than 4 ');
								height = prompt('What height for your board? ');	
							}
							width = prompt('\nWhat width for your board? ');
							while(width < 4)
							{
								console.log('\nWidth is too small\n Please enter a number greater than 4 ');
								width = prompt('What width for your board? ');
							}

							// SYNCHRONOUSLY read from keyboard
							console.log('Creating a board with size ' + height + ' x ' + width + '.');
							// Create new board object
							myBoard = new board(height, width);
							//saveFile("test.json", myBoard);
							
							turn = prompt('Enter player to start the game: 1 or 2 ');
							while( turn < 1 || turn >= 3)
							{
								console.log('Invalid number entered. Please try again');
								turn = prompt('Enter player to start the game: 1 or 2 ');
							}

							disc = prompt('Enter disc color: W for White B for Black ').toUpperCase();
							while(disc != 'W' && disc != 'B')
							{
								console.log('Invalid Color. Please try again');
								disc = prompt('Enter disc color: W for White B for Black ').toUpperCase();
							}

							if(turn == 1){
								p1Disc = disc;
								p2Disc = disc == 'W' ? 'B' : 'W';
							}else {
								p2Disc = disc;
								p1Disc = disc == 'W' ? 'B' : 'W';
							}
		 				}
	 				}
	 			}
	 		}else{
	 			height = prompt('What height for your board? ');
				while(height < 4)
				{
					console.log('\nHeight is too small\nPlease enter a number greater than 4 ');
					height = prompt('What height for your board? ');	
				}
				width = prompt('\nWhat width for your board? ');
				while(width < 4)
				{
					console.log('\nWidth is too small\n Please enter a number greater than 4 ');
					width = prompt('What width for your board? ');	
				}

				// SYNCHRONOUSLY read from keyboard
				console.log('Creating a board with size ' + height + ' x ' + width + '.');
				// Create new board object
				myBoard = new board(height, width);
				//saveFile(file, myBoard);

				turn = prompt('Enter player to start the game: 1 or 2 ');
				while( turn < 1 || turn >= 3)
				{
					console.log('Invalid number entered. Please try again');
					turn = prompt('Enter player to start the game: 1 or 2 ');
				}

				disc = prompt('Enter disc color: W for White B for Black ').toUpperCase();
				while(disc != 'W' && disc != 'B')
				{
					console.log('Invalid Color. Please try again');
					disc = prompt('Enter disc color: W for White B for Black ').toUpperCase();
				}
				
				if(turn == 1){
					p1Disc = disc;
					p2Disc = disc == 'W' ? 'B' : 'W';
				}else {
					p2Disc = disc;
					p1Disc = disc == 'W' ? 'B' : 'W';
				}
	 		}
	 	}catch(err){
	 		console.log("AN ERROR OCCURRED!");
	 		console.error(err);
	 	}
	 	
		console.log('Player 1: ' + p1Disc + ' Player 2: ' + p2Disc +'\n');
		console.log('Player ' + turn + ' starts the game...\n');

		// Loop, asking user input, calling appropriate functions.
		let row;
		let col;
		//console.log(typeof myBoard);
		while(!myBoard.isGameOver())
		{
			myBoard.printBoard();
			if(!(myBoard.isValidMoveAvailable((turn == 1) ? p1Disc : p2Disc)))
			{
				console.log('No valid moves available for player ' + turn + '. You lose your turn.\n');
			}else{
				do{
					console.log('Turn> Player ' + turn + '(' + ((turn == 1) ? p1Disc : p2Disc) + ')');
					row = prompt('Enter row to place your disc:');
					col = prompt('Enter col to place your disc:');
					
					if(row < 1 || row > width || col < 1 || col > height)
					{
						console.log('Sorry, invalid input. Try again. \n');
						continue;
					}
					row--; // adjust it for zero-indexed array of board
					col--; // adjust it for zero-indexed array of boardelse if(!myBoard.isValid(row, col, ((turn == 1) ? p1Disc : p2Disc)))
					if(!myBoard.isValid(row, col, (turn == 1 ? p1Disc : p2Disc))){
						console.log('Sorry, that is not a valid move. Try again');
						continue;
					}
						break;
				}while(true);
				myBoard.placeDiskAt(row,col,((turn == 1) ? p1Disc : p2Disc));
				saveFile(file, myBoard);
			}
			turn = (turn == 1) ? 2 : 1;
		}

		winner = myBoard.checkWinner();
		if(winner == 'B' || winner == 'W')
		{
			console.log('Game is over. The winner is Player ' + (winner == p1Disc ? 1 : 2) + winner + '.\n');
		}else{
			console.log('Game is over. No winner.');
		}
	}
	console.clear();
	start();