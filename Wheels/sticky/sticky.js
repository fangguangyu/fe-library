
(function() {
  const util = {
    extends: function(target) {
      for(let i = 1; i < arguments.length; i++) {
        for(let prop in arguments[i]) {
          if(!target[prop]) {
            target[prop] = arguments[i][prop];
          }
        }
      }
      return target;
    },
    isValidListener: function(listener) {
      if(typeof listener === 'function') {
        return true;
      } else if(typeof listener === 'object') {
        return util.isValidListener(listener.listener);
      } else {
        return false;
      }
    },
    indexOf: function(array, item) {
      if (array.indexOf) {
        return array.indexOf(item);
      } else {
          var result = -1;
          for (var i = 0, len = array.length; i < len; i++) {
              if (array[i] === item) {
                  result = i;
                  break;
              }
          }
          return result;
      }
    },
    getScrollOffsets: function() {
      /**
       * 兼容流程：
       * (window.pageXOffset) ==>
       * (window.document.compatMode === 'CSS1Compat', 取window.document.documentElement.scrollLeft) ==>
       * (window.document.body.scrollLeft)
       * 1.先判断window.pageXOffset是否等于null, 没有就返回pageXOffset。
       * 2.再判断document.compatMode === 'CSS1Compat', 最后取 window.document.documentElement.scrollLeft.
       * 3.如果都没有再返回 window.document.body.scrollLeft.
       */
      let w = window;
      if(w.pageXOffset !== null) return { x: w.pageXOffset, y: w.pageYOffset };
      let d = w.document;
      if(document.compatMode === 'CSS1Compat') {
        return {
          x: d.documentElement.scrollLeft,
          y: d.documentElement.scrollTop
        }
      }
      return { x: d.body.scrollLeft, y: d.body.scrollTop }
    },
    addEvent: function(element, type, fn) {
      /**
       * 先判断是否有document.addEventListener.
       */
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
    addClass: function(element, className) {
      console.log(element.className);
      let classNames = element.className.split(/\s+/);
      if(util.indexOf(classNames, className) === -1) {
        classNames.push(className);
      }
      console.log(classNames);
      element.className = classNames.join(' ');
    },
    removeClass: function(element, className) {
      let classNames = element.className.split(/\s+/);
      let index = util.indexOf(classNames, className);
      console.log(index);
      if(index !== -1) {
        classNames.splice(index, 1);
      }
      console.log(classNames);
      element.className = classNames.join(' ');
    },
    removeProperty: function(element, name) {
      if(element.style.removeProperty) {
        element.style.removeProperty(name);
      } else {
        element.style.removeProperty(name);
      }
    }
  }

  function EventEmitter() {
    this.__events = {};
  }

  EventEmitter.prototype.on = function(eventName, listener) {
    if(!eventName || !listener) return;

    if(!util.isValidListener(listener)) {
      throw new TypeError('listener must be a Function');
    }

    let events = this.__events;
    let listeners = events[eventName] = events[eventName] || []; // events有eventName的事件，则取eventName的事件, 否则为[]
    let listenerIsWrapped = typeof listener == 'object';

    // 不重复添加
    if(util.indexOf(listeners, listener) === -1) {
      listeners.push(listenerIsWrapped ? listener : {
        listener: listener,
        once: false
      })
    }

    return this;
  }

  EventEmitter.prototype.once = function(eventName, listener) {
    if(!eventName || !listener) return;

    if(!util.isValidListener(listener)) {
      throw new TypeError('listener must be a Function');
    }

    return this.on(eventName, {
      listener: listener,
      once: true
    })
  }

  EventEmitter.prototype.emit = function(eventName, args) {
    if(!eventName) return;

    let listeners = this.__events[eventName];

    if(!listeners) return;

    for(let i = 0; i < listeners.length; i++) {
      let listener = listeners[i];
      if(listener) {
        listener.listener.apply(this, args || []);
        if(listener.once) {
          this.off(eventName, listener.listener);
        }
      }
    }

    return this;
  }

  EventEmitter.prototype.off = function(eventName, listener) {
    if(!eventName || !listener) return;

    let listeners = this.__events[eventName];

    if(listeners.length <= 0) return;

    let index;

    for(let i = 0; i < listeners.length; i++) {
      let listener = listeners[i];
      if(listener.listener === listener) {
        index = i;
        break;
      }
    }

    if(index !== 'undefined') {
      listeners.splice(index, 1);
    }

    return this;
  }

  function Sticky(element, options) {
    EventEmitter.call(this); // 只继承了构造函数上的内容，没有继承原型对象上的方法.
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = util.extends({}, this.constructor.defaultOptions, options);
    this.init();
  }

  Sticky.VERSION = '1.0.0';

  Sticky.defaultOptions = {
    offset: 0
  }
  /**
  * 继承了构造函数上的内容，以及原型对象上的方法。但把整个Sticky的原型都给改写了。
  * 需要重新指定其constructor的指定.
  */ 
  let proto = Sticky.prototype = new EventEmitter();

  proto.constructor = Sticky;

  proto.init = function() {
    this.calculateElement();

    this.bindScrollEvent();
  }

  proto.calculateElement = function() {
    // 计算出元素距离文档的距离 
    if(this.element) {
      let rect = this.element.getBoundingClientRect();  // DOMRect
      this.eLeft = rect.left + util.getScrollOffsets().x;
      this.eTop = rect.top + util.getScrollOffsets().y - this.options.offset;
    }
  }

  proto.bindScrollEvent = function() {
    let self = this;

    util.addEvent(window, 'scroll', function(event) {
      if(util.getScrollOffsets().y > self.eTop) {
        self.setSticky();
      } else {
        self.setNormal();
      }
    })
  }

  proto.setSticky = function() {
    if(this.status == 'sticky') return;
    this.status = 'sticky';
    util.addClass(this.element, 'sticky');
    this.setElementSticky();
    this.emit('onSticky');
  }

  proto.setNormal = function() {
    if(this.status !== 'sticky') return;
    this.status = 'normal';
    util.removeClass(this.element, 'sticky');
    this.setElementNormal();
    this.emit('onDetach');
  }

  proto.setElementSticky = function() {
    this.element.style.position = 'fixed';
    this.element.style.left = this.eLeft + 'px';
    this.element.style.top = this.options.offset + 'px';
  }

  proto.setElementNormal = function() {
    util.removeProperty(this.element, 'position');
    util.removeProperty(this.element, 'left');
    util.removeProperty(this.element, 'top');
  }

  window.Sticky = Sticky;
})()