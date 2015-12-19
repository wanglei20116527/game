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