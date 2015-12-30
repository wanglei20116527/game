import Game from './components/game';

let canvas =document.querySelector( '.canvas' );
let startButton = document.querySelector( '.startButton' );
let dialogLayer = document.querySelector( '.dialog-layer' );

let game = createGame( canvas, gameOverCallback );

startButton.addEventListener('click', function(){
	dialogLayer.className = dialogLayer.className + ' hidden';

	game.start();
}, false);

function createGame( canvas, callback ){
	return new Game( canvas, callback );
}

function gameOverCallback(){
	let className = dialogLayer.className;
	className = className.replace( /^hidden|hidden$|\bhidden\b/g , ' ' );
	dialogLayer.className = className.trim();
	game.destructor();

	game = createGame( canvas, gameOverCallback );
}




