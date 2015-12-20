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