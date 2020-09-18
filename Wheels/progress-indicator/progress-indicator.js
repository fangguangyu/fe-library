
(function() {

  let util = {
    extend: function(target) {
      for(let i = 1; i < arguments.length; i++) {
        for(let prop in arguments[i]){
          if(arguments[i][prop]){
            target[prop] = arguments[i][prop]
          }
        }
      }
      return target;
    },
    isValidListener: function(listener) {
      if(!listener) return;

      if(typeof listener === 'function') {
        return true;
      } else if (typeof listener === 'object') {
        return util.isValidListener(listener.listener);
      } else {
        return false;
      }
    },
    indexOf: function(array, item) {
      let result = -1;
      for(let i = 0; i < array.length; i++) {
        if(array[i].listener === item) {
          result = i;
          break;
        }
      }
      return result;
    },
    getViewPortSizeHeight: function() {
      let w = window;
      if(w.innerHeight != null) return w.innerHeight;
      let d = w.document;
      // 标准模式
      if(document.compatMode === 'CSS1Compat') {
        return d.documentElement.clientHeight;
      }
      // 怪异模式
      return d.body.clientHeight;
    },
    getScrollOffsetsTop: function() {
      let w = window;
      if(w.pageYOffset != null) return w.pageYOffset;
      let d = w.document;
      // 标准模式
      if(document.compatMode === 'CSS1Compat') {
        return d.documentElement.scrollTop;
      }
      // 怪异模式
      return d.body.scrollTop;
    },
    addEvent: function(element, type, fn) {
      if (document.addEventListener) {
        element.addEventListener(type, fn, false);
      }
      // } else if(document.attachEvent){
      //   let bound = function() {
      //     return fn.apply(element, arguments);
      //   }
      //   element.attachEvent('on' + type, bound);
      // }
    
    }
  }

  function EventEmitter() {
    this.__events = {};
  }

  /**
   * 
   * @param {String} eventName 
   * @param {Function} listener 
   * @return {Object}  链式调用
   */
  EventEmitter.prototype.on = function(eventName, listener) {
    if(!eventName || !listener) return; // 参数不能为空

    // listener 必须是Function
    if(!util.isValidListener(listener)) { 
      throw new TypeError('listener must be a Function');
    }

    let events = this.__events;
    let listeners = events[eventName] = events[eventName] || [];
    let listenerIsWrapped = typeof listener === 'object';

    // 不重复添加函数
    if(util.indexOf(listeners, listener) === -1) {
      listeners.push(listenerIsWrapped ? listener : {
        listener: listener,
        once: false
      }) 
    }

    return this;
  }

  EventEmitter.prototype.once = function(eventName, listener){
    if(!eventName || !listener) return;

    return this.on(eventName, {
      listener: listener,
      once: true
    })
  }

  EventEmitter.prototype.emit = function(eventName, args){
    let listeners = this.__events[eventName];
    if(!listeners) return;

    for(let i = 0; i < listeners.length; i++) {
      let listener = listeners[i]
      if(listener) {
        listener.listener.apply(this, args || []);
        if(listener.once) {
          this.off(eventName, listener.listener);
        }
      }
    }
  }

  EventEmitter.prototype.off = function(eventName, listener) {
    var listeners = this.__events[eventName];
    if (!listeners) return;

    var index;
    for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] && listeners[i].listener === listener) {
            index = i;
            break;
        }
    }

    if (typeof index !== 'undefined') {
        listeners.splice(index, 1, null)
    }

    return this;
};

  function ProgressIndicator(options) {
    this.options = util.extend({}, this.constructor.defaultOptions, options);

    this.handlers = {};

    this.init();
  }

  ProgressIndicator.VERSION = '1.0.0';

  ProgressIndicator.defaultOptions = {
    color: '#0A74DA'
  }

  let proto = ProgressIndicator.prototype = new EventEmitter();

  proto.constructor = ProgressIndicator;

  proto.init = function() {
    this.createIndicator(); // 创建 progress-indicator DOM
    let width = this.calculateWidthPrecent();
    this.setWidth(width);
    this.bindScrollEvent();
  }

  proto.createIndicator = function() {
    let div = document.createElement('div');

    div.id = 'progress-indicator';
    div.className = 'progress-indicator';

    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.left = 0;
    div.style.height = '3px';

    div.style.backgroundColor = this.options.color;

    this.element = div;

    document.body.appendChild(div);
  }

  proto.calculateWidthPrecent = function() {
    // 文档高度
    this.docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
    
    // 视口高度
    this.viewPortHeight = util.getViewPortSizeHeight();

    // 差值
    this.sHeight = Math.max(this.docHeight - this.viewPortHeight, 0);

    // 滚动条垂直偏移量
    let scrollTop = util.getScrollOffsetsTop();

    return this.sHeight ? scrollTop / this.sHeight : 0

  }

  proto.setWidth = function(prec) {
    this.element.style.width = prec * 100 + '%';
  }

  proto.bindScrollEvent = function() {
    let self = this;
    let prev;
    util.addEvent(window, 'scroll', function() {
      window.requestAnimationFrame(function() {
        let prec = Math.min(util.getScrollOffsetsTop() / self.sHeight, 1);

        if(prec == prev) return;

        if(prev && prec == 1) {
          self.emit('end');
        }

        prev = prec;
        self.setWidth(prec);
      })
    })
  }

  window.ProgressIndicator = ProgressIndicator;
})()