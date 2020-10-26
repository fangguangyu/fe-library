// observe 方法遍历并包装对象属性
function observe(target) {
  // 若target是一个对象，则遍历它
  if(target && typeof target === 'object') {
    Object.keys(target).forEach(key => {
      defineReactive(target, key, target[key]);
    })
  }
}

function defineReactive(target, key, val) {
  const dep = new Dep();
  // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
  observe(val);

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      return val;
    },
    set: function(value) {
      console.log(`${target}属性的${key}属性变成了${value}`);
      dep.notify();
      val = value;
    }
  })
}

class Dep{
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}