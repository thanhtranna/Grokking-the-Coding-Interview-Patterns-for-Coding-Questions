# 11. Smallest Window containing Substring (hard)

**Problem:**

&#x20;\*\*\*\* [78. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

Given two strings `s` and `t` of lengths `m` and `n` respectively, return _the **minimum window substring** of_ `s` _such that every character in_ `t` _(**including duplicates**) is included in the window. If there is no such substring, return the empty string_ `""`_._

The testcases will be generated such that the answer is **unique**.

A **substring** is a contiguous sequence of characters within the string.

**Example 1:**

```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

**Example 2:**

```
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

**Example 3:**

```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

**Constraints:**

- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 105`
- `s` and `t` consist of uppercase and lowercase English letters.

&#x20;**Follow up:** Could you find an algorithm that runs in `O(m + n)` time?

### Code

```java
import java.util.*;

class MinimumWindowSubstring {
    public static String findSubstring(String str, String pattern) {
        int windowStart = 0, matched = 0, minLength = str.length() + 1, subStrStart = 0;
        Map<Character, Integer> charFrequenMap = new HashMap<>();
        for (char chr : pattern.toCharArray()) {
            charFrequenMap.put(chr, charFrequenMap.getOrDefault(chr, 0) + 1);
        }

        // try to extend the range [windowStart, windowEnd]
        for (int windowEnd = 0; windowEnd < str.length(); windowEnd++) {
            char rightChar = str.charAt(windowEnd);
            if (charFrequenMap.containsKey(rightChar)) {
                charFrequenMap.put(rightChar, charFrequenMap.get(rightChar) - 1);
                if (charFrequenMap.get(rightChar) >= 0) { // count every matching of a character
                    matched++;
                }
            }

            // shrink the window if we can, finish as soon as we remove a matched character
            while (matched == pattern.length()) {
                if (minLength > windowEnd - windowStart + 1) {
                    minLength = windowEnd - windowStart + 1;
                    subStrStart = windowStart;
                }

                char leftChar = str.charAt(windowStart++);
                if (charFrequenMap.containsKey(leftChar)) {
                    // note that we could have redundant matching characters, thereforce we'll
                    // decrement the
                    // matched count only when a useful occurrence of a matched character is going
                    // out of the window
                    if (charFrequenMap.get(leftChar) == 0) {
                        matched--;
                    }

                    charFrequenMap.put(leftChar, charFrequenMap.get(leftChar) + 1);
                }
            }
        }

        return minLength > str.length() ? "" : str.substring(subStrStart, subStrStart + minLength);
    }

    public static void main(String[] args) {
        System.out.println(MinimumWindowSubstring.findSubstring("aabdec", "abc"));
        System.out.println(MinimumWindowSubstring.findSubstring("abdabca", "abc"));
        System.out.println(MinimumWindowSubstring.findSubstring("adcad", "abc"));
    }
}
```
