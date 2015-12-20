import Shield from './shield';
import Enemy from './enemy';
import Energy from './energy';
import Background from './background';
import Core from './core';

let requestAnimationFrame = (function(){
	return 	window.requestAnimationFrame               ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame      ||
		window.oRequestAnimationFrame            ||
		window.msRequestAnimationFrame         ||
		function( callback ){
			return setTimeout(callback, 1000 / 60 );
		}
})();

export default class Game{
	constructor( canvas ){
		this.canvas = canvas;

		this.initComponents();
		this.initEvents();
	}

	initComponents(){
		this.initBackground();
		this.initShield();
		this.initCore();
		this.initEnemies();
		this.initEnergies();
	}

	initBackground(){
		let context = this.canvas.getContext( '2d' );

		let backgroundColor = context.createRadialGradient( 	this.canvas.width / 2, 
									this.canvas.height / 2, 
						          			100, 
						          			this.canvas.width / 2, 
						          			this.canvas.height / 2, 
						          			Math.sqrt( Math.pow( this.canvas.width, 2 ) + Math.pow( this.canvas.height, 2 ) ) );

		backgroundColor.addColorStop( 0, '#004545' );
		backgroundColor.addColorStop( 0.5, '#003839' );
		backgroundColor.addColorStop( 0.75, '#002D2F' );
		backgroundColor.addColorStop( 1, '#001B1F' );

		this.background = new Background({
			color: backgroundColor
		});
	}

	initShield(){
		this.shield = new Shield({
			x: this.canvas.width / 2,
			y: this.canvas.height / 2,
			radius: 60,
			width: 3,
			color: '#648D93',
			startRadian: 0,
			radian: Math.PI
		});
	}

	initCore(){
		this.core = new Core({
			x: this.canvas.width   / 2 ,
			y: this.canvas.height / 2 ,
			radius: 15,
			color: '#19CABB',
			boundaryColor: 'yellow',
			boundaryWidth: 2,
			life: 100
		});
	}

	initEnemies(){
		this.enemies = [];
	}

	initEnergies(){
		this.energies = [];
	}

	initEvents(){
		this.initCanvasEvents();
	}

	initCanvasEvents(){
		this.canvas.addEventListener('mousemove', function( evt ){
			let center = {
				x: this.canvas.width / 2,
				y:  this.canvas.height / 2
			}

			let x = evt.offsetX;
			let y = evt.offsetY;

			let offset  = {
				x: center.x - x,
				y: center.y - y
			};

			let radian = 0;

			if( x == center.x  ){
				radian = ( y < center.y ) ? 0 : Math.PI;

			}else if( y == center.y ){
				radian = ( x > center.x ) ? Math.PI / 2 : Math.PI * 3 / 2;

			}else if( x > center.x && y < center.y ){
				radian = Math.atan( offset.x / -offset.y );

			}else if( x > center.x && y > center.y ){
				radian = Math.atan(offset. y / offset.x ) + Math.PI / 2;

			}else if( x < center.x && y > center.y ){
				radian = Math.atan( -offset.x / offset.y ) + Math.PI;

			}else{
				radian = Math.atan( offset.y / offset.x ) + Math.PI * 3 / 2;
			}

			this.shield.startRadian = radian;
			
		}.bind(this), false);	
	}

	start(){
		let renderGame = function(){
			this.render();
			requestAnimationFrame( renderGame );
		}.bind(this);
		renderGame();

		let enemyAndEnergyFactory = function(){
			let entry = this.createEnemyOrEnergy() ;
			if( entry instanceof Enemy ){
				this.enemies.push(  entry ) ;	
			}else{
				this.energies.push( entry );
			}
			setTimeout( enemyAndEnergyFactory.bind(this), 1000 + parseInt( Math.random() * 500 ) );
		}.bind(this);
		enemyAndEnergyFactory();
	}

	pause(){
		this.isPending = false;
	}

	render(){
		if( !this.canvas ){
			console.error( 'Word draw: canvas is %s', this.canvas );
			return;
		}

		let context = this.canvas.getContext( '2d' );
		context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		this.renderBackground();
		this.renderShield();
		this.renderCore();
		this.renderEnemies();
		this.renderEnergies();
	}

	renderBackground(){
		this.background || this.initBackground();
		this.background.render( this.canvas );
	}

	renderShield(){
		this.shield || this.initShield();
		this.shield.render( this.canvas );
	}

	renderCore(){
		this.core || this.initCore();
		this.core.render( this.canvas );
	}

	renderEnemies(){
		let canvasWidth  = this.canvas.width;
		let canvasHeight = this.canvas.height;

		let toRetain = [];

		this.enemies.forEach(function( enemy, index ){
			enemy.x += enemy.speedX;
			enemy.y += enemy.speedY;

			if( enemy.x  > 0 && enemy.x < canvasWidth 
				&& enemy.y > 0  && enemy.y < canvasHeight ){
				
				enemy.render( this.canvas );
				toRetain.push( enemy );
			}
		}.bind(this));

		this.enemies = toRetain;
	}

	renderEnergies(){
		let canvasWidth  = this.canvas.width;
		let canvasHeight = this.canvas.height;

		let toRetain = [];
		this.energies.forEach(function( energy, index ){
			energy.x += energy.speedX;
			energy.y += energy.speedY;

			if( energy.x  > 0 && energy.x < canvasWidth 
				&& energy.y > 0  && energy.y < canvasHeight ){
				
				energy.render( this.canvas );
				toRetain.push( energy );
			}
		}.bind(this));

		this.energies = toRetain;
	}

	createEnemyOrEnergy(){
		let canvasWidth  = this.canvas.width;
		let canvasHeight = this.canvas.height; 
		let canvasCenter = {
			x: canvasWidth / 2,
			y: canvasHeight / 2
		};

		let type = 'enemy';
		switch( parseInt( Math.random() * 5 ) ){
			case 0:
			case 1:
			case 2:
			case 3:
				type = 'enemy';
				break;

			case 4:
				type = 'energy';
				break; 
		}

		let color =  type == 'enemy' ? 'red' : '#14DC93';
		let radius = parseInt( Math.random() * 3  ) + 4;

		let position = {};
		switch( parseInt( Math.random() * 3 ) ){
			case 0:
				position.x =  parseInt( canvasWidth * Math.random() );
				position.y = 0;
				break;
			case 1:
				position.x = canvasWidth;
				position.y = parseInt( canvasHeight * Math.random() );
				break;
			case 2: 
				position.x = parseInt( canvasWidth * Math.random() );
				position.y = canvasHeight;
				break;
			case 3: 
				position.x = 0;
				position.y =  parseInt( canvasHeight * Math.random() );
				break;
		}

		let speedX = 0;
		let speedY = 0;
		let speedRatio = 1;
		if( Math.abs( canvasCenter.x  - position.x)  > Math.abs( canvasCenter.y - position.y ) ){
			speedRatio = Math.abs( ( canvasCenter.y - position.y ) / ( canvasCenter.x - position.x )  );
			speedX = ( 1 + Math.random() ) * ( canvasCenter.x > position.x ? 1: -1);
			speedY = Math.abs( speedX * speedRatio ) * ( canvasCenter.y > position.y ? 1: -1 );
		}else{
			speedRatio = Math.abs( ( canvasCenter.x - position.x ) / ( canvasCenter.y - position.y )  );
			speedY = ( 1 + Math.random() ) * ( canvasCenter.y > position.y ? 1: -1);
			speedX = Math.abs( speedY * speedRatio ) * ( canvasCenter.x > position.x ? 1: -1 );
		}

		let props = {
			color: color,
			x: position.x,
			y: position.y,
			radius: radius,
			speedX: speedX,
			speedY: speedY,
		};

		( type == 'enemy') ? ( props.damage = radius ) : ( props.energy = radius );

		let entry = ( type == 'enemy' ) ? ( new Enemy( props ) ): ( new Energy( props ) );

		return entry;
	}
}

