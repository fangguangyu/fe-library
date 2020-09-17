class EventEmitter {
  constructor() {
    this.__events = {}
  }

  // 判断是否无效的function
  isValidListener = (listener) => {
    if(typeof listener === 'function') {
      return true;
    } else if(typeof listener === 'object') {
      return this.isValidListener(listener.listener);
    } else {
      return false;
    }
  }

  indexOf = (array, item) => {
    let result = -1;
    let listener = typeof item === 'object' ?
      item.listener : item;
  
    for(let i = 0; i < array.length; i++) {
      if(array[i].listener === listener) {
        result = i;
        break;
      }
    }
    return result;
  }

  on(eventName, listener) {
    if(!eventName || !listener) return; // 任一不传就return

    if(!this.isValidListener(listener)) {
      throw new TypeError('listener must be a function');
    }

    let events = this.__events;
    let listeners = events[eventName] = events[eventName] || [];  // 二元方程可以用这种 ||
    let listenerIsWrapped = typeof listener === 'object';

    // 不重复添加事件
    if(this.indexOf(listeners, listener) === -1) {
      listeners.push(listenerIsWrapped ? listener : {
        listener: listener,
        once: false
      })
    }
    return this;
  }
  once(eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true,
    });
  }
  off(eventName, listener) {
    if(!eventName || !listener) return; // 任一不传就return

    let listeners = this.__events[eventName];
    let index;
    for(let i = 0; i < listeners.length; i++) {
      if(listeners[i] && listeners[i].listener === listener) {
        index = i;
        break;
      }
    }
  
    if(typeof index !== 'undefined') {
      listeners.splice(index, 1);
    }
  
    return this;
  }
  allOff(eventName) {
    if(eventName && this.__events[eventName]) {
      this.__events[eventName] = [];
    } else {
      this.__events = {};
    }
  }
  emit(eventName, args) {
    let listeners = this.__events[eventName];

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
}

EventEmitter.VERSION = '1.0.0';

window.EventEmitter = EventEmitter;