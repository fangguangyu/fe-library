const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

const res = Array.from(new Set(arr));

console.log(res);