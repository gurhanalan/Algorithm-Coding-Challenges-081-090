"use strict";

// 81. Convert PascalCase string into snake_case - 5 kyu - codewars
/* 
Complete the function/method so that it takes CamelCase string and returns the string in snake_case notation. Lowercase characters can be numbers. If method gets number, it should return string.

Examples:

//  returns test_controller
toUnderscore('TestController');

// returns movies_and_books
toUnderscore('MoviesAndBooks');

// returns app7_test
toUnderscore('App7Test');

// returns "1"
toUnderscore(1); */

function toUnderscore(str) {
    if (typeof str !== "string") return `${str}`;
    return str
        .replace(/(\w)([A-Z])/g, "$1_$2")
        .toLowerCase()
        .replace(/-/g, "_");
}

console.log(toUnderscore(1));

// 82. Maximum Contiguous Sum - 5kyu
/* Given an unsorted array of integer values, find the maximum positive sum of any contiguous range within the array.

An array containing only negative values can return 0. Your solution should be efficient enough to not throw a timeout exception.

Example:
maxContiguousSum([3, -4, 8, 7, -10, 19, -3]); // returns 24
maxContiguousSum([-8, -10, -12, -2, -3, 5]); // returns 5
Visual example:
[3, -4, 8, 7, -10, 19, -3]
       |_____________|
             ||
             \/
             24 */

function maxContiguousSum(arr) {
    let max = arr[0];

    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
        if (total <= 0) total = 0;
        if (total > max) max = total;
    }
    return max;
}

console.log(maxContiguousSum([3, -4, 8, 7, -10, 19, -3]));
console.log(maxContiguousSum([-8, -10, -12, -2, -3, 5]));

// 83. Maximum subarray sum -5kyu
/* The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray. */

var maxSequence = function (arr) {
    let max = arr[0] || 0;

    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
        if (total <= 0) total = 0;
        if (total > max) max = total;
    }
    return max;
};

// 84. Maximum Subarray Sum II - 5kyu

/* In Maximum subarray sum challenge you had to give the maximum value of the elements of all the subarrays.

In this challenge, we have a similar task but you have to find the sub-array or sub-arrays having this maximum value for their corresponding sums of elements. The wanted function: Python and Ruby: find_subarr_maxsum()// Javascript: findSubarrMaxSum()

find_subarr_maxsum([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == [[4, -1, 2, 1], 6]
If in the solution we have two or more arrays having the maximum sum value, the result will have an array of arrays in the corresponding order of the array, from left to right.

find_subarr_maxsum([4, -1, 2, 1, -40, 1, 2, -1, 4]) == [[[4, -1, 2, 1], [1, 2, -1, 4]], 6]  # From left to right [4, -1, 2, 1] appears in the array before than [1, 2, -1, 4].
If the array does not have any sub-array with a positive sum of its terms, the function will return [[], 0]. */

function find_subarr_maxsum(arr) {
    let max = arr[0] || 0;
    let subArr = [],
        totalArr = [];
    let total = 0;
    let subIndxstart = 0,
        subIndxend = 0;

    const maxObj = {};
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];

        if (total <= 0) {
            total = 0;
            subIndxstart = i + 1;
        }
        if (total >= max && total !== 0) {
            max = total;
            subIndxend = i;
            maxObj[max]
                ? maxObj[max].push([subIndxstart, subIndxend])
                : (maxObj[max] = [[subIndxstart, subIndxend]]);

            // if (!maxObj[max]) {
            //     maxObj[max] = [[subIndxstart, subIndxend]];
            // } else {
            //     maxObj[max].push([subIndxstart, subIndxend]);
            // }
        }
    }
    if (!maxObj[max]) return [[], 0];
    for (let indexes of maxObj[max]) {
        let [a, b] = indexes;
        subArr.push(arr.slice(a, b + 1));
    }
    subArr.length > 1 ? totalArr.push(subArr) : totalArr.push(...subArr);
    totalArr.push(max);
    return totalArr;
}

// console.log(find_subarr_maxsum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(find_subarr_maxsum([-4, -1, -2, -1, -40, -1, -2, -1, -4]));
// console.log(find_subarr_maxsum([4, -1, 2, 1, -40, 1, 2, -1, 4]));
