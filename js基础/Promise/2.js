
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise{
  constructor(executor) {
    this.status = PENDING;
    this.value = void 0;
    this.reason = void 0;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];

    let resolve = value => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolveCallbacks.forEach(fn => fn());
      }
    }

    let reject = reason => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectCallbacks.forEach(fn => fn());
      }
    }

    try{
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  then(onFulfilled, onReject) {
    if(this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if(this.status === REJECTED) {
      onReject(this.reason);
    }

    if(this.status === PENDING) {
      this.onResolveCallbacks.push(() => {
        onResolve(this.value);
      })

      this.onRejectCallbacks.push(() => {
        onReject(this.value);
      })
    }
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000)
}).then((data) => {
  console.log('success', data);
}, (error) => {
  console.log('error', error);
});