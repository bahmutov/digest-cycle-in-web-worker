(function (root) {


  function isPrime(n) {
    var k;
    var limit = Math.sqrt(n);
    for (k = 2; k <= limit; k += 1) {
      if (n % k === 0) {
        return false;
      }
    }
    return true;
  }
  console.assert(isPrime(1));
  console.assert(isPrime(2));
  console.assert(isPrime(3));
  console.assert(!isPrime(4));
  console.assert(isPrime(5));
  console.assert(!isPrime(6));
  console.assert(isPrime(7));
  console.assert(isPrime(37));
  console.assert(!isPrime(38));

  // finds Nth prime
  function findPrime(n) {
    var foundPrimes = [];
    var k;
    if (foundPrimes.length) {
      k = foundPrimes[foundPrimes.length - 1] + 1;
    } else {
      k = 1;
    }
    while (foundPrimes.length < n) {
      if (isPrime(k)) {
        foundPrimes.push(k);
      }
      k += 1;
    };
    return foundPrimes[n - 1];
  }
  console.assert(findPrime(1) === 1);
  console.assert(findPrime(2) === 2);
  console.assert(findPrime(3) === 3);
  console.assert(findPrime(4) === 5);
  console.assert(findPrime(5) === 7);

  function findPrimes(n) {
    var k, primes = [];
    for (k = 0; k < n; k += 1) {
      var prime = findPrime(k + 2);
      primes.push(prime);
    }
    return primes;
  }

  root.findPrimes = findPrimes;
}(this));
