'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsShield = require('./components/shield');

var _componentsShield2 = _interopRequireDefault(_componentsShield);

var _componentsEnemy = require('./components/enemy');

var _componentsEnemy2 = _interopRequireDefault(_componentsEnemy);

var _componentsEnergy = require('./components/energy');

var _componentsEnergy2 = _interopRequireDefault(_componentsEnergy);

var _componentsBackground = require('./components/background');

var _componentsBackground2 = _interopRequireDefault(_componentsBackground);

var _componentsCore = require('./components/core');

var _componentsCore2 = _interopRequireDefault(_componentsCore);

var canvas = document.querySelector('.canvas');
var context = canvas.getContext('2d');

var backgroundColor = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)));
backgroundColor.addColorStop(0, '#004545');
backgroundColor.addColorStop(0.5, '#003839');
backgroundColor.addColorStop(0.75, '#002D2F');
backgroundColor.addColorStop(1, '#001B1F');

var background = new _componentsBackground2['default'](canvas, {
	color: backgroundColor
});

var shield = new _componentsShield2['default'](canvas, {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 60,
	width: 3,
	color: '#648D93',
	startAngle: 0,
	endAngle: Math.PI
});

var energy = new _componentsEnergy2['default'](canvas, {
	x: 100,
	y: 100,
	radius: 7, // 4 -7
	color: '#14DC93',
	speedX: 2,
	shieldY: 2,
	accelecateX: 1,
	accelecateY: 1,

	enery: 4
});

var enemy = new _componentsEnemy2['default'](canvas, {
	x: 50,
	y: 50,
	radius: 4, // 4 -7
	color: 'red',
	speedX: 2,
	shieldY: 2,
	accelecateX: 1,
	accelecateY: 1,

	damage: 4
});

var core = new _componentsCore2['default'](canvas, {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	color: '#19CABB',
	life: 100
});

startGame();

function startGame() {
	background.draw();
	shield.draw();
	energy.draw();
	enemy.draw();
	core.draw();

	// requestAnimationFrame( startGame );
}