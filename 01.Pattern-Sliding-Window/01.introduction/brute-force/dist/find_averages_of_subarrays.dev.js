"use strict";

function find_averages_of_subarrays(K, arr) {
  var result = [];

  for (var i = 0; i < arr.length - K + 1; i++) {
    // find sum of next 'K' elements
    sum = 0.0;

    for (var j = i; j < i + K; j++) {
      sum += arr[j];
    }

    result.push(sum / K);
  }

  return result;
}

var result = find_averages_of_subarrays(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]);
console.log("Averages of subarrays of size K: ".concat(result));