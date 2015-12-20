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