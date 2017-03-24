"use strict";

function f(x) {
  return x * (arguments.length <= 1 ? 0 : arguments.length - 1);
}

console.log(f(3, "hello", true) == 6);