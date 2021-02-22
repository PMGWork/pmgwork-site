/**
 * Written by Mineo Okuda on 01/03/18.
 *
 * Mineo Okuda - development + design
 * https://willstyle.co.jp
 * https://github.com/min30327
 *
 * MIT license.
 */

(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	}
	else if (typeof exports === 'object') {
		// COMMONJS
		module.exports = factory();
	}
	else {
		// BROWSER
		root.luxy = factory();
	}
}(this, function() {

	'use strict';

		var defaults = {
			wrapper: '#luxy',
			targets : '.luxy-el',
			wrapperSpeed: 0.1,
			targetSpeed: 0.02,
			targetPercentage: 0.1,
			scrollY: true,
		};

 		var requestAnimationFrame =
			window.requestAnimationFrame || window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			window.requestAnimationFrame = requestAnimationFrame;
		var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

		/**
		 * Merge two or more objects. Returns a new object.
		 * @param {Object}   objects  The objects to merge together
		 * @returns {Object}          Merged values of defaults and options
		 */
		var extend = function () {

			// Variables
			var extended = {};
			var deep = false;
			var i = 0;
			var length = arguments.length;

			// Merge the object into the extended object
			var merge = function (obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						extended[prop] = obj[prop];
					}
				}
			};

			// Loop through each object and conduct a merge
			for ( ; i < length; i++ ) {
				var obj = arguments[i];
				merge(obj);
			}

			return extended;

		};

		var Luxy = function(){
			this.Targets = [];
			this.TargetsLength = 0;
			this.wrapper = '';
			this.windowHeight = 0;
			this.windowWidth = 0
			this.wapperOffset = 0;
			this.active = false;
		};
		Luxy.prototype = {

			isAnimate: false,
			isResize : false,
			scrollId: "",
			resizeId: "",
			init : function(options){
				this.active = true;
				this.settings = extend(defaults, options || {});
				this.wrapper = document.querySelector(this.settings.wrapper);

				if(this.wrapper==="undefined"){
					return false;
				}
				this.targets = document.querySelectorAll(this.settings.targets);
				if (this.settings.scrollY) {
					document.body.style.height = document.body.clientHeight + 'px';
					this.windowHeight = document.body.clientHeight;
				} else {
					document.body.style.height = document.body.scrollWidth + 'px';
					this.windowWidth = document.body.scrollWidth;
				}

				this.attachEvent();
				this.apply(this.targets,this.wrapper);
				this.animate();
				this.resize();
			},
			apply : function(targets,wrapper){
				this.wrapperInit();

				this.targetsLength = targets.length;
				for (var i = 0; i < this.targetsLength; i++) {
					var attr = {
						offset : targets[i].getAttribute('data-offset'),
						speedX : targets[i].getAttribute('data-speed-x'),
						speedY : targets[i].getAttribute('data-speed-Y'),
						percentage : targets[i].getAttribute('data-percentage'),
						horizontal : targets[i].getAttribute('data-horizontal')
					};
					this.targetsInit(targets[i],attr);
				}
			},
			wrapperInit: function(){
				if (this.settings.scrollY) {
					this.wrapper.style.width = '100%';
				} else {
					this.wrapper.style.height = '100%';
				}
				this.wrapper.style.position = 'fixed';
			},
			targetsInit: function(elm,attr){

				this.Targets.push({
					elm : elm,
					offset : attr.offset ? attr.offset : 0,
					horizontal : attr.horizontal ? attr.horizontal : 0,
					top : 0,
					left : 0,
					speedX : attr.speedX ? attr.speedX : 1,
					speedY : attr.speedY ? attr.speedY : 1,
					percentage :attr.percentage ? attr.percentage : 0
				});
			},
			scroll : function(){
				var scrollTopTmp = document.documentElement.scrollTop || document.body.scrollTop;
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if (this.settings.scrollY) {
					var offsetBottom = this.scrollTop + this.windowHeight;
				} else {
					var offsetBottom = this.scrollTop + this.windowWidth;
				}
				this.wrapperUpdate(this.scrollTop);
				for (var i = 0; i < this.Targets.length; i++) {
					this.targetsUpdate(this.Targets[i]);
				}
			},
			animate : function(){
				this.scroll();
				this.scrollId = requestAnimationFrame(this.animate.bind(this));
			},
			wrapperUpdate : function(){

				this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
				if (this.settings.scrollY) {
					this.wrapper.style.transform = 'translate3d(' + 0 + ',' +  Math.round(-this.wapperOffset* 100) / 100 + 'px ,' + 0 + ')';
				} else {
					this.wrapper.style.transform = 'translate3d(' +  Math.round(-this.wapperOffset* 100) / 100 + 'px ,' + 0 + ',' + 0 + ')';
				}

			},
			targetsUpdate : function(target){
				target.top += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedY) - target.top) * this.settings.targetPercentage;
				target.left += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedX) - target.left) * this.settings.targetPercentage;
				var targetOffsetTop = ( parseInt(target.percentage) - target.top - parseInt(target.offset) );
				var offsetY = Math.round(targetOffsetTop * -100) / 100;
				var offsetX = 0;
				if(target.horizontal){
					var targetOffsetLeft = ( parseInt(target.percentage) - target.left - parseInt(target.offset) );
					offsetX = Math.round(targetOffsetLeft * -100) / 100;
				}
				target.elm.style.transform = 'translate3d(' + offsetX + 'px ,' + offsetY + 'px ,' + 0 +')';
			},
			resize: function(){
				var self = this;
				if (this.settings.scrollY) {
					self.windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
					if( parseInt(self.wrapper.clientHeight) != parseInt(document.body.style.height)){
						document.body.style.height = self.wrapper.clientHeight + 'px';
					}
				} else {
					self.windowWidth = (window.innerWidth || document.documentElement.clientWidth || 0);
					if( parseInt(self.wrapper.scrollWidth) != parseInt(document.body.style.height)){
						document.body.style.height = self.wrapper.scrollWidth + 'px';
					}
				}

				self.resizeId = requestAnimationFrame(self.resize.bind(self));
			},
			attachEvent : function(){
				var self = this;
				window.addEventListener('resize',function(){
					if(!self.isResize){
						cancelAnimationFrame(self.resizeId);
						cancelAnimationFrame(self.scrollId);
						self.isResize = true;
						setTimeout(function(){
							self.isResize = false;
							self.resizeId = requestAnimationFrame(self.resize.bind(self));
							self.scrollId = requestAnimationFrame(self.animate.bind(self));
						},200);
					}
				});

			},
			cancel: function() {
				if (this.active) {
					cancelAnimationFrame(this.resizeId);
					cancelAnimationFrame(this.scrollId);

					window.removeEventListener('resize', this.resize);
					this.wrapper.removeAttribute('style');
					document.body.removeAttribute('style');

					for (var i = 0; i < this.Targets.length; i++) {
						this.Targets[i].elm.removeAttribute('style');
					}

					this.active = false;
					this.wrapper = '';
					this.Targets = [];
					this.windowHeight = 0;
					this.windowWidth = 0;
					this.wapperOffset = 0;
					this.isResize = false;
					this.scrollId = "";
					this.resizeId = "";
				}

			},
		};


		var luxy = new Luxy();

		return luxy;
	})
);
