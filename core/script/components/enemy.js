import Circle from './circle';
import Particle from './particle';

export default class Enemy extends Circle{
	constructor( props ){
		super( props );

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.damage = props.damage || props.radius || 4;

		this.fragments = [];

		this.isSmashed = false;
	}

	move(){
		if( this.isSmashed ){
			this.fragments.forEach(function( fragment  ){
				fragment.move();
			});
		}else{
			this.x += this.speedX;
			this.y += this.speedY;
		}
	}

	fade(){
		this.fragments.forEach(function( fragment ){
			fragment.fade();
		});
	}

	smash(){
		this.fragments = [];

		const NUMBER_FRAGMENTS = parseInt( this.radius * 1.5 );

		const RADIAN_UNIT = Math.PI / 4 / NUMBER_FRAGMENTS;

		let speed = Math.sqrt( Math.pow( this.speedX, 2 ) 
						+ Math.pow( this.speedY, 2 ) );

		for( let i = 0; i <=  NUMBER_FRAGMENTS; ++i ){
			let speedX = speed * Math.sin(  i * RADIAN_UNIT ) * ( this.speedX > 0 ? -1 : 1 ) * ( Math.random() * 0.2 + 0.6 );
			let speedY = speed * Math.cos( i * RADIAN_UNIT ) * ( this.speedY > 0 ? -1 : 1 ) * ( Math.random() * 0.2 + 0.6 );

			this.fragments.push( new Particle({
				x: this.x,
				y: this.y,
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

	isDie(){
		if( !this.isSmashed ){
			return false;
		}

		return this.fragments.forEach(function( fragment ){
			return fragment.opacity < 0;
		});
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Enemy draw function: canvas is %s', canvas );
			return;
		}
		if( this.isSmashed ){
			this.fragments.forEach(function( fragment ){
				fragment.render( canvas  );
			});
		}else{
			super.render( canvas );
		}
	}
}