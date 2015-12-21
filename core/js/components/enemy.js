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

var Enemy = (function (_Circle) {
	_inherits(Enemy, _Circle);

	// static Status = {
	// 	ALIVE: 'ALIVE',
	// 	DIED: 'DIED',
	// 	DYING: 'DYING'
	// };

	function Enemy(props) {
		_classCallCheck(this, Enemy);

		_get(Object.getPrototypeOf(Enemy.prototype), 'constructor', this).call(this, props);

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.damage = props.damage || props.radius || 4;

		// this.status = Enemy.Status.ALIVE;

		// this.fragments = [];
	}

	// die(){
	// 	this.status = Enemy.Status.DYING;

	// 	const number_fragments = this.radius * 2;

	// 	for( let i = 0; number_fragments; ++i ){
	// 		let props = {
	// 			x: this.x,
	// 			y: this.y,
	// 			radius: 1,
	// 			opactiy: 1,
	// 			color: this.color,
	// 			fadeStep: parseInt( Math.random() * 4 ) + 2,
	// 			speedX: this.speedX * ( -0.5 - Math.random() ),
	// 			speedY: this.speedY * ( -0.5 - Math.random() )
	// 		};

	// 		this.fragments.push( new Particle( props ) );
	// 	}
	// }

	// isCompleteDied(){
	// 	if( this.status == Enemy.Status.DIED ){
	// 		return true;
	// 	}

	// 	let isCompleteDied = false;

	// 	if( this.status == Enemy.Status.DYING ){
	// 		isCompleteDied = this.fragments.every(function( fragment ){
	// 			return fragment.opactiy < 0;
	// 		});
	// 	}

	// 	isCompleteDied && ( this.status = Enemy.Status.DIED );

	// 	return isCompleteDied;
	// }

	_createClass(Enemy, [{
		key: 'render',
		value: function render(canvas) {
			if (!canvas) {
				console.error('Enemy draw function: canvas is %s', canvas);
				return;
			}

			_get(Object.getPrototypeOf(Enemy.prototype), 'render', this).call(this, canvas);

			// switch( this.status ){
			// 	case Enemy.Status.ALIVE:
			// 		super.render( canvas );
			// 		break;

			// 	case Enemy.Status.DYING:
			// 		this.renderFragments( canvas );
			// 		break;

			// 	case Enemy.Status.DIED:
			// 		console.log( 'The Enemy is died' );
			// 		break;

			// 	default:
			// 		console.error( 'The status %s of Enemy is not valid', this.status );
			// }
		}

		// renderFragments( canvas ){
		// 	this.fragments.forEach(function( fragment ){
		// 		fragment.render( canvas );
		// 	});
		// }
	}]);

	return Enemy;
})(_circle2['default']);

exports['default'] = Enemy;
module.exports = exports['default'];