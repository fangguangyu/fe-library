
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

// 思路1
const unique1 = (arr) => {
  let len = arr.length;
  for(let i = 0; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
      if(arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
        len--;
        j--;
      }
    }
  }
  return arr;
}

// unique1(arr);


// 思路2
const unique2 = arr => {
  const res = [];
  for(var i = 0,arrLen = arr.length; i < arrLen; i++) {
    for(var j = 0, resLen = res.length; j < resLen; j++){
      if(arr[i] === res[j]) {
        break; // break掉 j的自加加
      }
    }
    // 当j自加到最后没有和resLen相等时，说明res里没有arr[i]这个数。
    if(j == resLen) {
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(unique2(arr));