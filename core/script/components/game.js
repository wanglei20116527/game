import Shield from './shield';
import Enemy from './enemy';
import Energy from './energy';
import Particle from './particle';
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

let calculateRadian = function( position, center ){
	let x = position.x;
	let y = position.y;

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

	return radian;
}

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
		this.initParticles();
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

	initParticles(){
		this.particles = [];
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

			let position = {
				x: evt.offsetX,
				y: evt.offsetY
			};

			this.shield.startRadian = calculateRadian( position, center );

		}.bind(this), false);	
	}

	start(){
		let renderGame = function(){
			this.render();
			requestAnimationFrame( renderGame );
		}.bind(this);
		renderGame();

		let enemyAndEnergyFactory = function(){
			let entity = this.createEnemyOrEnergy() ;
			if( entity instanceof Enemy ){
				this.enemies.push(  entity ) ;	
			}else{
				this.energies.push( entity );
			}
			setTimeout( enemyAndEnergyFactory.bind(this), 1000 + parseInt( Math.random() * 500 ) );
		}.bind(this);
		enemyAndEnergyFactory();

		let detectCollisionProxy = function(){
			this.detectCollision();
			requestAnimationFrame( detectCollisionProxy );
		}.bind(this);
		detectCollisionProxy();
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
		this.renderParticles();
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
			// if(  enemy.isCompleteDied() ){
			// 	return;
			// }

			// switch( enemy.status ){
			// 	case Enemy.Status.ALIVE:
			// 		enemy.x += enemy.speedX;
			// 		enemy.y += enemy.speedY;

			// 		if( enemy.x  > 0 && enemy.x < canvasWidth 
			// 			&& enemy.y > 0  && enemy.y < canvasHeight ){
			// 			enemy.die();
			// 		}

			// 		break;
			// }

			enemy.x += enemy.speedX;
			enemy.y += enemy.speedY;

			if( enemy.x  > 0 && enemy.x < canvasWidth 
				&& enemy.y > 0  && enemy.y < canvasHeight ){
				
				enemy.render( this.canvas );
				toRetain.push( enemy );
			}
	
		}.bind(this));

		// this.enemies = toRetain;
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

	renderParticles(){
		let canvasWidth  = this.canvas.width;
		let canvasHeight = this.canvas.height;

		let toRetain = [];

		this.particles.forEach(function( particle, index ){
			particle.opacity -= particle.fadeStep;

			if( opacity.opacity > 0 
				&& particle.x > 0 && particle.x < canvasWidth
					&&  particle.y > 0 && particle.y < canvasHeight ){

				particle.render( this.canvas );
				toRetain.push( particle );
			}
		}.bind(this) );

		this.particles = toRetain;
	}

	detectCollision(){
		this.enemies.forEach(function( enemy, index ){
			if( this.detectCollisionWithShield( enemy ) 
				|| this.detectCollisionWithCore( enemy ) ){

				enemy.speedX *= -1;
				enemy.speedY *= -1;
			}

		}.bind(this) );

		this.energies.forEach(function( energy, index ){
			if( this.detectCollisionWithShield( energy ) 
				|| this.detectCollisionWithCore( energy ) ){
				
				energy.speedX *= -1;
				energy.speedY *= -1;
			}

		}.bind(this));
	}

	detectCollisionWithShield( entity ){
		let isCollision = false;

		let center = {
			x: this.canvas.width / 2,
			y: this.canvas.height / 2
		};

		let distanceToCenter = Math.sqrt( 	Math.pow( entity.x - center.x, 2 ) +
							Math.pow( entity.y - center.y, 2 ) );

		if( distanceToCenter - entity.radius > this.shield.radius + this.shield.width 
			|| distanceToCenter + entity.radius < this.shield.radius ){

			isCollision = false;
		}else{
			let radian = calculateRadian({
				x: entity.x,
				y: entity.y
			}, center );

			let shieldStartRadian = this.shield.startRadian -  this.shield.radian / 2;
			let shieldEndRadian   = this.shield.startRadian + this.shield.radian / 2;

			if( shieldStartRadian < 0 ){
				shieldStartRadian = Math.PI * 2 + shieldStartRadian;
				isCollision = ( radian >= shieldStartRadian
						|| radian <= shieldEndRadian ) ? true: false;

			}else if( shieldEndRadian > Math.PI * 2 ){
				shieldEndRadian -= Math.PI * 2;
				isCollision = ( radian <= shieldEndRadian 
						|| radian >= shieldStartRadian ) ? true : false;

			}else{
				isCollision = ( radian >= shieldStartRadian 
						&& radian <= shieldEndRadian ) ? true : false;
			}
		}

		return isCollision;
	}

	detectCollisionWithCore( entity ){
		let isCollision = false;

		let distanceToCenter = Math.sqrt( Math.pow( this.core.x - entity.x, 2 ) 
							+ Math.pow( this.core.y - entity.y, 2 ) );

		isCollision = distanceToCenter -  entity.radius < this.core.radius;

		return isCollision;
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

		let entity = ( type == 'enemy' ) ? ( new Enemy( props ) ): ( new Energy( props ) );

		return entity;
	}

	createParticle(){

	}
}

