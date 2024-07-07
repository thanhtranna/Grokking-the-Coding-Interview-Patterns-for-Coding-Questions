# 7. Longest Substring with Same Letters after Replacement \(hard\)

**Problem:**

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return _the length of the longest substring containing the same letter you can get after performing the above operations_.

```text
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
```

**Example 2:**

```text
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
```

**Intution:**

The question asks to find the longest substring that contains the same characters. It also says that we can change k characters to make a substring longer and valid.

Ex:

```text
"ABAB" k = 1
```

Here we know that we can change 1 character to make a substring that is a valid answer  
AKA: a substring with all the same characters.

So a valid substring answer would be s.substring\(0, 3\) -&gt; "ABA" because with can replace 1 character.

Another answer could be "BAB".

Using the sliding window technique, we set up pointers `left = 0` and `right = 0`  
We know that a our current window / substring is valid when the number of characters that need to be replaced is &lt;= k.

Lets take the example below to understand it better:  
Ex:

```text
"AABABCC" k = 2
left = 0
right = 4 inclusive
```

This is example above shows a valid substring window because we have enough k changes to change the B's to A's and match the rest of the string.

"AABAB" with 2 changes is valid

We will need to know how many letters in our substring that we need to replace.  
To find out the `lettersToReplace = (end - start + 1) - mostFreqLetter;`  
Pretty much you take the size of the window minus the most freq letter that is in the current window.

Now that we know how many characters that need to be replaced in our window, we can deduce that if `lettersToReplace > k` than the window is invalid and we decrease the window size from the left.

Pulling the whole algorithm together we get:

### Code

```java
import java.util.HashMap;
import java.util.Map;

public class CharacterReplacement {
    public static int findLength(String str, int k) {
        int windowStart = 0, maxLength = 0, maxRepeatLetterCount = 0;
        Map<Character, Integer> letterFrequencyMap = new HashMap<>();

        // try to extend the range [windowStart: windowEnd]
        for (int windowEnd = 0; windowEnd < str.length(); windowEnd++) {
            char rightChar = str.charAt(windowEnd);
            letterFrequencyMap.put(rightChar, letterFrequencyMap.getOrDefault(rightChar, 0) + 1);
            maxRepeatLetterCount = Math.max(maxRepeatLetterCount, letterFrequencyMap.get(rightChar));

            // current window size is from windowStart to windowEnd, overall we have a
            // letter which is
            // repeating 'maxRepeatLetterCount' times, this means we can have a window which
            // has one letter
            // repeating 'maxRepeatLetterCount' times and the remaining letters we should
            // replace.
            // if the remaining letters are more than 'k', it is the time to shrink the
            // window as we
            // are not allowed to replace more than 'k' letters.
            if (windowEnd - windowStart + 1 - maxRepeatLetterCount > k) {
                char leftChar = str.charAt(windowStart);
                letterFrequencyMap.put(leftChar, letterFrequencyMap.get(leftChar) - 1);
                windowStart++;
            }

            maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println(CharacterReplacement.findLength("aabccbb", 2));
        System.out.println(CharacterReplacement.findLength("abbcb", 1));
        System.out.println(CharacterReplacement.findLength("abccde", 1));
    }
}
```

`Time Complexity: O(N)`  
`Space Complexity: O(26) = O(1)`
