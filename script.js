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

// 85. Find the Longest Substring Consisting of Unique Characters 6kyu
/* Description:
Task
You are given a string s. It's a string consist of letters, numbers or symbols.

Your task is to find the Longest substring consisting of unique characters in s, and return the length of it.

Note
1 <= s.length <= 10^7

5 fixed testcases

100 random testcases, testing for correctness of solution

100 random testcases, testing for performance of code

All inputs are valid.

Pay attention to code performance.

If my reference solution gives the wrong result in the random tests, please let me know(post an issue).

Example
For s="baacab", the output should be 3.

The non repeating substrings in s are:

"b","c","a","ba","ac","ca","ab","cab"
The longest one is "cab", its length is 3.

For s="abcd", the output should be 4.

The longest one is "abcd", its length is 4.

For s="!@#$%^&^%$#@!", the output should be 7.

The longest substring are "!@#$%^&" and "&^%$#@!", their length both are 7. */

function findLongestSubstring(str) {
    const lookup = {};
    let length = 0;
    let longest = 0;
    let lastDoubleIdx = -1;
    for (let i = 0; i < str.length; i++) {
        if (!(lookup[str[i]] || lookup[str[i]] === 0)) {
            length++;
            lookup[str[i]] = i + 1;
        } else {
            if (lastDoubleIdx < lookup[str[i]]) {
                lastDoubleIdx = lookup[str[i]];
                length = i - lastDoubleIdx;
            }
            lookup[str[i]] = i + 1;
            length++;
        }
        if (length > longest) {
            longest = length;
        }
        // console.log(str[i], length);
        // console.log(lookup);
    }
    return longest;
}

// 86. Sort the odd - 6 kyu - codewars
/* You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

Examples
[7, 1]  =>  [1, 7]
[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0] */

function sortArray(array) {
    const oddSorted = array
        .filter((n) => Math.abs(n % 2) === 1)
        .sort((a, b) => a - b);
    let i = -1;

    return array.map((el) => {
        if (el % 2 === 0) return el;
        i++;
        return oddSorted[i];
    });
}

function sortArray2(array) {
    const oddSorted = array
        .filter((n) => Math.abs(n % 2) === 1)
        .sort((a, b) => a - b);
    // let i = -1;

    return array.map((el) => {
        if (el % 2 === 0) return el;
        // i++;
        // return oddSorted[i];
        return oddSorted.shift();
    });
}

console.log(sortArray2([5, -3, 2, 8, -1, 4]));

// 87.  Is a number prime? - 6kyu - codewars

/* Define a function that takes one integer argument and returns logical value true or false depending on if the integer is a prime.

Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

Requirements
You can assume you will be given an integer input.
You can not assume that the integer will be only positive. You may be given negative numbers as well (or 0).
NOTE on performance: There are no fancy optimizations required, but still the most trivial solutions might time out. Numbers go up to 2^31 (or similar, depends on language version). Looping all the way up to n, or n/2, will be too slow. */

function isPrime(num) {
    // check for 1 , 0 and negative nums
    if (num <= 1) return false;

    // make an array of prime numbers till the num
    const arrPrimes = [2];
    let i = 2;
    while (i <= num) {
        if (arrPrimes.every((el) => i % el !== 0)) arrPrimes.push(i);

        i++;
    }

    return arrPrimes.includes(num);
}

// More efficient
function isPrime2(num) {
    // check for 1 and 0
    if (num <= 1) return false;

    // make an array of prime numbers till the num
    const arrPrimes = [2];
    let i = 2;
    //  decreasing the complexity of the algorithm from O(n) to O(sqrt(n))
    while (i <= Math.sqrt(num)) {
        if (num % i === 0) return false;

        i++;
    }
    return true;
}

console.log(isPrime2(5099));

// 88. Break camelCase - 6 kyu - codewars
/* Complete the solution so that the function will break up camel casing, using a space between words.

Example
"camelCasing"  =>  "camel Casing"
"identifier"   =>  "identifier"
""             =>  ""
 */

function solution(string) {
    return string.match(/(^[a-z]+)|[A-Z][a-z]+/g).join(" ");
}

// Shorter solution
function solution2(string) {
    return string.replace(/([A-Z])/g, " $1");
}
//  Without using Regex grouping
const solution3 = (string) => string.replace(/[A-Z]/g, " $&");

// Using function in replace
function solution4(string) {
    return string.replace(/[A-Z]/g, function (char) {
        return " " + char;
    });
}
function solution5(string) {
    return string.replace(/[A-Z]/g, (char) => " " + char);
}
console.log(solution5("camelCasingTest"));

// 89. Create Phone Number - 6kyu codewars

/* Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example:
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
The returned format must be correct in order to complete this challenge.
Don't forget the space after the closing parentheses! */

function createPhoneNumber(numbers) {
    return numbers.join("").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

// 90. Simple Sentences - 6kyu - codewars
/* Implement a function, so it will produce a sentence out of the given parts.

Array of parts could contain:

words;
commas in the middle;
multiple periods at the end.
Sentence making rules:

there must always be a space between words;
there must not be a space between a comma and word on the left;
there must always be one and only one period at the end of a sentence.
Example:

makeSentence(['hello', ',', 'my', 'dear']) // returns 'hello, my dear.' */

function makeSentence(parts) {
    return parts.join(" ").replace(/ ,/g, ",").replace(/\./g, "").trim() + ".";
}

console.log(makeSentence(["hello", ",", "my", "dear"]));
