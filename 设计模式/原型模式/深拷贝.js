
function deepClone(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let copy = {};
  if(Array.isArray(obj)) {
    copy = [];
  }

  for(let key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}

// 测试
const a = {a: {name: 'lilei'}}
const b = deepClone(a);
b.a = {age: 12};
console.log(b);