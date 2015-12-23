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