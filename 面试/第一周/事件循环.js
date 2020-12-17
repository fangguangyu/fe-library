const log = console.log
const deque = []
function next() {
  const fn = deque.shift()
  fn && fn()
}
function Person(name) {
  deque.push(() => {
    log(`Hi, my name is ${name}`)
    next()
  })
  setTimeout(() => {
    next()
  }, 0)
  return this
}
Person.prototype = {
  eat(food) {
    deque.push(() => {
      log(`Eat ${food}`)
      next()
    })
    return this
  },
  sleep(time) {
    deque.push(() => {
      setTimeout(() => {
        log(`sleep ${time}s`)
        next()
      }, time * 1000)
    })
    return this
  },
  sleepFirst(time) {
    deque.unshift(() => {
      setTimeout(() => {
        log(`sleepFirst ${time}s`)
        next()
      }, time * 1000)
    })
    return this
  }
}

new Person('Jack').eat('lunch').sleep(2).eat('dinner').sleepFirst(2)