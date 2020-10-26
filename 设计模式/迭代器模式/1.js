function iteratorGenerator(list) {
  const len = list.length;
  let idx = 0;

  return {
    next: function() {
      let done = idx >= len;
      let value = !done ? list[idx++] : undefined;

      return {
        done: done,
        value: value
      }
    }
  }
}
var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()

console.log(iterator.next());