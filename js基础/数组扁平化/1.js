const arr = [1, 3, 5,[2, 6]];


// const flat = (arr) => {
//   let result = [];
//   const fn = (arr) => {
//     for(let i in arr) {
//       if(Array.isArray(arr[i])) {
//         fn(arr[i]);
//       } else {
//         result.push(arr[i])
//       }
//     }
//   }
//   fn(arr);
//   return result; 
// }

const flatten = function(arr) {
  let stack = [...arr];
  const result = [];
  while(stack.length) {
    const pre = stack.pop();
    if(toString.call(pre) == '[object Array]') {
      stack.push(...pre);
    } else {
      result.unshift(pre);
    }
  }
  return result;
}

console.log(flatten(arr));



console.log(flatten(arr));