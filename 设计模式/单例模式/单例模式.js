class SingleDog{
  show() {
    console.log('我是一个单例对象');
  }
  // static getInstance() {
  //   // 判断是否已经new过1个实例
  //   if(!SingleDog.instance) {
  //     // 若这个唯一的实例不存在，那么先创建它。
  //     SingleDog.instance = new SingleDog();
  //   }
  //   return SingleDog.instance;
  // }
}

SingleDog.getInstance = function() {
  let instance = null;
  return function() {
    if(!instance) {
      instance = new SingleDog();
    }
    return instance;
  }
}();

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1 == s2);