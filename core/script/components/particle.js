import Circle from './circle';

export default class Particle extends Circle {
	constructor( props ){
		super( props );

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.fadeStep = props.fadeStep || 0;
	}
}