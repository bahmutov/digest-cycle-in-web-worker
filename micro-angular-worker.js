importScripts('micro-angular.js', 'primes.js');

var scopes = {};

onmessage = function digestOnMessage(e) {
  console.log('micro-angular-worker received:', e.data);
  switch (e.data.cmd) {
    case 'Scope':
      scopes[e.data.id] = new Scope(e.data.id);
    break;
    case 'set':
      scopes[e.data.id][e.data.name] = e.data.value;
    break;
    case '$watch':
      scopes[e.data.id].$watch(
        eval('(' + e.data.watchFn + ')'),
        e.data.listenerFn && eval('(' + e.data.listenerFn + ')')
      );
    break;
    case '$digest':
      scopes[e.data.id].$digest(function digestFinished() {
        var $compile, scope, html;
        if (e.data.$compile) {
          $compile = eval('(' + e.data.$compile + ')');
          scope = scopes[e.data.id];
          html = $compile(scope);
        }

        postMessage({
          cmd: 'digestFinished',
          html: html
        });
      });
    break;
  }
};
