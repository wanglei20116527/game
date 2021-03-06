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