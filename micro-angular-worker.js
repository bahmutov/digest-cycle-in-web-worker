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
  }
};
