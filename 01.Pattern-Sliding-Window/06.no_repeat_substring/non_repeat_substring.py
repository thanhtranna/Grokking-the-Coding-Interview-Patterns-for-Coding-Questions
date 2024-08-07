def non_repeat_substring(str):
    window_start = 0
    max_length = 0
    char_index_map = {}

    # try to extend the range [windowStart: windowEnd]
    for window_end in range(len(str)):
        right_char = str[window_end]
        # if the map already contains the 'right_char', shrink the window from the beginning so that
        # we have only one crrurence of 'right_char'
        if right_char in char_index_map:
            # this is tricky; in the current window, we will not have any 'right_char' after its previous
            # and if 'window_start' is already ahead of the last index of 'right_char', we'll keep 'window_end'
            window_start = max(window_start, char_index_map[right_char] + 1)

        # insert the 'right_char' into the map
        char_index_map[right_char] = window_end
        # remember the maximum length so far
        max_length = max(max_length, window_end - window_start + 1)

    return max_length


def main():
    print("Length of the longest substring: " +
          str(non_repeat_substring("aabccbbb")))
    print("Length of the longest substring: " +
          str(non_repeat_substring("abbbb")))
    print("Length of the longest substring: " +
          str(non_repeat_substring("abccde")))


main()
