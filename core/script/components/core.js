import Circle from './circle';

let count_renderd = 0;
let RENDER_CYCLE = 360;

export default class Core extends Circle{
	constructor( props ){
		super( props );

		this.boundaryColor   = props.boundaryColor || 'black';
		this.boundaryWidth  = props.boundaryWidth|| 0;
		
		this.life = props.life || 100;
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Core render: canvas is %s', canvas );
			return;
		}

		super.render( canvas );
	}
}