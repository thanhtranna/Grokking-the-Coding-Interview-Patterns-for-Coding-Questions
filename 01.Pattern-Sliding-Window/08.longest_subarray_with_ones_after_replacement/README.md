# 8. Longest Subarray with Ones after Replacement \(hard\)

**Problem:**

[Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)

Given a binary array `nums` and an integer `k`, return _the maximum number of consecutive_ `1`_'s in the array if you can flip at most_ `k` `0`'s.

**Example 1:**

```text
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

**Example 2:**

```text
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

**Solution:**

```java
public class ReplacingOnes {
    public static int findLength(int[] arr, int k) {
        int windowStart = 0, maxLength = 0, maxOnesCount = 0;
        // try to extend the range [windowStart: windowEnd]
        for (int windowEnd = 0; windowEnd < arr.length; windowEnd++) {
            if (arr[windowEnd] == 1) {
                maxOnesCount++;
            }

            // current window size is from windowStart to windowEnd, overall we have a
            // maximum of 1s
            // repeating a maximum of 'maxOnesCount' times, this means that we can have a
            // window with
            // 'maxOnesCount' 1s and the remaining are 0s which should replace with 1s.
            // now, if the remaining 0s are more than 'k', it is the time to shrink the
            // window as we
            // are not allowed to replace more than 'k' 0s.
            if (windowEnd - windowStart + 1 - maxOnesCount > k) {
                if (arr[windowStart] == 1)
                    maxOnesCount--;

                windowStart++;
            }

            maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println(ReplacingOnes.findLength(new int[]{0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1}, 2));
        System.out.println(ReplacingOnes.findLength(new int[]{0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1}, 3));
    }
}
```
