# 2. Maximum Sum Subarray of Size K \(easy\)

#### Problem Statement

**Given an array of positive numbers and a positive number ‘k,’ find the maximum sum of any contiguous subarray of size ‘k’.**

Example 1:

```text
Input: [2, 1, 5, 1, 3, 2], k=3
Output: 9
Explanation: Subarray with maximum sum is [5, 1, 3].
```

Example 2:

```text
Input: [2, 3, 4, 1, 5], k=2
Output: 7
Explanation: Subarray with maximum sum is [3, 4].
```

How can we solve the question?

We can think of the 'k' as window size of sliding window in an array.

1. With each slide we will remove an element from the left and add an element from the right.
2. Calculate the sum for that window and compare the sum of that window to prevous max sum of sliding windows.
3. **Beware:** Until the window size becomes equal to 'k', we have to just add the next element to the right but we shouldn't remove the element to the left.

So, code for that condition:

```java
public class MaxSumSubArrayOfSizeK {
    public static int findMaxSumSubArray(int k, int[] arr) {
        int windowSum = 0, maxSum = 0;
        int windowStart = 0;
        for (int windowEnd = 0; windowEnd < arr.length; windowEnd++) {
            windowSum += arr[windowEnd]; // add the next element
            // slide the window, we don't need to slide if we've not hit the required window
            // size of 'k'
            if (windowEnd >= k - 1) {
                maxSum = Math.max(maxSum, windowSum);
                windowSum -= arr[windowStart]; // subtract the element going out
                windowStart++; // slide the window ahead
            }
        }

        return maxSum;
    }

    public static void main(String[] args) {
        System.out.println("Maximun sum of aubarray of size K: "
                + MaxSumSubArrayOfSizeK.findMaxSumSubArray(3, new int[] { 2, 1, 5, 1, 3, 2 }));
        System.out.println("Maximun sum of aubarray of size K: "
                + MaxSumSubArrayOfSizeK.findMaxSumSubArray(2, new int[] { 2, 3, 4, 1, 5 }));
    }
}
```

#### Time Complexity

The time complexity of the above algorithm will be O\(N\).

#### Space Complexity

The algorithm runs in constant space O\(1\).
