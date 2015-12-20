export default class Background {
	constructor( props ){
		props || ( props = {} );

		this.color = props.color|| 'black';
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Background draw function: canvas is %s', canvas );
			return;
		}

		let context = canvas.getContext( '2d' );

		context.save();

		context.fillStyle = this.color;
		context.fillRect( 0, 0, canvas.width, canvas.height );
		
		context.restore();
	}
}