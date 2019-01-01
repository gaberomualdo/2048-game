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
	console.log(game.board_stringify());
}