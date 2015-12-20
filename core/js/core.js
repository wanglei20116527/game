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

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsGame = require('./components/game');

var _componentsGame2 = _interopRequireDefault(_componentsGame);

var canvas = document.querySelector('.canvas');

var game = new _componentsGame2['default'](canvas);

game.start();