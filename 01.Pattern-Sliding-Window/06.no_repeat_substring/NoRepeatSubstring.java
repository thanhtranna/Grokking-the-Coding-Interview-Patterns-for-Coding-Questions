import java.util.HashMap;
import java.util.Map;

public class NoRepeatSubstring {
    public static int findLength(String str) {
        int windowStart = 0, maxLength = 0;
        Map<Character, Integer> charIndexMap = new HashMap<>();
        // try to extend the range [windowStart: windowEnd]
        for (int windowEnd = 0; windowEnd < str.length(); windowEnd++) {
            char rightChar = str.charAt(windowEnd);
            // if the map already contains the 'rightChar', shrink the window from the
            // begining so that
            // we have only one occurrence of 'rightChar'
            if (charIndexMap.containsKey(rightChar)) {
                // this is tricky; in the current window, we will not have any 'rightChar' after
                // previous
                // and if 'windowStart' is already ahead of the last index of 'rightchar', we
                // will keep window
                windowStart = Math.max(windowStart, charIndexMap.get(rightChar) + 1);
            }
            charIndexMap.put(rightChar, windowEnd); // insert the 'rightChar' into the map
            maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println("Length of the longest substring: " + NoRepeatSubstring.findLength("aabccbb"));
        System.out.println("Length of the longest substring: " + NoRepeatSubstring.findLength("abbbb"));
        System.out.println("Length of the longest substring: " + NoRepeatSubstring.findLength("abccde"));
    }
}