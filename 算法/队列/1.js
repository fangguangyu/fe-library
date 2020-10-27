const queue = [];

queue.push('排队1');
queue.push('排队2');
queue.push('排队3');
queue.push('排队4');

while(queue.length) {
  const top = queue.shift();
  console.log('当前退出队列的是' + top);
}

console.log(queue);