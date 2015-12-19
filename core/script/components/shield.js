export default class Shiled {
	constructor( canvas, props ){
		props || ( props = {} );

		this.canvas = canvas;
		
		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.width = props.width || 1;
		this.color = props.color || 'black';
		this.startAngle =  props.startAngle || 0;
		this.endAngle = props.endAngle || Math.PI * 2;
	}

	draw(){
		if( !this.canvas ){
			console.error( 'Shiled draw function: canvas is %s', this.canvas );
			return;
		}

		let context = this.canvas.getContext( '2d' );

		context.save();

		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		
		context.beginPath();
		context.arc( this.x, this.y, this.radius, this.startAngle, this.endAngle, false );
		context.stroke();
		
		context.restore();
	}
}