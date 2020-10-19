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
  var obj = new Object(),
      Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;
  console.log(typeof obj);
  var ret = Constructor.apply(obj, arguments);



  return typeof ret === 'object' ? ret: obj;
}

var person = objectFactory(Otaku, 'Kevin', '18');

console.log(person.name);
console.log(person.habit); 
console.log(person.strength); 
console.log(person.age);
console.log(person.sayYourName());