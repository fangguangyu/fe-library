

(function() {
  let root = (typeof self == 'object' && self.self == self && self) ||
    (typeof global == 'object' && global.global == global && global) ||
    this || {};

  const util = {
    extend: function(target) {  
      for(let i = 1; i < arguments.length; i++) {
        for(let prop in arguments[i]){
          if(arguments[i].hasOwnProperty(prop) && arguments[i][prop]) {
            target[prop] = arguments[i][prop];
          }
        }
      }
      return target;
    },
    isArray: function(array) {
      return Array.isArray ? Array.isArray(array) : Object.prototype.toString.call(array) == '[object Array]';
    }
  }  

  function Preload(pics, options) {
    if(!util.isArray(pics)) {
      throw new TypeError('pics must be an array type');
    }

    this.pics = pics;

    this.options = util.extend({}, this.constructor.defaultOptions, options);

    this.index = this.failNum = 0;

    this.init();
  }

  Preload.VERSION = '1.0.0';

  Preload.defaultOptions = {
    complete: function() {},
    progress: function() {}
  }

  let proto = Preload.prototype;

  proto.init = function() {
    for(let i = 0; i < this.pics.length; i++) {
      this.loadImg(pics[i]);
    }
  }

  proto.loadImg = function(src) {
    let self = this;
    let img = new Image();
    
    img.onload = function() {
      img.onload = null;
      self.progress(src, 'success');
    }

    img.onerror = function() {
      self.progress(src, 'fail');
    }

    img.src = src;
  }

  proto.progress = function(src, type) {
    if (type == 'fail') this.failNum++;

    this.index++;

    this.options.progress(this.index, this.pics.length, type);

    if(this.index === this.pics.length) {
      this.options.complete(this.pics.length - this.failNum, this.failNum);
    }
  }

  if(typeof exports != 'undefined' && !exports.nodeType) {
    if(typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Preload;
    }
    exports.Preload = Preload;
  } else {
    root.Preload = Preload;
  }
})()