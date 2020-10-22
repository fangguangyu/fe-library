'use strict';

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 将装饰器“安装”到Button类上

var Button = classDecorator(_class = function Button() {
  _classCallCheck(this, Button);
}) || _class;

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator);
