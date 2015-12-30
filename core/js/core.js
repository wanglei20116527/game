'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsGame = require('./components/game');

var _componentsGame2 = _interopRequireDefault(_componentsGame);

var canvas = document.querySelector('.canvas');
var startButton = document.querySelector('.startButton');
var dialogLayer = document.querySelector('.dialog-layer');

var game = createGame(canvas, gameOverCallback);

startButton.addEventListener('click', function () {
	dialogLayer.className = dialogLayer.className + ' hidden';

	game.start();
}, false);

function createGame(canvas, callback) {
	return new _componentsGame2['default'](canvas, callback);
}

function gameOverCallback() {
	var className = dialogLayer.className;
	className = className.replace(/^hidden|hidden$|\bhidden\b/g, ' ');
	dialogLayer.className = className.trim();
	game.destructor();

	game = createGame(canvas, gameOverCallback);
}