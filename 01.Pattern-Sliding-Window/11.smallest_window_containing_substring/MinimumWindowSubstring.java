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