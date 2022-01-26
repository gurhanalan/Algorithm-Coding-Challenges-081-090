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
