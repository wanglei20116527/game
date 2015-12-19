export default class Circle{
	constructor( canvas, props ){
		this.canvas = canvas;

		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.color = props.color || 'black';
	}

	draw(){
		if( !this.canvas ){
			console.error( 'Circle draw function: canvas is %s', this.canvas );
			return;
		}

		let context = this.canvas.getContext( '2d' );

		context.save();

		context.fillStyle = this.color;
		
		context.beginPath();
		context.arc( this.x, this.y, this.radius, 0, Math.PI * 2, false );
		context.closePath();
		context.fill();
		
		context.restore();
	}
}
