import Shield from './components/shield';
import Enemy from './components/enemy';
import Energy from './components/energy';
import Background from './components/background';
import Core from './components/core';

let canvas   = document.querySelector( '.canvas' );
let context = canvas.getContext( '2d' ); 

let backgroundColor = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 
						          100, 
						          canvas.width / 2, canvas.height / 2, 
						          Math.sqrt( Math.pow( canvas.width, 2 ) + Math.pow( canvas.height, 2 ) ) );
backgroundColor.addColorStop( 0, '#004545' );
backgroundColor.addColorStop( 0.5, '#003839' );
backgroundColor.addColorStop( 0.75, '#002D2F' );
backgroundColor.addColorStop( 1, '#001B1F' );

let background = new Background( canvas, {
	color: backgroundColor
});

let shield = new Shield( canvas, {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 60,
	width: 3,
	color: '#648D93',
	startAngle: 0,
	endAngle: Math.PI
});

let energy = new Energy( canvas, {
	x: 100,
	y: 100,
	radius: 7, // 4 -7
	color: '#14DC93',
	speedX: 2,
	shieldY: 2,
	accelecateX:1,
	accelecateY: 1,

	enery: 4 
});

let enemy = new Enemy( canvas, {
	x: 50,
	y: 50,
	radius: 4, // 4 -7
	color: 'red',
	speedX: 2,
	shieldY: 2,
	accelecateX:1,
	accelecateY: 1,

	damage: 4 
});

let core = new Core( canvas, {
	x: canvas.width   / 2 ,
	y: canvas.height / 2 ,
	radius: 10,
	color: '#19CABB',
	life: 100
});

startGame();

function startGame(){
	background.draw();
	shield.draw();
	energy.draw();
	enemy.draw();
	core.draw();

	// requestAnimationFrame( startGame );
}


