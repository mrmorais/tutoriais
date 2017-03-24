function f(x, ...y) {
  return x * y.length;
}

console.log(f(3, "hello", true) == 6);
