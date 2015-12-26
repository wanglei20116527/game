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

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var Core = (function (_Entity) {
	_inherits(Core, _Entity);

	function Core(props) {
		_classCallCheck(this, Core);

		_get(Object.getPrototypeOf(Core.prototype), 'constructor', this).call(this, props);

		this.type = _entity2['default'].CORE;

		this.boundaryColor = props.boundaryColor || 'black';
		this.boundaryWidth = props.boundaryWidth || 0;

		this.life = props.life || props.energy || 100;
	}

	_createClass(Core, [{
		key: 'smash',
		value: function smash() {
			if (this.isSmashed) {
				return;
			}

			var NUMBER_FRAGMENTS = 60;

			var RADINA_UNIT = Math.PI * 2 / NUMBER_FRAGMENTS;

			for (var i = 0; i <= NUMBER_FRAGMENTS; ++i) {
				var x = this.x + parseInt(Math.random() * 6) - 3;
				var y = this.y + parseInt(Math.random() * 6) - 3;

				var radian = i * RADINA_UNIT;
				var speed = Math.random() * 0.5 + 0.5;
				var speedX = speed * Math.sin(radian);
				var speedY = speed * Math.cos(radian);

				this.fragments.push(new _particle2['default']({
					x: x,
					y: y,
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

		// canDestory(){
		// 	if( !this.isSmashed ){
		// 		return false;
		// 	}

		// 	return this.fragments.every(function( fragment ){
		// 		return fragment.opacity < 0;
		// 	});
		// }

	}, {
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Core render function: canvas is %s', canvas);
				return;
			}

			if (this.isSmashed || this.life <= 0) {
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

	return Core;
})(_entity2['default']);

exports['default'] = Core;
module.exports = exports['default'];
},{"./entity":4,"./particle":6}],4:[function(require,module,exports){
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

var EntityType = {
	CORE: 0,
	ENERGY: 1,
	ENEMY: 2
};

exports.EntityType = EntityType;

var Entity = (function (_Circle) {
	_inherits(Entity, _Circle);

	function Entity(props) {
		_classCallCheck(this, Entity);

		_get(Object.getPrototypeOf(Entity.prototype), 'constructor', this).call(this, props);

		this.type = props.type || EntityType.ENEMY;

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.enery = props.enery || props.radius || 0;

		this.fragments = [];

		this.isSmashed = false;
	}

	_createClass(Entity, [{
		key: 'move',
		value: function move() {
			this.x += this.speedX;
			this.y += this.speedY;
		}
	}, {
		key: 'moveFragments',
		value: function moveFragments() {
			this.fragments.forEach(function (fragment) {
				fragment.move();
			});
		}
	}, {
		key: 'fadeFragments',
		value: function fadeFragments() {
			this.fragments.forEach(function (fragment) {
				fragment.fade();
			});
		}
	}, {
		key: 'canDestory',
		value: function canDestory() {
			if (!this.isSmashed) {
				return false;
			}

			return this.fragments.every(function (fragment) {
				return fragment.opacity < 0;
			});
		}
	}, {
		key: 'smash',
		value: function smash() {
			if (this.isSmashed) {
				return;
			}

			this.fragments = [];

			var NUMBER_FRAGMENTS = parseInt(this.radius * 2);

			var RADIAN_UNIT = Math.PI / 4 / NUMBER_FRAGMENTS;

			var speed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));

			for (var i = 0; i <= NUMBER_FRAGMENTS; ++i) {
				var speedTmp = speed * (Math.random() * 0.2 + 0.6);

				var speedX = speedTmp * Math.sin(i * RADIAN_UNIT) * (this.speedX > 0 ? -1 : 1);
				var speedY = speedTmp * Math.cos(i * RADIAN_UNIT) * (this.speedY > 0 ? -1 : 1);

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
		key: 'renderFragments',
		value: function renderFragments(canvas) {
			this.isSmashed && this.fragments.forEach(function (fragment) {
				fragment.render(canvas);
			});
		}
	}, {
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Core renderFragments: canvas is %s', canvas);
				return;
			}

			if (this.isSmashed) {
				return;
			}

			_get(Object.getPrototypeOf(Entity.prototype), 'render', this).call(this, canvas);
		}
	}]);

	return Entity;
})(_circle2['default']);

exports['default'] = Entity;
},{"./circle":2,"./particle":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _shield = require('./shield');

var _shield2 = _interopRequireDefault(_shield);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

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

var _events = {};

var Game = (function () {
	function Game(canvas, gameOverCallback) {
		_classCallCheck(this, Game);

		this.canvas = canvas;
		this.gameOverCallback = gameOverCallback;

		this.background = null;
		this.shield = null;
		this.core = null;
		this.entities = [];

		this.isPending = false;
		this.isStop = false;

		this.initComponents();
		this.initEvents();

		window.game = this;
	}

	_createClass(Game, [{
		key: 'destructor',
		value: function destructor() {
			this.canvas = null;
			this.background = null;
			this.shield = null;
			this.core = null;
			this.entities = null;
			this.isPending = false;
			this.isStop = false;

			this.clearEvents();
		}
	}, {
		key: 'initComponents',
		value: function initComponents() {
			this.initBackground();
			this.initShield();
			this.initCore();
			this.initEntities();
		}
	}, {
		key: 'initBackground',
		value: function initBackground() {
			var context = this.canvas.getContext('2d');

			var backgroundColor = context.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, 100, this.canvas.width / 2, this.canvas.height / 2, Math.sqrt(Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)));

			backgroundColor.addColorStop(0, '#004646');
			backgroundColor.addColorStop(0.25, '#002B2E');
			backgroundColor.addColorStop(0.5, '#001E22');
			backgroundColor.addColorStop(1, '#001217');

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
				enery: 100
			});
		}
	}, {
		key: 'initEntities',
		value: function initEntities() {
			this.entities = [];
		}
	}, {
		key: 'initEvents',
		value: function initEvents() {
			this.initCanvasEvents();
		}
	}, {
		key: 'initCanvasEvents',
		value: function initCanvasEvents() {
			_events.mousemove = (function (evt) {
				var center = {
					x: this.canvas.width / 2,
					y: this.canvas.height / 2
				};

				var position = {
					x: evt.offsetX,
					y: evt.offsetY
				};

				this.shield.startRadian = calculateRadian(position, center);
			}).bind(this);

			this.canvas.addEventListener('mousemove', _events.mousemove, false);
		}
	}, {
		key: 'clearEvents',
		value: function clearEvents() {
			this.clearCanvasEvents();
		}
	}, {
		key: 'clearCanvasEvents',
		value: function clearCanvasEvents() {
			this.canvas.removeEventListener('mousemove', _events.mousemove, false);
		}
	}, {
		key: 'start',
		value: function start() {
			var _this = this;

			this.isPending = true;

			var renderProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.isPending && this.render();
				requestAnimationFrame(renderProxy);
			}).bind(this);
			renderProxy();

			var createEntityProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.isPending && this.createEntity();
				setTimeout(createEntityProxy.bind(this), 1000 + parseInt(Math.random() * 500));
			}).bind(this);
			createEntityProxy();

			var recycleProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.recycle();
				requestAnimationFrame(recycleProxy);
			}).bind(this);
			recycleProxy();

			var detectCollisionProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.isPending && this.detectCollision();
				requestAnimationFrame(detectCollisionProxy);
			}).bind(this);
			detectCollisionProxy();

			if (this.gameOverCallback && typeof this.gameOverCallback == 'function') {
				(function () {
					var detectGameOverProxy = (function () {
						var isGameOver = this.isGameOver;

						isGameOver && this.gameOverCallback && this.gameOverCallback();
						isGameOver || requestAnimationFrame(detectGameOverProxy);
					}).bind(_this);
					detectGameOverProxy();
				})();
			}
		}
	}, {
		key: 'pause',
		value: function pause() {
			this.isPending = false;
		}
	}, {
		key: 'restart',
		value: function restart() {
			this.isPending = true;
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.isStop = true;
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
			this.renderEntities();
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

			if (this.core.isSmashed) {
				this.core.fadeFragments();
				this.core.moveFragments();
				this.core.renderFragments(this.canvas);
			} else {
				this.core.render(this.canvas);
			}
		}
	}, {
		key: 'renderEntities',
		value: function renderEntities() {
			this.entities || this.initEntities();

			this.entities.forEach((function (entity) {
				if (entity.isSmashed) {
					entity.fadeFragments();
					entity.moveFragments();

					entity.renderFragments(this.canvas);
				} else {
					entity.move();

					entity.render(this.canvas);
				}
			}).bind(this));
		}
	}, {
		key: 'recycle',
		value: function recycle() {
			this.recyleEntities();
		}
	}, {
		key: 'recyleEntities',
		value: function recyleEntities() {
			var toRetain = [];

			this.entities.forEach((function (entity) {
				if (!entity.canDestory() && !this.isOutBoundary(entity)) {
					toRetain.push(entity);
				}
			}).bind(this));

			this.entities = toRetain;
		}
	}, {
		key: 'isOutBoundary',
		value: function isOutBoundary(entity) {
			var canvasWidth = this.canvas.width;
			var canvasHeight = this.canvas.height;

			if (entity.x + entity.radius >= 0 && entity.x - entity.radius <= canvasWidth && entity.y + entity.radius >= 0 && entity.y - entity.radius <= canvasWidth) {

				return false;
			}

			return true;
		}
	}, {
		key: 'detectCollision',
		value: function detectCollision() {
			this.entities.forEach((function (entity) {
				if (entity.isSmashed) {
					return;
				}

				if (this.detectCollisionWithShield(entity)) {
					entity.smash();
					return;
				}

				if (this.detectCollisionWithCore(entity) && !this.core.isSmashed) {
					entity.smash();

					switch (entity.type) {
						case _entity.EntityType.ENEMY:
							this.core.radius -= entity.radius;
							break;

						case _entity.EntityType.ENERGY:
							this.core.radius += entity.radius;
							break;
					}

					this.core.radius < 0 && this.core.smash();
					return;
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
			if (this.core.life <= 0) {
				return false;
			}

			var isCollision = false;

			var distanceToCenter = Math.sqrt(Math.pow(this.core.x - entity.x, 2) + Math.pow(this.core.y - entity.y, 2));

			isCollision = distanceToCenter - entity.radius < this.core.radius;

			return isCollision;
		}
	}, {
		key: 'isGameOver',
		value: function isGameOver() {
			return this.core.canDestory();
		}
	}, {
		key: 'createEntity',
		value: function createEntity() {
			var canvasWidth = this.canvas.width;
			var canvasHeight = this.canvas.height;
			var canvasCenter = {
				x: canvasWidth / 2,
				y: canvasHeight / 2
			};

			var type = undefined;
			var color = undefined;
			switch (parseInt(Math.random() * 5)) {
				case 0:
				case 1:
				case 2:
				case 3:
					type = _entity.EntityType.ENEMY;
					color = 'red';
					break;

				case 4:
					type = _entity.EntityType.ENERGY;
					color = '#14DC93';
					break;
			}

			var x = 0;
			var y = 0;
			switch (parseInt(Math.random() * 3)) {
				case 0:
					x = parseInt(canvasWidth * Math.random());
					y = 0;
					break;
				case 1:
					x = canvasWidth;
					y = parseInt(canvasHeight * Math.random());
					break;
				case 2:
					x = parseInt(canvasWidth * Math.random());
					y = canvasHeight;
					break;
				case 3:
					x = 0;
					y = parseInt(canvasHeight * Math.random());
					break;
			}

			var radius = parseInt(Math.random() * 3) + 4;

			var speedX = 0;
			var speedY = 0;
			var speedRatio = 1;
			if (Math.abs(canvasCenter.x - x) > Math.abs(canvasCenter.y - y)) {
				speedRatio = Math.abs((canvasCenter.y - y) / (canvasCenter.x - x));
				speedX = (1 + Math.random()) * (canvasCenter.x > x ? 1 : -1);
				speedY = Math.abs(speedX * speedRatio) * (canvasCenter.y > y ? 1 : -1);
			} else {
				speedRatio = Math.abs((canvasCenter.x - x) / (canvasCenter.y - y));
				speedY = (1 + Math.random()) * (canvasCenter.y > y ? 1 : -1);
				speedX = Math.abs(speedY * speedRatio) * (canvasCenter.x > x ? 1 : -1);
			}

			this.entities.push(new _entity2['default']({
				type: type,
				x: x,
				y: y,
				radius: radius,
				opacity: 1,
				color: color,
				speedX: speedX,
				speedY: speedY
			}));
		}
	}]);

	return Game;
})();

exports['default'] = Game;
module.exports = exports['default'];
},{"./background":1,"./core":3,"./entity":4,"./particle":6,"./shield":7}],6:[function(require,module,exports){
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
},{"./circle":2}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsGame = require('./components/game');

var _componentsGame2 = _interopRequireDefault(_componentsGame);

var canvas = document.querySelector('.canvas');

var game = new _componentsGame2['default'](canvas);

game.start();

// game.renderBackground();
},{"./components/game":5}]},{},[8]);
