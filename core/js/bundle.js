(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Background = (function () {
	function Background(props) {
		_classCallCheck(this, Background);

		props || (props = {});

		this.color = props.color || 'black';
	}

	_createClass(Background, [{
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Background draw function: canvas is %s', canvas);
				return;
			}

			var context = canvas.getContext('2d');

			context.save();

			context.fillStyle = this.color;
			context.fillRect(0, 0, canvas.width, canvas.height);

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
	function Circle(props) {
		_classCallCheck(this, Circle);

		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.color = props.color || 'black';
		this.opacity = props.opacity || 1;
	}

	_createClass(Circle, [{
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Circle draw function: canvas is %s', canvas);
				return;
			}

			var context = canvas.getContext('2d');

			context.save();

			context.fillStyle = this.color;
			context.globalAlpha = this.opacity >= 0 ? this.opacity : 0;

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

var count_renderd = 0;
var RENDER_CYCLE = 360;

var Core = (function (_Circle) {
	_inherits(Core, _Circle);

	function Core(props) {
		_classCallCheck(this, Core);

		_get(Object.getPrototypeOf(Core.prototype), 'constructor', this).call(this, props);

		this.boundaryColor = props.boundaryColor || 'black';
		this.boundaryWidth = props.boundaryWidth || 0;

		this.life = props.life || 100;
	}

	_createClass(Core, [{
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Core render: canvas is %s', canvas);
				return;
			}

			_get(Object.getPrototypeOf(Core.prototype), 'render', this).call(this, canvas);
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var Enemy = (function (_Circle) {
	_inherits(Enemy, _Circle);

	function Enemy(props) {
		_classCallCheck(this, Enemy);

		_get(Object.getPrototypeOf(Enemy.prototype), 'constructor', this).call(this, props);

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.damage = props.damage || props.radius || 4;

		this.fragments = [];

		this.isSmashed = false;
	}

	_createClass(Enemy, [{
		key: 'move',
		value: function move() {
			if (this.isSmashed) {
				this.fragments.forEach(function (fragment) {
					fragment.move();
				});
			} else {
				this.x += this.speedX;
				this.y += this.speedY;
			}
		}
	}, {
		key: 'fade',
		value: function fade() {
			this.fragments.forEach(function (fragment) {
				fragment.fade();
			});
		}
	}, {
		key: 'smash',
		value: function smash() {
			this.fragments = [];

			var NUMBER_FRAGMENTS = parseInt(this.radius * 1.5);

			var RADIAN_UNIT = Math.PI / 4 / NUMBER_FRAGMENTS;

			var speed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));

			for (var i = 0; i <= NUMBER_FRAGMENTS; ++i) {
				var speedX = speed * Math.sin(i * RADIAN_UNIT) * (this.speedX > 0 ? -1 : 1) * (Math.random() * 0.2 + 0.6);
				var speedY = speed * Math.cos(i * RADIAN_UNIT) * (this.speedY > 0 ? -1 : 1) * (Math.random() * 0.2 + 0.6);

				this.fragments.push(new _particle2['default']({
					x: this.x,
					y: this.y,
					radius: 1,
					opacity: 1,
					color: this.color,
					speedX: speedX,
					speedY: speedY,
					fadeStep: (parseInt(Math.random() * 2) + 1) / 100
				}));
			}

			this.isSmashed = true;
		}
	}, {
		key: 'isDie',
		value: function isDie() {
			if (!this.isSmashed) {
				return false;
			}

			return this.fragments.forEach(function (fragment) {
				return fragment.opacity < 0;
			});
		}
	}, {
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Enemy draw function: canvas is %s', canvas);
				return;
			}
			if (this.isSmashed) {
				this.fragments.forEach(function (fragment) {
					fragment.render(canvas);
				});
			} else {
				_get(Object.getPrototypeOf(Enemy.prototype), 'render', this).call(this, canvas);
			}
		}
	}]);

	return Enemy;
})(_circle2['default']);

exports['default'] = Enemy;
module.exports = exports['default'];
},{"./circle":2,"./particle":7}],5:[function(require,module,exports){
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

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var Energy = (function (_Circle) {
	_inherits(Energy, _Circle);

	function Energy(props) {
		_classCallCheck(this, Energy);

		_get(Object.getPrototypeOf(Energy.prototype), 'constructor', this).call(this, props);

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.enery = props.enery || props.radius || 4;

		this.fragments = [];

		this.isSmashed = false;
	}

	_createClass(Energy, [{
		key: 'move',
		value: function move() {
			if (this.isSmashed) {
				this.fragments.forEach(function (fragment) {
					fragment.move();
				});
			} else {
				this.x += this.speedX;
				this.y += this.speedY;
			}
		}
	}, {
		key: 'fade',
		value: function fade() {
			this.fragments.forEach(function (fragment) {
				fragment.fade();
			});
		}
	}, {
		key: 'smash',
		value: function smash() {
			this.fragments = [];

			var NUMBER_FRAGMENTS = parseInt(this.radius * 1.5);

			var RADIAN_UNIT = Math.PI / 4 / NUMBER_FRAGMENTS;

			var speed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));

			for (var i = 0; i <= NUMBER_FRAGMENTS; ++i) {
				var speedX = speed * Math.sin(i * RADIAN_UNIT) * (this.speedX > 0 ? -1 : 1) * (Math.random() * 0.2 + 0.6);
				var speedY = speed * Math.cos(i * RADIAN_UNIT) * (this.speedY > 0 ? -1 : 1) * (Math.random() * 0.2 + 0.6);

				this.fragments.push(new _particle2['default']({
					x: this.x,
					y: this.y,
					radius: 1,
					opacity: 1,
					color: this.color,
					speedX: speedX,
					speedY: speedY,
					fadeStep: (parseInt(Math.random() * 2) + 1) / 100
				}));
			}

			this.isSmashed = true;
		}
	}, {
		key: 'isDie',
		value: function isDie() {
			if (!this.isSmashed) {
				return false;
			}

			return this.fragments.forEach(function (fragment) {
				return fragment.opacity < 0;
			});
		}
	}, {
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Enemy draw function: canvas is %s', canvas);
				return;
			}
			if (this.isSmashed) {
				this.fragments.forEach(function (fragment) {
					fragment.render(canvas);
				});
			} else {
				_get(Object.getPrototypeOf(Energy.prototype), 'render', this).call(this, canvas);
			}
		}
	}]);

	return Energy;
})(_circle2['default']);

exports['default'] = Energy;
module.exports = exports['default'];
},{"./circle":2,"./particle":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _shield = require('./shield');

var _shield2 = _interopRequireDefault(_shield);

var _enemy = require('./enemy');

var _enemy2 = _interopRequireDefault(_enemy);

var _energy = require('./energy');

var _energy2 = _interopRequireDefault(_energy);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var _background = require('./background');

var _background2 = _interopRequireDefault(_background);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var requestAnimationFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		return setTimeout(callback, 1000 / 60);
	};
})();

var calculateRadian = function calculateRadian(position, center) {
	var x = position.x;
	var y = position.y;

	var offset = {
		x: center.x - x,
		y: center.y - y
	};

	var radian = 0;

	if (x == center.x) {
		radian = y < center.y ? 0 : Math.PI;
	} else if (y == center.y) {
		radian = x > center.x ? Math.PI / 2 : Math.PI * 3 / 2;
	} else if (x > center.x && y < center.y) {
		radian = Math.atan(offset.x / -offset.y);
	} else if (x > center.x && y > center.y) {
		radian = Math.atan(offset.y / offset.x) + Math.PI / 2;
	} else if (x < center.x && y > center.y) {
		radian = Math.atan(-offset.x / offset.y) + Math.PI;
	} else {
		radian = Math.atan(offset.y / offset.x) + Math.PI * 3 / 2;
	}

	return radian;
};

var Game = (function () {
	function Game(canvas) {
		_classCallCheck(this, Game);

		this.canvas = canvas;

		this.initComponents();
		this.initEvents();
	}

	_createClass(Game, [{
		key: 'initComponents',
		value: function initComponents() {
			this.initBackground();
			this.initShield();
			this.initCore();
			this.initEnemies();
			this.initEnergies();
		}
	}, {
		key: 'initBackground',
		value: function initBackground() {
			var context = this.canvas.getContext('2d');

			var backgroundColor = context.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, 100, this.canvas.width / 2, this.canvas.height / 2, Math.sqrt(Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)));

			backgroundColor.addColorStop(0, '#004545');
			backgroundColor.addColorStop(0.5, '#003839');
			backgroundColor.addColorStop(0.75, '#002D2F');
			backgroundColor.addColorStop(1, '#001B1F');

			this.background = new _background2['default']({
				color: backgroundColor
			});
		}
	}, {
		key: 'initShield',
		value: function initShield() {
			this.shield = new _shield2['default']({
				x: this.canvas.width / 2,
				y: this.canvas.height / 2,
				radius: 60,
				width: 3,
				color: '#648D93',
				startRadian: 0,
				radian: Math.PI
			});
		}
	}, {
		key: 'initCore',
		value: function initCore() {
			this.core = new _core2['default']({
				x: this.canvas.width / 2,
				y: this.canvas.height / 2,
				radius: 15,
				color: '#19CABB',
				boundaryColor: 'yellow',
				boundaryWidth: 2,
				life: 100
			});
		}
	}, {
		key: 'initEnemies',
		value: function initEnemies() {
			this.enemies = [];
		}
	}, {
		key: 'initEnergies',
		value: function initEnergies() {
			this.energies = [];
		}
	}, {
		key: 'initEvents',
		value: function initEvents() {
			this.initCanvasEvents();
		}
	}, {
		key: 'initCanvasEvents',
		value: function initCanvasEvents() {
			this.canvas.addEventListener('mousemove', (function (evt) {
				var center = {
					x: this.canvas.width / 2,
					y: this.canvas.height / 2
				};

				var position = {
					x: evt.offsetX,
					y: evt.offsetY
				};

				this.shield.startRadian = calculateRadian(position, center);
			}).bind(this), false);
		}
	}, {
		key: 'start',
		value: function start() {
			var renderGame = (function () {
				this.render();
				requestAnimationFrame(renderGame);
			}).bind(this);
			renderGame();

			var enemyAndEnergyFactory = (function () {
				var entity = this.createEnemyOrEnergy();
				if (entity instanceof _enemy2['default']) {
					this.enemies.push(entity);
				} else {
					this.energies.push(entity);
				}
				setTimeout(enemyAndEnergyFactory.bind(this), 1000 + parseInt(Math.random() * 500));
			}).bind(this);
			enemyAndEnergyFactory();

			var detectCollisionProxy = (function () {
				this.detectCollision();
				requestAnimationFrame(detectCollisionProxy);
			}).bind(this);
			detectCollisionProxy();
		}
	}, {
		key: 'pause',
		value: function pause() {
			this.isPending = false;
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.canvas) {
				console.error('Word draw: canvas is %s', this.canvas);
				return;
			}

			var context = this.canvas.getContext('2d');
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.renderBackground();
			this.renderShield();
			this.renderCore();
			this.renderEnemies();
			this.renderEnergies();
		}
	}, {
		key: 'renderBackground',
		value: function renderBackground() {
			this.background || this.initBackground();
			this.background.render(this.canvas);
		}
	}, {
		key: 'renderShield',
		value: function renderShield() {
			this.shield || this.initShield();
			this.shield.render(this.canvas);
		}
	}, {
		key: 'renderCore',
		value: function renderCore() {
			this.core || this.initCore();
			this.core.render(this.canvas);
		}
	}, {
		key: 'renderEnemies',
		value: function renderEnemies() {
			var canvasWidth = this.canvas.width;
			var canvasHeight = this.canvas.height;

			var toRetain = [];
			this.enemies.forEach((function (enemy, index) {
				if (enemy.isSmashed) {
					enemy.move();
					enemy.fade();

					if (!enemy.isDie()) {
						enemy.render(this.canvas);
						toRetain.push(enemy);
					}
				} else {
					if (enemy.x + enemy.radius >= 0 && enemy.x - enemy.radius <= canvasWidth && enemy.y + enemy.radius >= 0 && enemy.y - enemy.radius <= canvasHeight) {

						enemy.move();
						enemy.render(this.canvas);
						toRetain.push(enemy);
					}
				}
			}).bind(this));

			this.enemies = toRetain;
		}
	}, {
		key: 'renderEnergies',
		value: function renderEnergies() {
			var canvasWidth = this.canvas.width;
			var canvasHeight = this.canvas.height;

			var toRetain = [];
			this.energies.forEach((function (energy, index) {
				if (energy.isSmashed) {
					energy.move();
					energy.fade();

					if (!energy.isDie()) {
						energy.render(this.canvas);
						toRetain.push(energy);
					}
				} else {
					if (energy.x + energy.radius >= 0 && energy.x - energy.radius <= canvasWidth && energy.y + energy.radius >= 0 && energy.y - energy.radius <= canvasHeight) {

						energy.move();
						energy.render(this.canvas);
						toRetain.push(energy);
					}
				}
			}).bind(this));

			this.energies = toRetain;
		}
	}, {
		key: 'detectCollision',
		value: function detectCollision() {
			this.enemies.forEach((function (enemy, index) {
				if (!enemy.isSmashed && (this.detectCollisionWithShield(enemy) || this.detectCollisionWithCore(enemy))) {

					enemy.smash();
				}
			}).bind(this));

			this.energies.forEach((function (energy, index) {
				if (!energy.isSmashed && (this.detectCollisionWithShield(energy) || this.detectCollisionWithCore(energy))) {

					energy.smash();
				}
			}).bind(this));
		}
	}, {
		key: 'detectCollisionWithShield',
		value: function detectCollisionWithShield(entity) {
			var isCollision = false;

			var center = {
				x: this.canvas.width / 2,
				y: this.canvas.height / 2
			};

			var distanceToCenter = Math.sqrt(Math.pow(entity.x - center.x, 2) + Math.pow(entity.y - center.y, 2));

			if (distanceToCenter - entity.radius > this.shield.radius + this.shield.width || distanceToCenter + entity.radius < this.shield.radius) {

				isCollision = false;
			} else {
				var radian = calculateRadian({
					x: entity.x,
					y: entity.y
				}, center);

				var shieldStartRadian = this.shield.startRadian - this.shield.radian / 2;
				var shieldEndRadian = this.shield.startRadian + this.shield.radian / 2;

				if (shieldStartRadian < 0) {
					shieldStartRadian = Math.PI * 2 + shieldStartRadian;
					isCollision = radian >= shieldStartRadian || radian <= shieldEndRadian ? true : false;
				} else if (shieldEndRadian > Math.PI * 2) {
					shieldEndRadian -= Math.PI * 2;
					isCollision = radian <= shieldEndRadian || radian >= shieldStartRadian ? true : false;
				} else {
					isCollision = radian >= shieldStartRadian && radian <= shieldEndRadian ? true : false;
				}
			}

			return isCollision;
		}
	}, {
		key: 'detectCollisionWithCore',
		value: function detectCollisionWithCore(entity) {
			var isCollision = false;

			var distanceToCenter = Math.sqrt(Math.pow(this.core.x - entity.x, 2) + Math.pow(this.core.y - entity.y, 2));

			isCollision = distanceToCenter - entity.radius < this.core.radius;

			return isCollision;
		}
	}, {
		key: 'createEnemyOrEnergy',
		value: function createEnemyOrEnergy() {
			var canvasWidth = this.canvas.width;
			var canvasHeight = this.canvas.height;
			var canvasCenter = {
				x: canvasWidth / 2,
				y: canvasHeight / 2
			};

			var type = 'enemy';
			switch (parseInt(Math.random() * 5)) {
				case 0:
				case 1:
				case 2:
				case 3:
					type = 'enemy';
					break;

				case 4:
					type = 'energy';
					break;
			}

			var color = type == 'enemy' ? 'red' : '#14DC93';
			var radius = parseInt(Math.random() * 3) + 4;

			var position = {};
			switch (parseInt(Math.random() * 3)) {
				case 0:
					position.x = parseInt(canvasWidth * Math.random());
					position.y = 0;
					break;
				case 1:
					position.x = canvasWidth;
					position.y = parseInt(canvasHeight * Math.random());
					break;
				case 2:
					position.x = parseInt(canvasWidth * Math.random());
					position.y = canvasHeight;
					break;
				case 3:
					position.x = 0;
					position.y = parseInt(canvasHeight * Math.random());
					break;
			}

			var speedX = 0;
			var speedY = 0;
			var speedRatio = 1;
			if (Math.abs(canvasCenter.x - position.x) > Math.abs(canvasCenter.y - position.y)) {
				speedRatio = Math.abs((canvasCenter.y - position.y) / (canvasCenter.x - position.x));
				speedX = (1 + Math.random()) * (canvasCenter.x > position.x ? 1 : -1);
				speedY = Math.abs(speedX * speedRatio) * (canvasCenter.y > position.y ? 1 : -1);
			} else {
				speedRatio = Math.abs((canvasCenter.x - position.x) / (canvasCenter.y - position.y));
				speedY = (1 + Math.random()) * (canvasCenter.y > position.y ? 1 : -1);
				speedX = Math.abs(speedY * speedRatio) * (canvasCenter.x > position.x ? 1 : -1);
			}

			var props = {
				color: color,
				x: position.x,
				y: position.y,
				radius: radius,
				speedX: speedX,
				speedY: speedY
			};

			type == 'enemy' ? props.damage = radius : props.energy = radius;

			var entity = type == 'enemy' ? new _enemy2['default'](props) : new _energy2['default'](props);

			return entity;
		}
	}]);

	return Game;
})();

exports['default'] = Game;
module.exports = exports['default'];
},{"./background":1,"./core":3,"./enemy":4,"./energy":5,"./particle":7,"./shield":8}],7:[function(require,module,exports){
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

var Particle = (function (_Circle) {
	_inherits(Particle, _Circle);

	function Particle(props) {
		_classCallCheck(this, Particle);

		_get(Object.getPrototypeOf(Particle.prototype), 'constructor', this).call(this, props);

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.fadeStep = props.fadeStep || 0;
	}

	_createClass(Particle, [{
		key: 'move',
		value: function move() {
			this.x += this.speedX;
			this.y += this.speedY;
		}
	}, {
		key: 'fade',
		value: function fade() {
			this.opacity -= this.fadeStep;
		}
	}, {
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Particle draw function: canvas is %s', canvas);
				return;
			}

			_get(Object.getPrototypeOf(Particle.prototype), 'render', this).call(this, canvas);
		}
	}]);

	return Particle;
})(_circle2['default']);

exports['default'] = Particle;
module.exports = exports['default'];
},{"./circle":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Shiled = (function () {
	function Shiled(props) {
		_classCallCheck(this, Shiled);

		props || (props = {});

		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.width = props.width || 1;
		this.color = props.color || 'black';
		this.startRadian = props.startRadian || 0;
		this.radian = props.radian || Math.PI;
	}

	_createClass(Shiled, [{
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Shiled draw function: canvas is %s', canvas);
				return;
			}

			var context = canvas.getContext('2d');

			context.save();

			context.strokeStyle = this.color;
			context.lineWidth = this.width;

			context.beginPath();
			context.arc(this.x, this.y, this.radius, this.startRadian, this.startRadian + this.radian, true);
			context.stroke();

			context.restore();
		}
	}]);

	return Shiled;
})();

exports['default'] = Shiled;
module.exports = exports['default'];
},{}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsGame = require('./components/game');

var _componentsGame2 = _interopRequireDefault(_componentsGame);

var canvas = document.querySelector('.canvas');

var game = new _componentsGame2['default'](canvas);

game.start();
},{"./components/game":6}]},{},[9]);
