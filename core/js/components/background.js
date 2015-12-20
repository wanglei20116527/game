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