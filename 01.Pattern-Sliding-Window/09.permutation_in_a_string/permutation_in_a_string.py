def permutation_in_a_string(str, pattern):
    window_start, matched = 0, 0
    char_frequency = {}

    for char in pattern:
        if char not in char_frequency:
            char_frequency[char] = 0
        char_frequency[char] += 1

    # our goal is to match all the characters from the 'char_frequency' with the
    # current window
    # try to extend the range [window_start: window_end]
    for window_end in range(len(str)):
        right_char = str[window_end]
        if right_char in char_frequency:
            # decrement the frequency of matched character
            char_frequency[right_char] -= 1
            if char_frequency[right_char] == 0:
                matched += 1

        if matched == len(char_frequency):
            return True

        # shrink the window by one character
        if window_end >= len(pattern) - 1:
            left_char = str[window_start]
            window_start += 1
            if left_char in char_frequency:
                if char_frequency[left_char] == 0:
                    matched -= 1
                char_frequency[left_char] += 1

    return False


def main():
    print('Permutation exist: ' + str(permutation_in_a_string("oidbcaf", "abc")))
    print('Permutation exist: ' + str(permutation_in_a_string("odicf", "dc")))
    print('Permutation exist: ' +
          str(permutation_in_a_string("bcdxabcdy", "bcdyabcdx")))
    print('Permutation exist: ' + str(permutation_in_a_string("aaacb", "abc")))


main()
