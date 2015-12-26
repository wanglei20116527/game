import Circle from './circle';
import Particle from './particle';

export let EntityType = {
	CORE: 0,
	ENERGY: 1,
	ENEMY: 2
};

export default class Entity extends Circle{
	constructor( props ){
		super( props );

		this.type = props.type || EntityType.ENEMY;

		this.speedX = props.speedX || 0;
		this.speedY = props.speedY || 0;

		this.enery = props.enery || props.radius || 0;

		this.fragments = [];

		this.isSmashed = false;
	}

	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}

	moveFragments(){
		this.fragments.forEach(function( fragment ){
			fragment.move();
		});
	}

	fadeFragments(){
		this.fragments.forEach(function( fragment ){
			fragment.fade();
		});
	}

	canDestory(){
		if( !this.isSmashed ){
			return false;
		}

		return this.fragments.every(function( fragment ){
			return fragment.opacity < 0;
		});
	}

	smash(){
		if( this.isSmashed ){
			return;
		}
		
		this.fragments = [];

		const NUMBER_FRAGMENTS = parseInt( this.radius * 2 );

		const RADIAN_UNIT = Math.PI / 4 / NUMBER_FRAGMENTS;

		let speed = Math.sqrt( Math.pow( this.speedX, 2 ) + Math.pow( this.speedY, 2 ) ) ;

		for( let i = 0; i <=  NUMBER_FRAGMENTS; ++i ){
			let speedTmp = speed * ( Math.random() * 0.2 + 0.6 );

			let speedX = speedTmp * Math.sin(  i * RADIAN_UNIT ) * ( this.speedX > 0 ? -1 : 1 );
			let speedY = speedTmp * Math.cos( i * RADIAN_UNIT ) * ( this.speedY > 0 ? -1 : 1 );

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

	renderFragments( canvas ){
		this.isSmashed && this.fragments.forEach(function( fragment ){
			fragment.render( canvas );
		});
	}

	render( canvas ){
		if( !canvas ){
			console.error( 'Core renderFragments: canvas is %s', canvas );
			return;
		}

		if( this.isSmashed ){
			return;
		}

		super.render( canvas );
	}
}