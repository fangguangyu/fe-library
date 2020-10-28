// 双指针对比，需要先把数组序列化一下从大到小或者从小到大。

const merge = function(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;

  while(i >= 0 && j >= 0) {
    //取较大的值，从末尾往前填补
    if(nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }

  while(j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }

  return nums1;
}

const nums1 = [7,8,9], m = 3, nums2 = [2,5,6], n = 3;

console.log(merge(nums1, m, nums2, n));