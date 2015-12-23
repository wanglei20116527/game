import Circle from './circle';

export default class Particle extends Circle {
	constructor( props ){
		super( props );

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.fadeStep = props.fadeStep || 0;
	}

	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}

	fade(){
		this.opacity -= this.fadeStep;
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Particle draw function: canvas is %s', canvas );
			return;
		}

		super.render( canvas );
	}
}