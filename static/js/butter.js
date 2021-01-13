// butter.js

(function(root){
    var Butter = function() {

        var self = this;

        this.defaults = {
            wrapperId: 'butter',
            wrapperDamper: 0.12,
            cancelOnTouch: true,
            scrollY: true,
        }

        this.validateOptions = function(ops) {
            for (var prop in ops) {
                if (self.defaults.hasOwnProperty(prop)) {
                    Object.defineProperty(self.defaults, prop, {value: Object.getOwnPropertyDescriptor(ops, prop).value})
                }
            }
        }

        this.wrapperDamper;
        this.wrapperId;
        this.cancelOnTouch;
        this.scrollY;
        this.wrapper;
        this.wrapperOffsetY = 0;
        this.wrapperOffsetX = 0;
        this.animateId;
        this.resizing = false;
        this.active = false;
    };

    Butter.prototype = {

        init: function(options) {
            if (options) {
                this.validateOptions(options);
            }

            this.active = true;
            this.resizing = false;
            this.wrapperDamper = this.defaults.wrapperDamper;
            this.wrapperId = this.defaults.wrapperId;
            this.cancelOnTouch = this.defaults.cancelOnTouch;
            this.scrollY = this.defaults.scrollY;

            this.wrapper = document.getElementById(this.wrapperId);
            this.wrapper.style.position = 'fixed';

            if (this.scrollY) {
                this.wrapper.style.width = '100%';
                document.body.style.height = this.wrapper.clientHeight + 'px';
            } else {
                this.wrapper.style.height = '100%';
                document.body.style.width = this.wrapper.scrollWidth + 'px';
            }

            window.addEventListener('resize', this.resize.bind(this));
            if (this.cancelOnTouch) {
                window.addEventListener('touchstart', this.cancel.bind(this));
            }
            this.wrapperOffsetY = window.scrollY;
            this.wrapperOffsetX = window.scrollX;
            this.animateId = window.requestAnimationFrame(this.animate.bind(this));

            window.addEventListener('load', this.resize.bind(this));
        },

        wrapperUpdate: function() {
            if (this.scrollY) {
                var scrollY = document.body.scrollTop || window.scrollY;
                this.wrapperOffsetY += (scrollY - this.wrapperOffsetY) * this.wrapperDamper;
                this.wrapper.style.transform = 'translate3d(0,' + (-this.wrapperOffsetY.toFixed(2)) + 'px, 0)';
            } else {
                var scrollX = document.body.scrollTop || window.scrollX;
                this.wrapperOffsetX += (scrollX - this.wrapperOffsetX) * this.wrapperDamper;
                this.wrapper.style.transform = 'translate3d(' + (-this.wrapperOffsetX.toFixed(2)) + 'px, 0, 0)';
            }

        },

        resize: function() {
            var self = this;
            if (!self.resizing) {
                self.resizing = true;
                cancelAnimationFrame(self.animateId);
                if (this.scrollY) {
                    window.setTimeout(function() {
                        if (parseInt(document.body.style.height) != parseInt(self.wrapper.clientHeight)) {
                            document.body.style.height = self.wrapper.clientHeight + 'px';
                        }
                        self.animateId = window.requestAnimationFrame(self.animate.bind(self));
                        self.resizing = false;
                    }, 150)
                } else {
                    window.setTimeout(function() {
                        if (parseInt(document.body.style.width) != parseInt(self.wrapper.scrollWidth)) {
                            document.body.style.width = self.wrapper.scrollWidth + 'px';
                        }
                        self.animateId = window.requestAnimationFrame(self.animate.bind(self));
                        self.resizing = false;
                    }, 150)
                }
            }
        },

        animate: function() {
            this.wrapperUpdate();
            this.animateId = requestAnimationFrame(this.animate.bind(this));
        },

        cancel: function() {
            if (this.active) {
                cancelAnimationFrame(this.animateId);

                window.removeEventListener('resize', this.resize);
                window.removeEventListener('touchstart', this.cancel);
                this.wrapper.removeAttribute('style');
                document.body.removeAttribute('style');

                this.active = false;
                this.wrapper = "";
                this.wrapperOffsetY = 0;
                this.wrapperOffsetX = 0;
                this.resizing = true;
                this.animateId = "";
            }
        },
    };

    root.butter = new Butter();

})(this);