import Circle from './circle';
import Particle from './particle';

export default class Enemy extends Circle{
	// static Status = {
	// 	ALIVE: 'ALIVE',
	// 	DIED: 'DIED',
	// 	DYING: 'DYING'
	// };

	constructor( props ){
		super( props );

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

	render( canvas ){
		if( !canvas ){
			console.error( 'Enemy draw function: canvas is %s', canvas );
			return;
		}

		super.render( canvas );

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
}