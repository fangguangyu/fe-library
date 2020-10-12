
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

// 第一次出现才会等于index;
const unique = (arr) => {
  return arr.filter((item,index) => {
    return arr.indexOf(item) === index;
  })
}

console.log(unique(arr));