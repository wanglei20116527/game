import Shield from './shield';
import Entity from './entity';
import Particle from './particle';
import Background from './background';
import Core from './core';

import { EntityType } from './entity';

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

let cancelAnimationFrame = (function(){
	return 	window.cancelAnimationFrame               ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame      ||
		window.oCancelAnimationFrame            ||
		window.msCancelAnimationFrame         ||
		function( fd ){
			clearTimeout( fd );
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

let _events = {};

export default class Game{
	constructor( canvas, gameOverCallback ){
		this.canvas = canvas;
		this.gameOverCallback = gameOverCallback || null; 

		this.init();
	}

	init(){
		this.background = null;
		this.shield = null;
		this.core = null;
		this.entities = [];

		this.isPending = false;
		this.isStop = false;

		this.initComponents();
		this.initEvents();

		this._renderFD = null;
		this._recycleFD = null;
		this._createEntityFD = null;
		this._detectCollisionFD = null;
		this._detectGameOverFD = null;

		this.renderBackground();
	}

	destructor(){
		this.background = null;
		this.shield = null;
		this.core = null;
		this.entities = null;
		this.isPending = false;
		this.isStop = false;

		this.clearEvents();

		this.clearCanvas();
		this.canvas = null;
		this.gameOverCallback = null;

		this._renderFD !== null && cancelAnimationFrame( this._renderFD );
		this._recycleFD !== null && cancelAnimationFrame( this._recycleFD );
		this._createEntityFD !== null && clearTimeout( this._createEntityFD );
		this._detectCollisionFD !== null && cancelAnimationFrame( this._detectCollisionFD );
		this._detectGameOverFD !== null && cancelAnimationFrame( this._detectGameOverFD );

		this._renderFD = null;
		this._recycleFD = null;
		this._createEntityFD = null;
		this._detectCollisionFD = null;
		this._detectGameOverFD = null;
	}

	initComponents(){
		this.initBackground();
		this.initShield();
		this.initCore();
		this.initEntities();
	}

	initBackground(){
		let context = this.canvas.getContext( '2d' );

		let backgroundColor = context.createRadialGradient( 	this.canvas.width / 2, 
									this.canvas.height / 2, 
						          			100, 
						          			this.canvas.width / 2, 
						          			this.canvas.height / 2, 
						          			Math.sqrt( Math.pow( this.canvas.width, 2 ) + Math.pow( this.canvas.height, 2 ) ) );

		backgroundColor.addColorStop( 0, '#004646' );
		backgroundColor.addColorStop( 0.3, '#002B2E' );
		backgroundColor.addColorStop( 1, '#001217' );

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
			enery: 100
		});
	}

	initEntities(){
		this.entities = [];
	}

	initEvents(){
		this.initCanvasEvents();
	}

	initCanvasEvents(){
		_events.mousemove = function( evt ){
			let center = {
				x: this.canvas.width / 2,
				y:  this.canvas.height / 2
			};

			let position = {
				x: evt.offsetX,
				y: evt.offsetY
			};

			this.shield.startRadian = calculateRadian( position, center );
		}.bind(this);

		this.canvas.addEventListener('mousemove', _events.mousemove, false );	
	}

	clearEvents(){
		this.clearCanvasEvents();
	}

	clearCanvasEvents(){
		this.canvas.removeEventListener('mousemove', _events.mousemove, false);
	}

	clearCanvas(){
		let context = this.canvas.getContext( '2d' );
		context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
	}

	start(){
		this.isPending = true;

		let renderProxy = function(){
			if( this.isGameOver() ){
				return;
			}

			this.isPending && this.render();
			this._renderFD = requestAnimationFrame( renderProxy );
		}.bind(this);
		renderProxy();

		let createEntityProxy = function(){
			if( this.isGameOver() ){
				return;
			}

			this.isPending && this.createEntity();
			this._createEntityFD = setTimeout( createEntityProxy.bind(this), 1000 + parseInt( Math.random() * 500 ) );
		}.bind(this);
		createEntityProxy();

		let recycleProxy = function(){
			if( this.isGameOver() ){
				return;
			}

			this.recycle();
			this._recycleFD  = requestAnimationFrame( recycleProxy );
		}.bind(this);
		recycleProxy();

		let detectCollisionProxy = function(){
			if( this.isGameOver() ){
				return;
			}

		 	this.isPending && this.detectCollision();
			this._detectCollisionFD = requestAnimationFrame( detectCollisionProxy );
		}.bind(this);
		detectCollisionProxy();

		if( this.gameOverCallback && typeof this.gameOverCallback == 'function' ){
			let detectGameOverProxy = function(){
				let isGameOver = this.isGameOver();

				isGameOver && this.gameOverCallback && this.gameOverCallback();
				isGameOver || ( this._detectGameOverFD = requestAnimationFrame( detectGameOverProxy ) );
			}.bind(this);
			detectGameOverProxy();
		}
	}

	pause(){
		this.isPending = false;
	}

	restart(){
		this.isPending = true;
	}

	stop(){
		this.isStop = true;
	}

	render(){
		if( !this.canvas ){
			console.error( 'Word draw: canvas is %s', this.canvas );
			return;
		}

		this.clearCanvas();

		this.renderBackground();
		this.renderShield();
		this.renderCore();
		this.renderEntities();
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

		if( this.core.isSmashed ){
			this.core.fadeFragments();
			this.core.moveFragments();
			this.core.renderFragments( this.canvas );
		}else{
			this.core.render( this.canvas );
		}
	}

	renderEntities(){
		this.entities || this.initEntities();

		this.entities.forEach(function( entity ){
			if( entity.isSmashed ){
				entity.fadeFragments();
				entity.moveFragments();

				entity.renderFragments( this.canvas );
			}else{
				entity.move();

				entity.render( this.canvas );
			}
		}.bind(this) );
	}

	recycle(){
		this.recyleEntities();
	}

	recyleEntities(){
		let toRetain = [];

		this.entities.forEach(function( entity ){
			if( !entity.canDestory() && !this.isOutBoundary( entity )  ){
				toRetain.push( entity );
			}

		}.bind(this) );

		this.entities = toRetain;
	}

	isOutBoundary( entity ){
		let canvasWidth  = this.canvas.width;
		let canvasHeight = this.canvas.height;

		if( entity.x +  entity.radius >= 0 && entity.x - entity.radius <= canvasWidth 
			&& entity.y + entity.radius >= 0 && entity.y - entity.radius <= canvasWidth ){
			
			return false;
		}

		return true;
	}

	
	detectCollision(){
		this.entities.forEach(function( entity ){
			if( entity.isSmashed ){
				return;
			}

			if( this.detectCollisionWithShield( entity ) ){
				entity.smash();
				return;
			}

			if( this.detectCollisionWithCore( entity ) && !this.core.isSmashed ){
				entity.smash();

				switch(  entity.type ){
					case EntityType.ENEMY:
						if( this.core.radius <= entity.radius ){
							this.core.radius = 0;
						}else {
							this.core.radius = Math.sqrt( ( this.core.area() - entity.area() ) / Math.PI );
						}
						break;

					case EntityType.ENERGY:
						this.core.radius = Math.sqrt( ( this.core.area() + entity.area() ) / Math.PI );
						break;
				}
				
				this.core.radius <= 0 && this.core.smash();
				return;
			}

		}.bind(this) );
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
		if( this.core.life <= 0 ){
			return false;
		}

		let isCollision = false;

		let distanceToCenter = Math.sqrt( Math.pow( this.core.x - entity.x, 2 ) 
							+ Math.pow( this.core.y - entity.y, 2 ) );

		isCollision = distanceToCenter -  entity.radius < this.core.radius;

		return isCollision;
	}

	isGameOver(){
		return this.core.canDestory();
	}

	createEntity(){
		let canvasWidth  = this.canvas.width;
		let canvasHeight = this.canvas.height; 
		let canvasCenter = {
			x: canvasWidth / 2,
			y: canvasHeight / 2
		};

		let type;
		let color;
		switch( parseInt( Math.random() * 5 ) ){
			case 0:
			case 1:
			case 2:
			case 3:
				type  = EntityType.ENEMY;
				color = 'red';
				break;

			case 4:
				type  = EntityType.ENERGY;
				color = '#14DC93';
				break; 
		}

		let x = 0;
		let y = 0;
		switch( parseInt( Math.random() * 3 ) ){
			case 0:
				x =  parseInt( canvasWidth * Math.random() );
				y = 0;
				break;
			case 1:
				x = canvasWidth;
				y = parseInt( canvasHeight * Math.random() );
				break;
			case 2: 
				x = parseInt( canvasWidth * Math.random() );
				y = canvasHeight;
				break;
			case 3: 
				x = 0;
				y =  parseInt( canvasHeight * Math.random() );
				break;
		}

		let radius = parseInt( Math.random() * 3  ) + 4;

		let speedX = 0;
		let speedY = 0;
		let speedRatio = 1;
		if( Math.abs( canvasCenter.x  - x)  > Math.abs( canvasCenter.y - y ) ){
			speedRatio = Math.abs( ( canvasCenter.y - y ) / ( canvasCenter.x - x )  );
			speedX = ( 1 + Math.random() ) * ( canvasCenter.x > x ? 1: -1 );
			speedY = Math.abs( speedX * speedRatio ) * ( canvasCenter.y > y ? 1: -1 );
		}else{
			speedRatio = Math.abs( ( canvasCenter.x - x ) / ( canvasCenter.y - y )  );
			speedY = ( 1 + Math.random() ) * ( canvasCenter.y > y ? 1: -1 );
			speedX = Math.abs( speedY * speedRatio ) * ( canvasCenter.x > x ? 1: -1 );
		}

		this.entities.push( new Entity({
			type: type,
			x: x,
			y: y,
			radius: radius,
			opacity: 1,
			color: color,
			speedX: speedX,
			speedY: speedY
		}) );
	}
}

