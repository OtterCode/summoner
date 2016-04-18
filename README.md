# Summoner
A caching http requester for consuming APIs on the server.

## What it is:
Summoner will get data from a server, parse it, cache it for a configurable length of time, and hand it back off to you as many times as you like until it expires.

Summoner is not yet battle-hardened, so any error reports or pull requests are welcomed.

## How to use it:
````javascript
var summoner = require('summoner');
summoner('http://jsonplaceholder.typicode.com/posts/1', (err, json) => {
  console.log(json) // All that wonderful JSON data, pre-parsed, as often as you like, almost guilt-free!
})

summoner({url: 'http://www.google.com/humans.txt', type: "text"}, (err, raw) => {
  console.log(raw) // Raw, fierce, unedited text!
})
````

## What it's made of:
[Node-cache](https://www.npmjs.com/package/node-cache) makes up the backbone of the beast, while the fabulous and extensive [request](https://www.npmjs.com/package/request) library is its sinews. The summoner's resolve is tested with the slim and deceptive [http-server](https://www.npmjs.com/package/http-server), and its wit is measured with [tape](https://www.npmjs.com/package/tape).
