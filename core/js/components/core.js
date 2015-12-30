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