export default class Background {
	constructor( canvas, props ){
		this.canvas = canvas;

		this.color = props.color|| 'black';
	}

	draw(){
		if( !this.canvas ){
			console.error( 'Background draw function: canvas is %s', this.canvas );
			return;
		}

		let context = this.canvas.getContext( '2d' );

		context.save();

		context.fillStyle = this.color;
		context.fillRect( 0, 0, this.canvas.width, this.canvas.height );
		
		context.restore();
	}
}