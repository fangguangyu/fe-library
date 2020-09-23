
(function() {
  let root = (typeof self == 'object' && self.self == self && self) || 
    (typeof global == 'object' && global.global == global && global) ||
    this || {};

    // 修复

  const util = {
    extend: function(target) {
      for(let i = 1; i < arguments.length; i++) {
        for(let prop in arguments[i]){
          if(arguments[i].hasOwnProperty(prop) && arguments[i][prop]){
            target[prop] = arguments[i][prop]
          }
        }
      }
      return target;
    },
    addEvent: function(element, type, fn) {
      if(document.addEventListener) {
        element.addEventListener(type, fn, false);
      }
    },
    removeEvent: function(elem, type, fn) {
      if(document.removeEventListener) {
        elem.removeEventListener(type, fn, false);
      }
    }
  }
  function Lazy(opts) {
    this.opts = util.extend({}, this.constructor.defaultOptions, opts);

    this.init();
  }

  Lazy.VERSION = '1.0.0';

  Lazy.defaultOptions = {
    delay: 250,
    useDebounce: false
  }

  let proto = Lazy.prototype;
  
  proto.init = function() {
    this.calulateView();
    this.bindScrollEvent();
  }

  proto.calulateView = function() {
    this.view = {
      top: 0 - (parseInt(this.opts.top, 10) || 0),
      bottom: (root.innerHeight || document.documentElement.clientHeight) + (parseInt(this.opts.bottom, 10) || 0),
      left : 0 - (parseInt(this.opts.left, 10) || 0),
      right: (root.innerWidth || document.documentElement.clientWidth) + (parseInt(this.opts.right, 10) || 0)
    }
    console.log(this.view);
  }

  proto.bindScrollEvent = function() {
    let scrollEvent = util.addEvent(root, 'scroll', this.handleLazyLoad.bind(this));
    let loadEvent = util.addEvent(root, 'load', this.handleLazyLoad.bind(this));

    this.event = {
      scrollEvent: scrollEvent,
      loadEvent: loadEvent
    }
  }

  let timer = null;

  proto.handleLazyLoad = function() {
    let self = this;

    if(!this.opts.useDebounce && !!timer) return;

    clearTimeout(timer);

    timer = setTimeout(function() {
      timer = null;
      self.render();
    }, this.opts.delay)
  }

  proto.render = function() {
    let nodes = document.querySelectorAll('[data-lazy-src], [data-lazy-background]');
    let length = nodes.length;

    console.log('1');

    for(let i = 0; i < length; i++) {
      elem = nodes[i];
      if(this.checkInView(elem)) {
        if(elem.getAttribute('data-lazy-background') !== null) {
          elem.style.backgroundImage = 'url('+ elem.getAttribute('data-lazy-background') +')';
        } else if(elem.src !== (src = elem.getAttribute('data-lazy-src'))) {
          elem.src = src;
        }

        elem.removeAttribute('data-lazy-src');
        elem.removeAttribute('data-lazy-background');

        if(this.opts.onload && typeof this.opts.onload === 'function') {
          this.opts.onload(elem);
        }
      }
    }
    
    if(!length) {
      this.unbindScrollEvent();
    }
  }

  proto.checkInView = function(element) {
    if(this.isHidden(element)) {
      return false;
    }

    var rect = element.getBoundingClientRect();
    console.log(rect);
    return (rect.right >= this.view.left && rect.bottom >= this.view.top && rect.left <= this.view.right && rect.top <= this.view.bottom);
  }

  proto.isHidden = function(element) {
    return (element.offsetParent === null);
  }

  proto.unbindScrollEvent = function() {
    util.removeEvent(root, 'scroll', this.event.scrollEvent);
    util.removeEvent(root, 'load', this.event.loadEvent);
  }

  if(typeof exports != 'undefined' && !exports.nodeType) {
    if(typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Lazy;
    }
    exports.Lazy = Lazy;
  } else {
    root.Lazy = Lazy;
  }
})();