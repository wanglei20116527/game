import Circle from './circle';

export default class Enemy extends Circle{
	constructor( canvas, props ){
		super( canvas, props );

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;
		this.accelecateX = props.accelecateX || 0;
		this.accelecateY = props.accelecateX || 0;

		this.damage = props.damage || props.radius || 4;
	}
}