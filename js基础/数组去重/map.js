const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

const unique = arr => {
  const map = new Map();
  const res = [];

  for(let i = 0; i < arr.length; i++) {
    if(!map.has(arr[i])) {
      map.set(arr[i], true);
      res.push(arr[i]);
    }
  }

  return res;
}

console.log(unique(arr));