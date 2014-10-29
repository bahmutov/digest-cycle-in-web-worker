(function initMockScopes(root) {

  var digestWorker = new Worker('./micro-angular-worker.js');

  digestWorker.onmessage = function (e) {
    root.render && root.render(e.data.html);
  };

  var scopes = 0;
  function Scope() {
    this.id = '$' + scopes;
    scopes += 1;
    digestWorker.postMessage({
      cmd: 'Scope',
      id: this.id
    });
    console.log('created mock scope', this.id);
  }

  Scope.prototype.set = function (name, value) {
    digestWorker.postMessage({
      cmd: 'set',
      id: this.id,
      name: name,
      value: value
    });
    console.log('set mock scope', this.id, 'property', name, '=', value);
  };

  Scope.prototype.$watch = function (watchFn, listenerFn) {
    digestWorker.postMessage({
      cmd: '$watch',
      id: this.id,
      watchFn: watchFn.toString(),
      listenerFn: listenerFn && listenerFn.toString()
    });
  };

  Scope.prototype.$digest = function ($compile) {
    digestWorker.postMessage({
      cmd: '$digest',
      id: this.id,
      $compile: $compile && $compile.toString()
    });
  };

  root.Scope = Scope;
}(this));
