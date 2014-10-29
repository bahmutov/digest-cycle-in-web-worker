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

Scope.prototype.$digest = function() {
  var self = this;
  this.$$watchers.forEach(function (watch) {
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if (newValue !== oldValue) {
      watch.listenerFn(newValue, oldValue, self);
      watch.last = newValue;
    }
  });
};


