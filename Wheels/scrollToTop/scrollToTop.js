
(function() {

  let util = {
    extend: function(target) {
      for(let i = 1; i < arguments.length; i++) {
        for(let prop in arguments[i]){
          if(arguments[i][prop]) {
            target[prop] = arguments[i][prop];
          }
        }
      }
      return target;
    },
    setOpacity: function(element, opacity) {
      if(element.style.opacity !== 'undefined') {
        element.style.opacity = opacity / 100;
      } else {
        // 兼容低版本IE浏览器
        element.style.filter = `alpha(opacity=${opacity})`;
      }
    },
    addEvent: function(element, type, fn) {
      if(document.addEventListener) {
        element.addEventListener(type, fn, false);
      } else if(document.attachEvent){
        let bound = function() {
          return fn.apply(element, arguments);
        }
        element.attachEvent('on' + type, bound);
        return bound;
      }
    },
    getScrollOffsets: function() {
      let w = window;
      if(w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset};
      let d = w.document;
      if(document.compatMode === 'CSS1Compat') {
        return {
          x: d.documentElement.scrollLeft,
          y: d.documentElement.scrollTop
        }
      }
      return {x: d.body.scrollLeft, y: d.body.scrollTop};
    },
    fadeIn: function(element, speed) {
      let timer, opacity = 0;
      util.setOpacity(element, 0);
      
      function step() {
        util.setOpacity(element, opacity += speed);
        if(opacity < 100) {
          timer = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(timer);
        }
      }
      requestAnimationFrame(step);
    },
    fadeOut: function(element, speed){
      let timer, opacity = 100;
      util.setOpacity(element, 100);

      function step() {
        util.setOpacity(element, opacity -= speed);
        if(opacity > 0) {
          timer = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  }

  function ScrollToTop(element, options) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    
    this.options = util.extend({}, this.constructor.defaultOptions, options);
  
    this.init();
  }

  ScrollToTop.VERSION = '1.0.0';

  ScrollToTop.defaultOptions = {
    showWhen: 100, 
    speed: 100, 
    fadeSpeed: 10
  }

  let proto = ScrollToTop.prototype;

  proto.init = function() {
    this.hideElement();
    this.bindScrollEvent();
    this.bindToTopEvent();
  }

  proto.hideElement = function() {
    util.setOpacity(this.element, 0);
    this.status = 'hide';
  }

  proto.bindScrollEvent = function() {
    let self = this;

    util.addEvent(window, 'scroll', function() {
      if(util.getScrollOffsets().y > self.options.showWhen) {
        if(self.status === 'hide') {
          util.fadeIn(self.element, self.options.fadeSpeed);
          self.status = 'show';
        }
      } else {
        if(self.status === 'show') {
          util.fadeOut(self.element, self.options.fadeSpeed);
          self.status = 'hide';
        }
      }
    })
  }

  proto.handleBack = function() {
    let timer, self = this;
    timer = requestAnimationFrame(function fn() {
      let oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop = oTop - self.options.speed;
        timer = requestAnimationFrame(fn);
      } else {
        cancelAnimationFrame(timer);
      }
    })
  }

  proto.bindToTopEvent = function() {
    let self = this;

    util.addEvent(self.element, 'click', self.handleBack.bind(self));
  }

  window.ScrollToTop = ScrollToTop;

})();