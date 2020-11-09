// const log = console.log
// const deque = []
// function next() {
//   const fn = deque.shift()
//   fn && fn()
// }
// function Person(name) {
//   deque.push(() => {
//     log(`Hi, my name is ${name}`)
//     next()
//   })
//   setTimeout(() => {
//     next()
//   }, 0)
//   return this
// }
// Person.prototype = {
//   eat(food) {
//     deque.push(() => {
//       log(`Eat ${food}`)
//       next()
//     })
//     return this
//   },
//   sleep(time) {
//     deque.push(() => {
//       setTimeout(() => {
//         log(`sleep ${time}s`)
//         next()
//       }, time * 1000)
//     })
//     return this
//   },
//   sleepFirst(time) {
//     deque.unshift(() => {
//       setTimeout(() => {
//         log(`sleepFirst ${time}s`)
//         next()
//       }, time * 1000)
//     })
//     return this
//   }
// }


const queue = [];
const next = function() {
  const fn = queue.shift();
  fn && fn();
}
function Person(name) {
  queue.push(() => {
    console.log(`Hi! This is ${name}`);
    next();
  })
  setTimeout(() => {
    next();
  }, 0)

  return this;
}

Person.prototype.eat = function(val) {
  queue.push(() => {
    console.log(`eat ${val}`);
    next();
  })
  return this;
}

Person.prototype.sleep = function(time) {
  queue.push(() => {
    setTimeout(() => {
      console.log(`sleep ${time}`)
      next();
    }, time * 1000)
  })
  return this;
}

Person.prototype.sleepFirst = function(time) {
  queue.unshift(() => {
    setTimeout(() => {
      console.log(`first log ${time}`)
      next();
    }, time* 1000)
  })
  return this;
}
new Person('Jack').eat('lunch').sleep(2).eat('dinner').sleepFirst(2)