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

var cancelAnimationFrame = (function () {
	return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (fd) {
		clearTimeout(fd);
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
		this.gameOverCallback = gameOverCallback || null;

		this.init();
	}

	_createClass(Game, [{
		key: 'init',
		value: function init() {
			this.background = null;
			this.shield = null;
			this.core = null;
			this.entities = [];

			this.isPending = false;
			this.isStop = false;

			this.initComponents();
			this.initEvents();

			this._renderFD = null;
			this._recycleFD = null;
			this._createEntityFD = null;
			this._detectCollisionFD = null;
			this._detectGameOverFD = null;

			this.renderBackground();
		}
	}, {
		key: 'destructor',
		value: function destructor() {
			this.background = null;
			this.shield = null;
			this.core = null;
			this.entities = null;
			this.isPending = false;
			this.isStop = false;

			this.clearEvents();

			this.clearCanvas();
			this.canvas = null;
			this.gameOverCallback = null;

			this._renderFD !== null && cancelAnimationFrame(this._renderFD);
			this._recycleFD !== null && cancelAnimationFrame(this._recycleFD);
			this._createEntityFD !== null && clearTimeout(this._createEntityFD);
			this._detectCollisionFD !== null && cancelAnimationFrame(this._detectCollisionFD);
			this._detectGameOverFD !== null && cancelAnimationFrame(this._detectGameOverFD);

			this._renderFD = null;
			this._recycleFD = null;
			this._createEntityFD = null;
			this._detectCollisionFD = null;
			this._detectGameOverFD = null;
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
			backgroundColor.addColorStop(0.3, '#002B2E');
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
		key: 'clearCanvas',
		value: function clearCanvas() {
			var context = this.canvas.getContext('2d');
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
				this._renderFD = requestAnimationFrame(renderProxy);
			}).bind(this);
			renderProxy();

			var createEntityProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.isPending && this.createEntity();
				this._createEntityFD = setTimeout(createEntityProxy.bind(this), 1000 + parseInt(Math.random() * 500));
			}).bind(this);
			createEntityProxy();

			var recycleProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.recycle();
				this._recycleFD = requestAnimationFrame(recycleProxy);
			}).bind(this);
			recycleProxy();

			var detectCollisionProxy = (function () {
				if (this.isGameOver()) {
					return;
				}

				this.isPending && this.detectCollision();
				this._detectCollisionFD = requestAnimationFrame(detectCollisionProxy);
			}).bind(this);
			detectCollisionProxy();

			if (this.gameOverCallback && typeof this.gameOverCallback == 'function') {
				(function () {
					var detectGameOverProxy = (function () {
						var isGameOver = this.isGameOver();

						isGameOver && this.gameOverCallback && this.gameOverCallback();
						isGameOver || (this._detectGameOverFD = requestAnimationFrame(detectGameOverProxy));
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

			this.clearCanvas();

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
							if (this.core.radius <= entity.radius) {
								this.core.radius = 0;
							} else {
								this.core.radius = Math.sqrt((this.core.area() - entity.area()) / Math.PI);
							}
							break;

						case _entity.EntityType.ENERGY:
							this.core.radius = Math.sqrt((this.core.area() + entity.area()) / Math.PI);
							break;
					}

					this.core.radius <= 0 && this.core.smash();
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