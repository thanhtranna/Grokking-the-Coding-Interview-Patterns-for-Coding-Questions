const findSubstring = function (str, pattern) {
  let windowStart = 0,
    matched = 0,
    substrStart = 0,
    minLength = str.length + 1,
    charFrequency = {};

  for (i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in charFrequency)) {
      charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
  }

  // try to extend the range [windowStart, windowEnd]
  for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in charFrequency) {
      charFrequency[rightChar] -= 1;
      if (charFrequency[rightChar] >= 0) {
        // count avery matching of a character
        matched += 1;
      }
    }

    // Shrink the window if we can, finish as soon as we remove a matched character
    while (matched == pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1;
        substrStart = windowStart;
      }

      const leftChar = str[windowStart];
      windowStart++;
      if (leftChar in charFrequency) {
        // Note that we could have redundant matching characters, therefore we'll decrement the
        // matched count only when a useful occurrence of a matched character is going out of the window
        if (charFrequency[leftChar] === 0) {
          matched++;
        }
        charFrequency[leftChar] += 1;
      }
    }
  }

  if (minLength > str.length) {
    return "";
  }

  return str.substring(substrStart, substrStart + minLength);
};

console.log(findSubstring("aabdec", "abc"));
console.log(findSubstring("abdabca", "abc"));
console.log(findSubstring("adcad", "abc"));
