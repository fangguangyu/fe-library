
// instanceof 只能用作对象判断
const myInstanceof = (left, right) => {
  if(typeof left !== 'object' || left == null) return false;

  let proto = Object.getPrototypeOf(left);
  while(true) {
    if(proto === null)  return false;
    if(proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}


const obj = {}
console.log(myInstanceof(obj, Object))