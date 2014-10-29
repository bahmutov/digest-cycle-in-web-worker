importScripts('micro-angular.js', 'primes.js');

onmessage = function (e) {
  console.log('worker received message:', e.data);
  switch (e.data.cmd) {
    case 'primes':
      var scope = new Scope();
      scope.$watch(function watcherFn(scope) {
        return scope.n;
      }, function listenerFn(newValue, oldValue, scope) {
        if (newValue) {
          console.log('finding', newValue, 'primes');
          scope.primes = findPrimes(newValue);
        }
      });
      scope.n = e.data.n;

      scope.$digest(function afterDigest(scope) {
        var n = scope.n;
        var str = '<ul>';
        for (k = 0; k < n; k += 1) {
          str += '<li>' + (k + 1) + ' prime ' + scope.primes[k] + '</li>';
        }
        str += '</ul>';
        postMessage({
          html: str
        });
      });
    break;
  }
};
