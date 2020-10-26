// 定义发布者类
class Publisher{
  constructor() {
    this.observers = [];
    console.log('Publisher created');
  }
  // 增加订阅者
  add(observer) {
    console.log('Publisher.add invoked');
    this.observers.push(observer);
  }
  // 移除订阅者
  remove(observer) {
    console.log('Publisher.remove');
    this.observers.forEach((item, i) => {
      if(item === observer) {
        this.observers.splice(i, 1);
      }
    })
  }
  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked');
    this.observers.forEach((observer) => {
      observer.update(this);
    })
  }
}


// 定义订阅者类
class Observer{
  constructor() {
    console.log('Observer created');
  }

  update() {
    console.log('Observer.update invoked');
  }
}

class PrdPublisher extends Publisher{
  constructor() {
    super();
    this.prdState = null;
    this.observers = [];
    console.log('PrdPublisher created');
  }

  // 该方法用于获取当前的prdState
  getState() {
    console.log('PrdPublisher.getState invoked');
    return this.prdState;
  }

  // 该方法用于改变prdState的值
  setState(state) {
    console.log('PrdPublisher.setState invoked');
    this.prdState = state;
    this.notify();
  }
}

class DeveloperObserver extends Observer {
  constructor() {
    super();
    this.prdState = {};
    console.log('DeveloperObserver created');
  }

  update(Publisher) {
    console.log('DeveloperObserver.update invoked');
    
    this.prdState = Publisher.getState();

    this.work();
  }

  work() {
    const prd = this.prdState;

    console.log('996 begins...');
  }
}

const liLei = new DeveloperObserver();
const A = new DeveloperObserver();
const B = new DeveloperObserver();

const hanMeiMei = new PrdPublisher();
const prd = {
  
}

hanMeiMei.add(liLei);
hanMeiMei.add(A);
hanMeiMei.add(B);

hanMeiMei.setState(prd);
