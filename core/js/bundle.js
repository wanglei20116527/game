(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Background = (function () {
	function Background(canvas, props) {
		_classCallCheck(this, Background);

		this.canvas = canvas;

		this.color = props.color || 'black';
	}

	_createClass(Background, [{
		key: 'draw',
		value: function draw() {
			if (!this.canvas) {
				console.error('Background draw function: canvas is %s', this.canvas);
				return;
			}

			var context = this.canvas.getContext('2d');

			context.save();

			context.fillStyle = this.color;
			context.fillRect(0, 0, this.canvas.width, this.canvas.height);

			context.restore();
		}
	}]);

	return Background;
})();

exports['default'] = Background;
module.exports = exports['default'];
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Circle = (function () {
	function Circle(canvas, props) {
		_classCallCheck(this, Circle);

		this.canvas = canvas;

		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.color = props.color || 'black';
	}

	_createClass(Circle, [{
		key: 'draw',
		value: function draw() {
			if (!this.canvas) {
				console.error('Circle draw function: canvas is %s', this.canvas);
				return;
			}

			var context = this.canvas.getContext('2d');

			context.save();

			context.fillStyle = this.color;

			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			context.closePath();
			context.fill();

			context.restore();
		}
	}]);

	return Circle;
})();

exports['default'] = Circle;
module.exports = exports['default'];
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

var Core = (function (_Circle) {
	_inherits(Core, _Circle);

	function Core(canvas, props) {
		_classCallCheck(this, Core);

		_get(Object.getPrototypeOf(Core.prototype), 'constructor', this).call(this, canvas, props);

		this.life = props.life || 100;
	}

	_createClass(Core, [{
		key: 'draw',
		value: function draw() {
			if (!this.canvas) {
				console.error('Core draw: canvas is %s', this.canvas);
				return;
			}

			_get(Object.getPrototypeOf(Core.prototype), 'draw', this).call(this);
		}
	}]);

	return Core;
})(_circle2['default']);

exports['default'] = Core;
module.exports = exports['default'];
},{"./circle":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

var Enemy = (function (_Circle) {
	_inherits(Enemy, _Circle);

	function Enemy(canvas, props) {
		_classCallCheck(this, Enemy);

		_get(Object.getPrototypeOf(Enemy.prototype), 'constructor', this).call(this, canvas, props);

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;
		this.accelecateX = props.accelecateX || 0;
		this.accelecateY = props.accelecateX || 0;

		this.damage = props.damage || props.radius || 4;
	}

	return Enemy;
})(_circle2['default']);

exports['default'] = Enemy;
module.exports = exports['default'];
},{"./circle":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

var Energy = (function (_Circle) {
	_inherits(Energy, _Circle);

	function Energy(canvas, props) {
		_classCallCheck(this, Energy);

		_get(Object.getPrototypeOf(Energy.prototype), 'constructor', this).call(this, canvas, props);

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;
		this.accelecateX = props.accelecateX || 0;
		this.accelecateY = props.accelecateX || 0;

		this.enery = props.enery || props.radius || 4;
	}

	return Energy;
})(_circle2['default']);

exports['default'] = Energy;
module.exports = exports['default'];
},{"./circle":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Shiled = (function () {
	function Shiled(canvas, props) {
		_classCallCheck(this, Shiled);

		props || (props = {});

		this.canvas = canvas;

		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.width = props.width || 1;
		this.color = props.color || 'black';
		this.startAngle = props.startAngle || 0;
		this.endAngle = props.endAngle || Math.PI * 2;
	}

	_createClass(Shiled, [{
		key: 'draw',
		value: function draw() {
			if (!this.canvas) {
				console.error('Shiled draw function: canvas is %s', this.canvas);
				return;
			}

			var context = this.canvas.getContext('2d');

			context.save();

			context.strokeStyle = this.color;
			context.lineWidth = this.width;

			context.beginPath();
			context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
			context.stroke();

			context.restore();
		}
	}]);

	return Shiled;
})();

exports['default'] = Shiled;
module.exports = exports['default'];
},{}],7:[function(require,module,exports){
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
},{"./components/background":1,"./components/core":3,"./components/enemy":4,"./components/energy":5,"./components/shield":6}]},{},[7]);
