// 三个状态: PENDING, FULFILLED, REJECTED

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise{
  constructor(executor) {
    this.status = PENDING;
    this.value = void 0;
    this.reason = void 0;

    let resolve = value => {
      if(this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
      }
    }

    let reject = reason => {
      if(this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    }

    try{
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  then(onResolve, onReject) {
    if(this.status === FULFILLED) {
      onResolve(this.value);
    }

    if(this.status === REJECTED) {
      onReject(this.value);
    }
  } 
}


const promise = new Promise((resolve, reject) => {
  resolve('成功');
}).then((data) => {
  console.log('success', data);
}, (err) => {
  console.log('failed', err);
})