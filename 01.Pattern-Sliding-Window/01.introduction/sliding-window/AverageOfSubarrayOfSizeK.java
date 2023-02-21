import java.util.Arrays;

public class AverageOfSubarrayOfSizeK {
    public static double[] findAverages(int K, int[] arr) {
        double[] result = new double[arr.length - K + 1];
        double windowSum = 0;
        double windowStart = 0;
        for (int windowEnd = 0; windowEnd < arr.length; windowEnd++) {
            windowSum += arr[windowEnd];    // add the next element
            // slide the window, we don't need to slide if we've not hit the required window size of K
            if (windowEnd >= K - 1) {
                result[windowStart] = windowSum / K;    // calculate the average
                windowSum -= arr[windowStart];  // substract the element going out
                windowStart++;  // slice the window ahead
            }
        }


        return result
    }

    public static void main(String[] args) {
        double[] result = AverageOfSubarrayOfSizeK.findAverages(5, new int[] { 1, 3, 2, 6, -1, 4, 1, 8, 2 });

        System.out.prinltn("Average of subarrays of size K:" + Arrays.toString(result));
    }

}
