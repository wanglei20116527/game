export default class Shiled {
	constructor( props ){
		props || ( props = {} );
		
		this.x = props.x || 0;
		this.y = props.y || 0;
		this.radius = props.radius || 0;
		this.width = props.width || 1;
		this.color = props.color || 'black';
		this.startRadian =  props.startRadian || 0;
		this.radian = props.radian || Math.PI;
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Shiled draw function: canvas is %s', canvas );
			return;
		}

		let context = canvas.getContext( '2d' );

		context.save();

		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		
		context.beginPath();
		context.arc( this.x, this.y, this.radius, this.startRadian, this.startRadian + this.radian, true );
		context.stroke();
		
		context.restore();
	}
}