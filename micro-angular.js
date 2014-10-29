function Scope() {
  this.$$watchers = [];
}
Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() { }
  };
  this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function(cb) {
  var self = this;
  var dirty = this.$$watchers.some(function (watch) {
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if (newValue !== oldValue) {
      watch.listenerFn(newValue, oldValue, self);
      watch.last = newValue;
      return true;
    }
  });
  dirty && cb && cb(this);
};


