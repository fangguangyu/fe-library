const stack = [];

stack.push('雪糕1');
stack.push('雪糕2');
stack.push('雪糕3');
stack.push('雪糕4');
stack.push('雪糕5');



while(stack.length) {
  const top = stack.pop();
  console.log('现在取出的是'+top);
  // stack.pop();
}

console.log(stack);