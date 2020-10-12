const arr = [1, [2, [3, [4, 5]]], 6];
const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');

console.log(res3);