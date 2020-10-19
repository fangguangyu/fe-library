// 第一版

function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function() {
  console.log('I am ' + this.name);
}

function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);
  
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;  
}

var person = objectFactory(Otaku, 'Kevin', 18);

console.log(person.name);
console.log(person.habit);
console.log(person.strength);

person.sayYourName();