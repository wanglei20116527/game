import Circle from './circle';

export default class Energy extends Circle{
	constructor( props ){
		super( props );

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;
		this.accelecateX = props.accelecateX || 0;
		this.accelecateY = props.accelecateX || 0;

		this.enery = props.enery || props.radius || 4;
	}
}