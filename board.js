/**
 * Board
 * Defines a board "class" for an Othello game.
 * Author: Christian Tsoungui Nkoulou and Jongin Seon
 * Date: 3/18/19
 */

module.exports = class Board 
{
	/**
	 * Construct the object with required state
	 */
	constructor(height, width){
		this.height = height;
		this.width = width;
		this.board = [];

		let halfHeight = this.height/2;
	 	let halfWidth = this.width/2;

		for(let r=0; r<this.height; ++r){
			let tmp = [];
			for(let c=0; c<this.width; ++c){
				if((r == halfWidth && c == halfHeight ) 
					|| (r == (halfWidth - 1) && c == (halfHeight - 1)))
				{
					tmp.push('B');
					//this.board[r][c] = 'B';
				}else if((r == (halfWidth - 1) && c == halfHeight) 
					|| (r == halfWidth && c == (halfHeight - 1)))
				{
					tmp.push('W');
					//this.board[r][c] = 'W';	
				}else{
					tmp.push('-');
					//this.board[r][c] = -1;
				}
			}
			this.board.push(tmp);
		}
	}

	

	/**
	 * Print a representation of the board to the terminal.
	 */
	printBoard(){
		for(let i =0; i < this.width; i++)
		{
			process.stdout.write('\t' + (i + 1) );
		}
		process.stdout.write('\n')
		for(let i=0; i<this.height; ++i){
			process.stdout.write((i + 1) +'\t');
			for(let j=0; j<this.width; ++j){
				if(this.board[i][j] == '-'){
					process.stdout.write('-\t')
				} else {
					process.stdout.write(this.board[i][j] + "\t")
				}
			}
			console.log();
		}
	}


	/**
	 * isValidMove
	 * @param row An integer row number.
	 * @param col An integer column number.
	 * @param disc A character for the disc color.
	 * @return A boolean indicating whether the move is valid.
	 */
	
	isValid(row, col, disc)
	{
		if(this.board [row][col] == '-')
		{
			for(let colNum = col - 1; colNum <= (col + 1);  colNum++)
			{
				for(let rowNum = row - 1; rowNum <= (row + 1); rowNum++)
				{
					if(!((colNum == col) && (rowNum == row)))
					{
						if(this.withinBoard(rowNum, colNum))
						{
							if(this.board[rowNum][colNum] != '-')
							{
								if(this.board[rowNum][colNum] != disc)
								{
									let neighborR = rowNum;
									let neighborC = colNum;
									let deltaR = neighborR - row;
									let deltaC = neighborC - col;

									while(this.withinBoard(neighborR, neighborC) 
										&& (this.board[neighborR][neighborC] != '-')
										&& (this.board[neighborR][neighborC] != disc))
									{
										neighborR += deltaR;
										neighborC += deltaC;
									} 
									if(this.withinBoard(neighborR, neighborC))
									{
										if(this.board[neighborR][neighborC] == disc)
										{
											return true;
										} 
									}
								}	
							}
						}
					}
				}
			}
		}
	}

	/**
	 * placeDiscAt
	 * @param row An integer number for row.
	 * @param col An integer number for column.
	 * @param disc A character standing for disc color.
	 */
	placeDiskAt(row, col, disc)
	{		
		this.board[row][col] = disc;
		for(let colNum = col - 1; colNum <= (col + 1);  colNum++)
		{
			for(let rowNum = row - 1; rowNum <= (row + 1); rowNum++)
			{
				if(!((colNum == col) && (rowNum == row)))
				{
					if(this.withinBoard(rowNum, colNum))
					{
						if(this.board[rowNum][colNum] != '-')
						{
							if(this.board[rowNum][colNum] != disc)
							{
								let neighborR = rowNum;
								let neighborC = colNum;
								let deltaR = neighborR - row;
								let deltaC = neighborC - col;

								while(this.withinBoard(neighborR, neighborC) 
									&& (this.board[neighborR][neighborC] != '-')
									&& (this.board[neighborR][neighborC] != disc))
								{
									neighborR += deltaR;
									neighborC += deltaC;
								}
								let r = row + deltaR;
								let c = col + deltaC;
								if(this.withinBoard(neighborR,neighborC))
								{
									if(this.board[neighborR][neighborC] == disc)
									{
										while(this.board[r][c] != disc)
										{	
											this.board[r][c] = disc;
											r += deltaR;
											c += deltaC;
										}
									}
								}	
							}			
						}
					}
				}
			}
		}
	}


	/**
	 * isValidMoveAvailable
	 * @param disc A character pertaining to a disc color.
	 * @return bool A boolean telling the user whether there are
	 *	 	valid moves availabe for that disc.
	 */
	isValidMoveAvailable(disc){
		for(let r = 0; r < this.width; r++)
		{
			for(let c = 0; c < this.height; c++)
			{
				//console.log(this.isValid(r,c,disc));
				if(this.isValid(r,c,disc))
				{
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * isBoardFull
	 * @return boolean Whether or not the board is full.
	 */
	isBoardFull(){
		for(let r = 0; r < this.width; r++)
		{
			for(let c = 0; c < this.height; c++)
			{
				if(this.board[r][c] == '-')
				{
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * isGameOver
	 * @return bool Whether or not the game is over.
	 */
	isGameOver(){
		if((this.isBoardFull()) 
			|| ((this.isValidMoveAvailable('B') == false) 
				&& (this.isValidMoveAvailable('W') == false)))
		{
			return true;
		}
		return false;
	}

	/**
	 * checkWinner
	 * @return char Which player has won.  Return null if
	 * 		a tie exists.
	 */
	checkWinner(){
		let countB = 0;
		let countW = 0;
		for(let r = 0; r < this.width; ++r)
		{
			for(let c = 0; c < this.height; ++c)
			{
				if(this.board[r][c] == 'B')
				{
					countB += 1;
				}else{
					countW += 1;
				}
			}
		}

		if(countB > countW)
		{
			return 'B';
		}else if(countB < countW)
		{
			return 'W';
		}else{
			return null;
		}

	}

	/*********************************Helper Functions********************************/

	//Returns false if cell board[colNum][rowNum] not is inside board; else return true
	withinBoard(rw,cl){
		if (cl < 0 || (rw < 0)) {
			//console.log('Negative values for r or c : ' + rw + ' ' + cl);
			return false;
		}else if((cl >= this.height) || (rw >= this.width)){
			//console.log('Number too large for r or c ' +  rw + ' ' + cl);
			return false;
		}else{
			//console.log('within board');
			return true;
		}
	}
}

//let board = new Board(10, 10);
//board.printBoard();