
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

const unique = (arr) => {
  const res = [];
  for(let i = 0, len = arr.length; i < len; i++) {
    if(res.indexOf(arr[i]) === -1) res.push(arr[i])
  }
  console.log(res);
  return res;
}

unique(arr);