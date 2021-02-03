
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(cb) {
    this.value = null;
    this.reason = null;
    this.status = PENDING;
    this.resolveList = [];
    this.rejectList = [];

    let resolve = (value) => {
      this.value = value;
      this.status = FULFILLED;
      this.resolveList.forEach(cb => cb(value));
    }

    let reject = (reason) => {
      this.reason = reason;
      this.status = REJECTED;
      this.rejectList.forEach(cb => cb(reason));
    }

    try {
      cb(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onResolve, onReject) {
    if(this.status == FULFILLED) {
      onResolve(this.value);
    }

    if(this.status == REJECTED) {
      onReject(this.reason);
    }

    if(this.status == PENDING) {
      this.resolveList.push(onResolve);
      this.rejectList.push(onReject);
    }
  }
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
}).then((data) => {
  console.log(data);
}, (err) => {
  throw new Error(err);
})