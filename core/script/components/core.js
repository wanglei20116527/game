import Circle from './circle';

let count_renderd = 0;
let RENDER_CYCLE = 360;

export default class Core extends Circle{
	constructor( props ){
		super( props );

		this.boundaryColor   = props.boundaryColor || 'black';
		this.boundaryWidth  = props.boundaryWidth|| 0;
		
		this.life = props.life || 100;

		this.fragments = [];

		this.isSmashed = false;
	}

	moveFragemets(){
		this.fragments.forEach(function( fragment ){
			fragment.move();
		});
	}

	fadeFragments(){
		this.fragments.forEach(function( fragment ){
			fragment.fade();
		});
	}

	smash(){	
		const NUMBER_FRAGMENTS = 180;

		const RADINA_UNIT = Math.PI / NUMBER_FRAGMENTS;

		for( let i = 0; i < NUMBER_FRAGMENTS; ++i ){

		}

		this.isSmashed = true;
	}

	renderFragments( canvas ){
		if( !canvas ){
			console.error( 'Core renderFragments: canvas is %s', canvas );
			return;
		}

		this.fragments.forEach(function( fragment ){
			fragment.render( canvas );
		});
	}
}