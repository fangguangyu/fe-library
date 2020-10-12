const arr = [1,2,[3,[3,5]]]
const result = []

const flattened = (arr) => {

  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      flattened(arr[i])
    } else {
      result.push(arr[i])
    }
  }
}

flattened(arr);
console.log(result);
