function max_sub_array_of_size_k(k, arr) {
  let maxSum = 0,
    windowSum = 0,
    windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // add the next element
    // slide the window, we don't need to slide if we've not hot the required window size of 'k'
    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart]; // subtract the element going out
      windowStart += 1; // slide the window ahead
    }
  }

  return maxSum;
}

console.log(
  `Maximum sum of a subarray of size K: ${max_sub_array_of_size_k(
    3,
    [2, 1, 5, 1, 3, 2]
  )}`
);
console.log(
  `Maximum sum of a subarray of size K: ${max_sub_array_of_size_k(
    2,
    [2, 3, 4, 1, 5]
  )}`
);
