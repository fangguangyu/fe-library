/**
 *  
 * @param {number[]} nums 
 * @param {number} target
 * @returns {number[]} 
 */

// tips1： 当需要用到双层循环时，可以考虑用空间换时间，
// tips2: 所有的加法算法都可以换成差值的算法。

// Object 
const twoSum1 = function(nums, target) {
  const len = nums.length;
  const diffs = {};
  for(let i = 0; i < len; i++) {
    let diff = target - nums[i];
    if(diffs[diff] !== undefined) {
      return [diffs[diff], i];
    }
    diffs[nums[i]] = i;
  }
}

// es6 Map()
const twoSum2 = (nums, target) => {
  const len = nums.length;
  const diffs = new Map();
  for(let i = 0; i < len; i++) {
    const diff = target - nums[i];
    if(diffs.has(diff)) {
      return [diffs.get(diff), i];
    }
    diffs.set(nums[i], i);
  }
}

console.log(twoSum2([2,7,11,15], 9));

