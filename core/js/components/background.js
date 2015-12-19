'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Background = (function () {
	function Background(canvas, props) {
		_classCallCheck(this, Background);

		this.canvas = canvas;

		this.color = props.color || 'black';
	}

	_createClass(Background, [{
		key: 'draw',
		value: function draw() {
			if (!this.canvas) {
				console.error('Background draw function: canvas is %s', this.canvas);
				return;
			}

			var context = this.canvas.getContext('2d');

			context.save();

			context.fillStyle = this.color;
			context.fillRect(0, 0, this.canvas.width, this.canvas.height);

			context.restore();
		}
	}]);

	return Background;
})();

exports['default'] = Background;
module.exports = exports['default'];