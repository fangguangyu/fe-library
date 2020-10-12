const arr = [1, 2, [3, 4, [5, 6]]];

const flatten = (arr) => {
  let queue = [...arr];
  let res = [];
  while(queue.length) {
    let prev = queue.shift()
    if(Array.isArray(prev)) {
      queue.unshift(...prev)
    } else {
      res.push(prev);
    }
  }
  console.log(res);
  return res;
}

flatten(arr);