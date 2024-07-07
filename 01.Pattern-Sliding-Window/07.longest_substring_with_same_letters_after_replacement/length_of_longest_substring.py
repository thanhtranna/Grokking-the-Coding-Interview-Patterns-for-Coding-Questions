def length_of_longest_substring(str, k):
    window_start, max_length, max_repeat_letter_count = 0, 0, 0
    freequency_map = {}

    # Try to extend the range [window_start: window_end]
    for window_end in range(len(str)):
        right_char = str[window_end]
        if right_char not in freequency_map:
            freequency_map[right_char] = 0

        freequency_map[right_char] += 1
        max_repeat_letter_count = max(
            max_repeat_letter_count, freequency_map[right_char])

        # current window size is from windowStart to windowEnd, overall we have a
        # letter which is
        # repeating 'maxRepeatLetterCount' times, this means we can have a window which
        # has one letter
        # repeating 'maxRepeatLetterCount' times and the remaining letters we should
        # replace.
        # if the remaining letters are more than 'k', it is the time to shrink the
        # window as we
        # are not allowed to replace more than 'k' letters.
        if (window_end - window_start + 1 - max_repeat_letter_count) > k:
            left_char = str[window_start]
            freequency_map[left_char] -= 1
            window_start += 1

        max_length = max(max_length, window_end - window_start + 1)

    return max_length


def main():
    print(length_of_longest_substring("aabccbb", 2))
    print(length_of_longest_substring("abbcb", 1))
    print(length_of_longest_substring("abccde", 1))


main()
