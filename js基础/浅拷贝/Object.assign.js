
const obj = {name: 'lilei'};

const copy = (target, ...args) => {
  if(typeof target !== 'object') {
    return new TypeError('Cannot convert undefined or null to object');
  }

  let to = Object(target);
  for(let i = 0; i < args.length; i++) {
    let nextSource = args[i];
    if(nextSource != null) {
      for(let nextKey in nextSource) {
        if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}

copy(obj, {age: 20})

console.log(obj);