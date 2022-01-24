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
