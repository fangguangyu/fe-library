
// 判断是否无效的function
function isValidListener(listener) {
  if(typeof listener === 'function') {
    return true;
  } else if(typeof listener === 'object') {
    return isValidListener(listener.listener);
  } else {
    return false;
  }
}

function indexOf(array, item) {
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

function EventEmitter() {
  this.__events = {};
}

EventEmitter.VERSION = '1.0.0';

let proto = EventEmitter.prototype;

/**
 * 添加事件
 * @param {String} eventName 事件名称
 * @param {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.on = function(eventName, listener) {
  if(!eventName || !listener) return; // 任一不传就return

  if(!isValidListener(listener)) {
    throw new TypeError('listener must be a function');
  }

  let events = this.__events;
  let listeners = events[eventName] = events[eventName] || [];  // 二元方程可以用这种 ||
  let listenerIsWrapped = typeof listener === 'object';

  // 不重复添加事件
  if(indexOf(listeners, listener) === -1) {
    listeners.push(listenerIsWrapped ? listener : {
      listener: listener,
      once: false
    })
  }

  return this;
}

/**
 * 添加事件 该事件只能被执行一次
 * @param {String} eventName 事件名称
 * @param {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.once = function(eventName, listener) {
  return this.on(eventName, {
    listener: listener,
    once: true,
  });
}

/**
 * 
 * @param {String} eventName 事件名称 
 * @param {Function} listener 监听器函数
 * @return {Object} 可链式调用 
 */
proto.off = function(eventName, listener) {
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

/**
 * 触发事件
 * @param {String} eventName 事件名称
 * @param {Array} args 传入监听函数的参数，使用数组的形式传入
 * @return {Object} 可链式调用
 */

proto.emit = function(eventName, args) {
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

/**
 * 删除某一个类型的所有事件或者所有事件
 * @param {String} eventName 事件名称
 */
proto.allOff = function(eventName) {
  if(eventName && this.__events[eventName]) {
    this.__events[eventName] = [];
  } else {
    this.__events = {};
  }
}

window.EventEmitter = EventEmitter;