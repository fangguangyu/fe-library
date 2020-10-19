// 第二版

function Otaku (name, age) {
  this.strength = 60;
  this.age = age;

  return {
    name: name,
    habit: 'Games'
  }
}

Otaku.prototype.sayYourName = function() {
  console.log(this.age);
}

function objectFactory() {

  var obj = new Object(),//从Object.prototype上克隆一个对象

  Constructor = [].shift.call(arguments);//取得外部传入的构造器

  var F=function(){};
  F.prototype= Constructor.prototype;
  obj=new F();//指向正确的原型

  console.log(typeof obj);
  
  var ret = Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性

  return typeof ret === 'object' ? ret : obj;//确保构造器总是返回一个对象

};

var person = objectFactory(Otaku, 'Kevin', '18');

console.log(person.name);
console.log(person.habit); 
console.log(person.strength); 
console.log(person.age);