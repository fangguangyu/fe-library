
function clone(obj) {
  let copy;
  switch(typeof obj) {
    case 'number':
    case 'string':
    case 'boolean':
    copy = obj;
    break;
    case 'object':
    if(obj === null) {
      copy = null;
    } else if(toString.apply(obj) === '[object Array]') {
      copy = [];
      for(let i in obj) {
        copy.push(clone(obj[i]));
      }
    } else {
      copy = {};
      for(let j in obj) {
        copy[j] = clone(obj[j]);
      }
    }
  }
  return copy;
}

console.log(clone({name: 'n', name2: {name: 3}}));