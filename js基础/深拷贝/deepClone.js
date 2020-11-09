// const deepClone = obj => {
//   if(typeof obj !== 'object' || obj === null) {
//     return obj;
//   }

//   let copy = Array.isArray(obj) ? [] : {};

//   for(let key in obj) {
//     if(Object.prototype.hasOwnProperty.call(obj, key)) {
//       copy[key] = deepClone(obj[key]);
//     }
//   }

//   return copy;
// }

function deepClone(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let copy = toString.apply(obj) == '[object Array]' ? [] : {};

  for(let i in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, i)) {
      copy[i] = deepClone(obj[i]);
    }
  }

  return copy;
}

// 测试
const a = {a: {name: 'lilei'}}

const b = deepClone(a);

b.a = {age: 10};

console.log(b);