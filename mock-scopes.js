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

    var self = this;
    Object.observe(this, function (changes) {
      console.log('changed object', self.id, changes);
      changes.forEach(function (change) {
        switch (change.type) {
          case 'add':
          case 'update':
            self.set(change.name, change.object[change.name]);
          break;
        }
      });
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
    var self = this;
    setTimeout(function () {
      digestWorker.postMessage({
        cmd: '$digest',
        id: self.id,
        $compile: $compile && $compile.toString()
      });
    }, 0);
  };

  root.Scope = Scope;
}(this));
