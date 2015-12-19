import Circle from './circle';

export default class Core extends Circle{
	constructor( canvas, props ){
		super( canvas, props );

		this.life = props.life || 100;
	}

	draw(){
		if( !this.canvas ){
			console.error( 'Core draw: canvas is %s', this.canvas );
			return;
		}

		super.draw();
	}
}