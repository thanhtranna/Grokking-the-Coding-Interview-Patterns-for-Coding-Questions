# 12. Words Concatenation \(hard\)

**Problem:**

[30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)

You are given a string `s` and an array of strings `words` of **the same length**. Return all starting indices of substring\(s\) in `s` that is a concatenation of each word in `words` **exactly once**, **in any order**, and **without any intervening characters**.

You can return the answer in **any order**.

**Example 1:**

```text
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.
```

**Example 2:**

```text
Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []
```

**Example 3:**

```text
Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6,9,12]
```

**Constraints:**

- `1 <= s.length <= 104`
- `s` consists of lower-case English letters.
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `words[i]` consists of lower-case English letters.

### Code

```java
import java.util.*;

public class WordConcatenation {
	public static List<Integer> findWordConcatenation(String str, String[] words) {
		Map<String, Integer> wordFrequencyMap = new HashMap<>();
		for (String word : words)
			wordFrequencyMap.put(word, wordFrequencyMap.getOrDefault(word, 0) + 1);

		List<Integer> resultIndices = new ArrayList<Integer>();
		int wordsCount = words.length, wordLength = words[0].length();

		for (int i = 0; i <= str.length() - wordsCount * wordLength; i++) {
			Map<String, Integer> wordsSeen = new HashMap<>();
			for (int j = 0; j < wordsCount; j++) {
				int nextWordIndex = i + j * wordLength;
				// get the next word from the string
				String word = str.substring(nextWordIndex, nextWordIndex + wordLength);
				if (!wordFrequencyMap.containsKey(word)) { // break if we don't need this word
					break;
				}

				wordsSeen.put(word, wordsSeen.getOrDefault(word, 0) + 1); // add the word to the 'wordsSeen'

				// no need to process further if the word has higher frequency than required
				if (wordsSeen.get(word) > wordFrequencyMap.getOrDefault(word, 0)) {
					break;
				}

				if (j + 1 == wordsCount) { // store index if we have found all the words
					resultIndices.add(i);
				}
			}
		}

		return resultIndices;
	}

	public static void main(String[] args) {
		List<Integer> result = WordConcatenation.findWordConcatenation("catfoxcat", new String[] { "cat", "fox" });
		System.out.println(result);
		result = WordConcatenation.findWordConcatenation("catcatfoxfox", new String[] { "cat", "fox" });
		System.out.println(result);
	}
}
```
