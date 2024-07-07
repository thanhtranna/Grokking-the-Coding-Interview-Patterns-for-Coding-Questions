"use strict";

function find_averages_of_subarrays(K, arr) {
  var result = [];
  var windowSum = 0.0,
      windowStart = 0;

  for (var windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // add the next element
    // slide the window, we don't need to slide if we've not hit the required window size of 'k'

    if (windowEnd >= K - 1) {
      result.push(windowSum / K); // calculate the average

      windowSum -= arr[windowStart]; // subtract the element going out

      windowStart++; // slide the window ahead
    }
  }

  return result;
}

var result = find_averages_of_subarrays(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]);
console.log("Averages of subarrays of size K: ".concat(result));