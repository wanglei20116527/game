import Circle from './circle';
import Particle from './particle';

export default class Energy extends Circle{
	constructor( props ){
		super( props );

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.enery = props.enery || props.radius || 4;
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Enemy draw function: canvas is %s', canvas );
			return;
		}

		super.render( canvas );
	}
}