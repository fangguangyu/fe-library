
const obj = {name: 'lilei'};

// const copy = (target, ...args) => {
//   if(typeof target !== 'object') {
//     return new TypeError('Cannot convert undefined or null to object');
//   }

//   let to = Object(target);
//   console.log(to);
//   for(let i = 0; i < args.length; i++) {
//     let nextSource = args[i];
//     if(nextSource != null) {
//       for(let nextKey in nextSource) {
//         if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
//           to[nextKey] = nextSource[nextKey];
//         }
//       }
//     }
//   }

//   return to;
// }

let copy = (obj, ...args) => {
  if(typeof obj !== 'object') {
    throw new TypeError(obj + 'must be an object');
  }

  let to = Object(obj);
  for(let i = 0; i < args.length; i++) {
    let source = args[i];
    for(let key in source) {
      if(Object.prototype.hasOwnProperty.call(source, key)) {
        to[key] = source[key]
      }
    }
  }

  return to;
}

copy(obj, {age: 20})

console.log(obj);