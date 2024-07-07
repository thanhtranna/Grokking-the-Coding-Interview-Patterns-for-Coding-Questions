# 9. Permutation in a String \(hard\)

**Problem:**

[567. Permutation in String](https://leetcode.com/problems/permutation-in-string/)

Given two strings `s1` and `s2`, return true if `s2` contains the permutation of `s1`.

In other words, one of `s1`'s permutations is the substring of `s2`.

**Example 1:**

```text
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

**Example 2:**

```text
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

**Constraints:**

- `1 <= s1.length, s2.length <= 104`
- `s1` and `s2` consist of lowercase English letters.

**Solution:**

**Sliding Window**

**Algorithm**

Instead of generating the hashmap afresh for every window considered in s2, we can create the hashmap just once for the first window in s2. Then, later on when we slide the window, we know that we remove one preceding character and add a new succeeding character to the new window considered. Thus, we can update the hashmap by just updating the indices associated with those two characters only. Again, for every updated hashmap, we compare all the elements of the hashmap for equality to get the required result.

```java
import java.util.HashMap;
import java.util.Map;

public class StringPermutation {
    public static boolean findPermutation(String str, String pattern) {
        int windowStart = 0, matched = 0;
        Map<Character, Integer> charFrequencyMap = new HashMap<>();
        for (char chr : pattern.toCharArray())
            charFrequencyMap.put(chr, charFrequencyMap.getOrDefault(chr, 0) + 1);

        // our goal is to match all the characters from the 'charFreequencyMap' with the
        // current window
        // try to extend the range [windowStart: windowEnd]
        for (int windowEnd = 0; windowEnd < str.length(); windowEnd++) {
            char rightChar = str.charAt(windowEnd);
            if (charFrequencyMap.containsKey(rightChar)) {
                // decrement the frequency of the matched character
                charFrequencyMap.put(rightChar, charFrequencyMap.get(rightChar) - 1);
                if (charFrequencyMap.get(rightChar) == 0) { // character
                    matched++;
                }
            }

            if (matched == charFrequencyMap.size())
                return true;

            if (windowEnd >= pattern.length() - 1) { // shrink the window by one character
                char leftChar = str.charAt(windowStart++);
                if (charFrequencyMap.containsKey(leftChar)) {
                    if (charFrequencyMap.get(leftChar) == 0) {
                        matched--; // before putting the character back, decrement the matched count
                        // put the character back for matching.
                        charFrequencyMap.put(leftChar, charFrequencyMap.get(leftChar) + 1);
                    }
                }
            }
        }

        return false;
    }

    public static void main(String[] args) {
        System.out.println("Permutation exist: " + StringPermutation.findPermutation("oidbcaf", "abc"));
        System.out.println("Permutation exist: " + StringPermutation.findPermutation("odicf", "dc"));
        System.out.println("Permutation exist: " + StringPermutation.findPermutation("bcdxabcdy", "bcdyabcdx"));
        System.out.println("Permutation exist: " + StringPermutation.findPermutation("aaacb", "abc"));
    }
}
```
