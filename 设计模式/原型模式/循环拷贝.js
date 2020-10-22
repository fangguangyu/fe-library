// 借助栈的数据结构去循环

function cloneLoop(x) {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while(loopList.length) {
    // 深度优先
    const node = loopList.pop(); // 取出栈顶
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;
    if(typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for(let k in data) {
      if(data.hasOwnProperty(k)) {
        if(typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

var a = {
  a1: 1,
  a2: {
    b1: 1,
    b2: {
      c1: 1
    }
  }
}

const b = cloneLoop(a);
console.log(b);