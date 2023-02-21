using namespace std;

#include <iostream>
#include <vector>

class AverageOfSubarrayOfSizeK
{
public:
    static vector<double> findAverages(int K, const vector<int> &arr)
    {
        vector<double> result(arr.size() - K + 1);
        for (int i = 0; i <= arr.size() - K; i++)
        {
            // find sum of next 'K' elements
            double sum = 0;
            for (int j = i; j < i + K; j++)
            {
                sum += arr[j];
            }
            result[i] = sum / K; // calculate average
        }

        return result;
    }
};

// g++ -std=c++11 AverageOfSubarrayOfSizeK.cpp -o AverageOfSubarrayOfSizeK.out
int main(int argc, char *argv[])
{
    // const std::vector<int> ints = {1, 3, 2, 6, -1, 4, 1, 8, 2};
    // vector<double> result = AverageOfSubarrayOfSizeK::findAverages(5, ints);
    vector<double> result = AverageOfSubarrayOfSizeK::findAverages(5, vector<int>{1, 3, 2, 6, -1, 4, 1, 8, 2});
    cout << "Average of subarrays of size K: ";
    for (double d : result)
    {
        cout << d << " ";
    }

    cout << endl;
}