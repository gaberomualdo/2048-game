const flipMatrix = matrix => (
	matrix[0].map((column, index) => (
		matrix.map(row => row[index])
	))
);

const rotateMatrix = matrix => (
	flipMatrix(matrix.reverse())
);

const rotateMatrixCounterClockwise = matrix => (
	flipMatrix(matrix).reverse()
);

var game = {
	// Board Array
	board: [
		["",
		"",
		"",
		""],
		["",
		"",
		"",
		""],
		["",
		"",
		"",
		""],
		["",
		"",
		"",
		""]
	],
	// Generate random 2 or 4 in random spot at board
	addNewNum: function(){
		var openSpots = [];
		this.board.forEach(function(row, row_amount){
			row.forEach(function(spot, col_amount){
				if(spot == ""){
					openSpots.push([row_amount, col_amount]);
				}
			});
		});
		var newNumSpot = openSpots[Math.floor(Math.random() * openSpots.length)];
		var number = Math.random() < 0.9 ? 2 : 4;
		this.board[newNumSpot[0]][newNumSpot[1]] = number.toString();
	},
	board_stringify: function(){
		newBoard = JSON.parse(JSON.stringify(this.board));
		newBoard.forEach(function(row, row_amount){
			row.forEach(function(spot, col_amount){
				if(spot == ""){
					newBoard[row_amount][col_amount] = "0";
				}
			});
			newBoard[row_amount] = newBoard[row_amount].join("\t");
		});
		newBoard = newBoard.join("\n");
		return newBoard;
	},
	move: function(direction){
		boardClone = JSON.parse(JSON.stringify(this.board));
		switch(direction){
			case "left":
				boardClone.forEach(function(row, row_index){
					var condensedRow = [];
					row.forEach(function(spot){
						if(spot != ""){
							condensedRow.push(spot);
						}
					});
					condensedRow.forEach(function(spot, spot_index){
						if(spot == condensedRow[spot_index + 1] && spot != ""){
							condensedRow[spot_index] = spot * 2;
							condensedRow[spot_index + 1] = "";
						}
					});
					var returnRow = [];
					condensedRow.forEach(function(spot){
						if(spot != ""){
							returnRow.push(spot);
						}
					});
					boardClone[row_index].forEach(function(spot, spot_index){
						if(returnRow[spot_index]){
							boardClone[row_index][spot_index] = returnRow[spot_index];
						}else{
							boardClone[row_index][spot_index] = "";
						}
					});
				});
				break;
			case "right":
				boardClone.forEach(function(row, row_index){
					var condensedRow = [];
					row.forEach(function(spot){
						if(spot != ""){
							condensedRow.push(spot);
						}
					});
					condensedRow.reverse();
					condensedRow.forEach(function(spot, spot_index){
						if(spot == condensedRow[spot_index + 1] && spot != ""){
							condensedRow[spot_index] = spot * 2;
							condensedRow[spot_index + 1] = "";
						}
					});
					var returnRow = [];
					condensedRow.forEach(function(spot){
						if(spot != ""){
							returnRow.push(spot);
						}
					});
					boardClone[row_index].forEach(function(spot, spot_index){
						if(returnRow[spot_index]){
							boardClone[row_index][spot_index] = returnRow[spot_index];
						}else{
							boardClone[row_index][spot_index] = "";
						}
					});
					boardClone[row_index].reverse();
				});
				break;
			case "up":
				boardClone = rotateMatrix(boardClone);
				boardClone.forEach(function(row, row_index){
					var condensedRow = [];
					row.forEach(function(spot){
						if(spot != ""){
							condensedRow.push(spot);
						}
					});
					condensedRow.reverse();
					condensedRow.forEach(function(spot, spot_index){
						if(spot == condensedRow[spot_index + 1] && spot != ""){
							condensedRow[spot_index] = spot * 2;
							condensedRow[spot_index + 1] = "";
						}
					});
					var returnRow = [];
					condensedRow.forEach(function(spot){
						if(spot != ""){
							returnRow.push(spot);
						}
					});
					boardClone[row_index].forEach(function(spot, spot_index){
						if(returnRow[spot_index]){
							boardClone[row_index][spot_index] = returnRow[spot_index];
						}else{
							boardClone[row_index][spot_index] = "";
						}
					});
					boardClone[row_index].reverse();
				});
				boardClone = rotateMatrixCounterClockwise(boardClone);
				break;
			case "down":
				boardClone = rotateMatrix(boardClone);
				boardClone.forEach(function(row, row_index){
					var condensedRow = [];
					row.forEach(function(spot){
						if(spot != ""){
							condensedRow.push(spot);
						}
					});
					condensedRow.forEach(function(spot, spot_index){
						if(spot == condensedRow[spot_index + 1] && spot != ""){
							condensedRow[spot_index] = spot * 2;
							condensedRow[spot_index + 1] = "";
						}
					});
					var returnRow = [];
					condensedRow.forEach(function(spot){
						if(spot != ""){
							returnRow.push(spot);
						}
					});
					boardClone[row_index].forEach(function(spot, spot_index){
						if(returnRow[spot_index]){
							boardClone[row_index][spot_index] = returnRow[spot_index];
						}else{
							boardClone[row_index][spot_index] = "";
						}
					});
				});
				boardClone = rotateMatrixCounterClockwise(boardClone);
		}
		this.board = JSON.parse(JSON.stringify(boardClone));
	},
	check_gameover: function(){
		var gamemover = true;
		var currentBoard = JSON.stringify(this.board);
		this.move("left");
		if(this.board != JSON.parse(currentBoard)){
			gamemover = false;
		}
		this.board = JSON.parse(currentBoard);
		this.move("right");
		if(this.board != JSON.parse(currentBoard)){
			gamemover = false;
		}
		this.board = JSON.parse(currentBoard);
		this.move("up");
		if(this.board != JSON.parse(currentBoard)){
			gamemover = false;
		}
		this.board = JSON.parse(currentBoard);
		this.move("down");
		if(this.board != JSON.parse(currentBoard)){
			gamemover = false;
		}
		this.board = JSON.parse(currentBoard);
		return gamemover;
	}
}

game.addNewNum();