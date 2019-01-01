document.onkeydown = function(e){
	var startGame = game.board_stringify();
	switch(e.keyCode){
		case 37:
			game.move("left");
			break;
		case 39:
			game.move("right");
			break;
		case 38:
			game.move("up");
			break;
		case 40:
			game.move("down");
	}
	if(game.board_stringify() != startGame){
		game.addNewNum();
	}
	displayBoard();
}
function displayBoard(){
	var newHTML = "";
	game.board.forEach(function(row){
		row.forEach(function(spot){
			var className = "";
			if(spot == ""){
				spot = "<span style='color:transparent'>0</span>";
			}else{
				className = "num" + spot;
			}
			newHTML += "<div class='" + className + "'>" + spot + "</div>";
		});
	});
	document.querySelector("div.game").innerHTML = newHTML;
	if(game.check_gameover()){
		setTimeout(function(){
			alert("Game Over. Try Again.");
			window.location.reload();
		},500);
	}
}
displayBoard();