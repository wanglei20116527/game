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

		this.fragments = [];

		this.isSmashed = false;
	}

	_createClass(Core, [{
		key: 'moveFragemets',
		value: function moveFragemets() {
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
		key: 'smash',
		value: function smash() {
			var NUMBER_FRAGMENTS = 180;

			var RADINA_UNIT = Math.PI / NUMBER_FRAGMENTS;

			for (var i = 0; i < NUMBER_FRAGMENTS; ++i) {}

			this.isSmashed = true;
		}
	}, {
		key: 'renderFragments',
		value: function renderFragments(canvas) {
			if (!canvas) {
				console.error('Core renderFragments: canvas is %s', canvas);
				return;
			}

			this.fragments.forEach(function (fragment) {
				fragment.render(canvas);
			});
		}
	}]);

	return Core;
})(_circle2['default']);

exports['default'] = Core;
module.exports = exports['default'];