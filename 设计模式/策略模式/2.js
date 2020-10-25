// 函数是一等公民，可作为函数参数，可做函数返回值。也可以赋值给变量。
function pre(originPrice) {
  if(originPrice >= 100) {
    return originPrice - 20;
  }
  return originPrice * 0.9
}

function onSale(originPrice) {
  if(originPrice >= 100) {
    return originPrice - 30;
  }
  return originPrice * 0.8
}

function back(originPrice) {
  if(originPrice >= 200) {
    return originPrice - 50;
  }
  return originPrice;
}

function fresh(originPrice) {
  return originPrice * 0.5;
}

function askPrice(fn, originPrice) {
  return fn(originPrice);
}

var prePrice = askPrice(pre, 100);

console.log(prePrice);