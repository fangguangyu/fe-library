const arr = [1,[2,[3,[4, 5]]], 6]

// 思路1: 使用flat()
/**
 * Syntax
 * var newArray = arr.flat([depth]); default: 1
 *
 */
console.log(arr.flat([Infinity]));
