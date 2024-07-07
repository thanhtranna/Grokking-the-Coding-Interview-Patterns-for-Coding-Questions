function non_repeat_substring(str) {
  let windowStart = 0,
    maxLength = 0,
    charIndexMap = {};

  // try to extend the range [windowStart: windowEnd]
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    // if the map already contains the 'rightChar', shrink the window from the beginning so that
    // we have only one occurrence of 'rightChar'
    if (rightChar in charIndexMap) {
      // this is tricky; in the current window, we will not have any 'rightChar' after its previous
      // and if 'windowStart' is already ahdead the last index of 'rightChar'
      windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
    }
    // insert the 'rightChar' into the map
    charIndexMap[rightChar] = windowEnd;
    // remember the maximum length so far
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}


console.log(`Length of the longest subbstring: ${non_repeat_substring('aabccbb')}`)
console.log(`Length of the longest subbstring: ${non_repeat_substring('abbbb')}`)
console.log(`Length of the longest subbstring: ${non_repeat_substring('abccde')}`)