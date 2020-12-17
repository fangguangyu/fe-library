// 乘积缓存
const mulCache = (function() {
  let cache = {};
  return function() {
    let args = Array.prototype.join.call(arguments, ',');
    console.log(args);
    if(cache[args]){
      return cache[args];
    }
    console.log('计算一遍值');
    let a = 1;
    for(let i = 0; i < arguments.length; i++) {
      a = a * arguments[i];
    }
    return cache[args] = a;
  }
})();

console.log(mulCache(1,2,3))
console.log(mulCache(1,2,3))