const arr = [1, 2, [3, 4, [5, 6]]];

const flatten = (arr) => {
  const stack = [...arr];
  const res = [];
  while(stack.length) {
    let next = stack.pop();
    if(Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  console.log(res.reverse());
  return res.reverse();
}

flatten(arr);