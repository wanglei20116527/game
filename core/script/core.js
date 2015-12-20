// let energy = new Energy( canvas, {
// 	x: 100,
// 	y: 100,
// 	radius: 7, // 4 -7
// 	color: '#14DC93',
// 	speedX: 2,
// 	shieldY: 2,
// 	accelecateX:1,
// 	accelecateY: 1,

// 	enery: 4 
// });

import Game from './components/game';

let canvas = document.querySelector( '.canvas' );

let game = new Game( canvas );

game.start();




