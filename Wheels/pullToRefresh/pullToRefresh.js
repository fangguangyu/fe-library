
(function() {
  var root = (typeof self == 'object' && self.self == self && self) ||
  (typeof global == 'object' && global.global == global && global) ||
  this || {};

  const util = {
    extend: function(target) {
      for(let i = 1; i < arguments.length; i++) {
        for(let prop in arguments[i]) {
          if(arguments[i].hasOwnProperty(prop) && arguments[i][prop]){
            target[prop] = arguments[i][prop];
          }
        }
      }
      return target;
    }
  }

  function PullToRefresh(options) {
    this.options = util.extend({}, this.constructor.defaultOptions, options);

    this.init();
  }

  PullToRefresh.VERSION = '1.0.0';

  PullToRefresh.defaultOptions = {
    pullText: '下拉以刷新页面', 
    pullIcon: "&#8675;",
    releaseText: "释放以刷新页面",
    refreshText: "刷新",
    refreshIcon: "&hellip;",
    threshold: 60,
    max: 80,
    reloadHeight: 50
  }

  let _state = 'pending';
  let pullStartY = null;
  let pullMoveY = null;
  let dist = 0;
  let distResisted = 0;
  let supportsPassive = false;

  let proto = PullToRefresh.prototype;

  proto.constructor = PullToRefresh;

  proto.init = function() {
    this.createRefreshElement();
    this.setRefreshStyle();

    this.getElement();

    this.supportsPassive();

    this.bindEvent();
  }

  proto.createRefreshElement = function() {
    let elem = document.createElement('div');
    if(this.options.target !== 'body') {
      let target = document.getElementById(this.options.target);
      target.parentNode.insertBefore(elem, target);
    } else {
      console.log(document.body.firstChild);
      document.body.insertBefore(elem, document.body.firstChild);
    }

    elem.className = 'refresh-element';
    elem.id = 'refresh-element';

    elem.innerHTML = '<div class="refresh-box"><div class="refresh-content"><div class="refresh-icon"></div><div class="refresh-text"></div></div></div>';
  }

  proto.setRefreshStyle = function() {
    let styleElem = document.createElement('style');
    styleElem.setAttribute('id', 'refresh-element-style');
    document.head.appendChild(styleElem);
    styleElem.textContent = '.refresh-element {pointer-events: none; font-size: 0.85em; top: 0; height: 0; transition: height 0.3s, min-height 0.3s; text-align: center; width: 100%; overflow: hidden; color: #fff; } .refresh-box {padding: 10px; } .pull {transition: none; } .refresh-text {margin-top: .33em; } .refresh-icon {transition: transform .3s; } .release .refresh-icon {transform: rotate(180deg); }';
  }

  proto.getElement = function() {
    this.refreshElem = document.getElementById('refresh-element');
  }

  proto.supportsPassive = function() {
    try {
      let opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      })
      window.addEventListener('test', null, opts);
    } catch(e) {

    }
  }

  proto.bindEvent = function() {
    console.log(3);
    window.addEventListener('touchstart', this);
    window.addEventListener('touchmove', this, supportsPassive ? { passive: false } : false);
    window.addEventListener('touchend', this);
  }

  proto.handleEvent = function(event) {
    var method = 'on' + event.type;
    if (this[method]) {
        this[method](event);
    }
  };

  proto.shouldPullToRefresh = function() {
    return !window.scrollY;
  }

  // 根据状态更新文字
  proto.update = function() {
    let iconEl = this.refreshElem.querySelector('.refresh-icon');
    let textEl = this.refreshElem.querySelector('.refresh-text');

    if(_state === 'refreshing') {
      iconEl.innerHTML = this.options.refreshIcon;
    } else {
      iconEl.innerHTML = this.options.pullIcon;
    }

    if(_state === 'releasing') {
      textEl.innerHTML = this.options.releaseText;
    }

    if(_state === 'pulling' || _state === 'pending') {
      textEl.innerHTML = this.options.pullText;
    }

    if(_state === 'refreshing') {
      textEl.innerHTML = this.options.refreshText;
    }
  }

  proto.ontouchstart = function(e) {
    console.log(e);
    if(this.shouldPullToRefresh) {
      pullStartY = e.touches[0].screenY;
    }

    if(_state !== 'pending') {
      return;
    }

    _state = 'pending';

    this.update();
  }

  proto.resistanceFunction = function(t) {
    return Math.min(1, t / 2.5);
  }

  proto.ontouchmove = function(e) {
    console.log(e);
    pullMoveY = e.touches[0].screenY;

    if(_state === 'refreshing') {
      return ;
    }

    if(_state === 'pending') {
      this.refreshElem.classList.add(('pull'));
      _state = 'pulling';
      this.update();
    }

    if(pullStartY && pullMoveY) {
      dist = pullMoveY - pullStartY;
    }

    if(dist > 0) {
      e.preventDefault();

      this.refreshElem.style.minHeight = distResisted + 'px';

      distResisted = this.resistanceFunction(dist / this.options.threshold) *
        Math.min(this.options.max, dist);

      
      if(_state === 'pulling' && distResisted > this.options.threshold) {
        this.refreshElem.classList.add('release');
        _state = 'releasing';
        this.update();
      }

      if(_state === 'releasing' && distResisted < this.options.threshold) {
        this.refreshElem.classList.remove('release');
        _state = 'pulling';
        this.update();
      }
    }
  }

  proto.ontouchend = function() {
    console.log('touchend');
    if(_state === 'releasing' && distResisted > this.options.threshold) {
      _state = 'refreshing';

      this.refreshElem.style['minHeight'] = this.options.reloadHeight + 'px';
      this.refreshElem.classList.add('refresh');

      if(typeof this.options.onRefresh === 'function') {
        this.options.onRefresh(this.onReset.bind(this));
      }
    } else {
      if(_state === 'refreshing') {
        return;
      }

      this.refreshElem.style['minHeight'] = '0px';

      _state = 'pending';
    }

    this.update();

    this.refreshElem.classList.remove('release');
    this.refreshElem.classList.remove('pull');

    pullStartY = pullMoveY = null;
    dist = distResisted = 0;
  }

  proto.onReset = function() {
    console.log(1);
    this.refreshElem.classList.remove('refresh');
    this.refreshElem.style['min-height'] = '0px';

    _state = 'pending';
  }

  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
        exports = module.exports = PullToRefresh;
    }
    exports.PullToRefresh = PullToRefresh;
  } else {
      root.PullToRefresh = PullToRefresh;
  }
})()