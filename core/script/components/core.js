import Entity from './entity';
import Particle from './particle';

import { EntityType } from './entity';

export default class Core extends Entity{
	constructor( props ){
		super( props );

		this.type = Entity.CORE;

		this.boundaryColor  = props.boundaryColor   || 'black';
		this.boundaryWidth = props.boundaryWidth || 0; 

		this.life = props.life || props.energy || 100;
	}

	smash(){
		if( this.isSmashed ){
			return;
		}

		const NUMBER_FRAGMENTS = 60;

		const RADINA_UNIT = Math.PI * 2 / NUMBER_FRAGMENTS;

		for( let i = 0; i <= NUMBER_FRAGMENTS; ++i ){
			let x = this.x + parseInt( Math.random() * 6 )  - 3;
			let y = this.y + parseInt( Math.random() * 6 )  - 3;

			let radian = i * RADINA_UNIT;
			let speed = Math.random() * 0.5 + 0.5;
			let speedX = speed * Math.sin(  radian );
			let speedY=  speed * Math.cos( radian );

			this.fragments.push( new Particle({
				x: x,
				y: y,
				radius: 1,
				opacity: 1,
				color: this.color,
				speedX: speedX,
				speedY: speedY,
				fadeStep: ( parseInt( Math.random() * 2 ) + 1 ) / 100,
			}) );
		}
		
		this.isSmashed = true;
	}

	// canDestory(){
	// 	if( !this.isSmashed ){
	// 		return false;
	// 	}

	// 	return this.fragments.every(function( fragment ){
	// 		return fragment.opacity < 0;
	// 	});
	// }

	render( canvas ){
		if( !canvas ){
			console.error( 'Core render function: canvas is %s', canvas );
			return;
		}

		if( this.isSmashed || this.life <= 0 ){
			return;
		}

		let context = canvas.getContext( '2d' );

		context.save();	
		context.fillStyle = this.color;
		context.globalAlpha = this.opacity >= 0 ? this.opacity : 0;

		context.beginPath();

		context.arc( this.x, this.y, this.radius , 0, Math.PI * 2, false );
		
		context.closePath();

		context.fill();

		context.restore();
	}
}