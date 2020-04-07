# `process` Object

`process` object provides a bridge between a Node application and its running environment.

`process` object is an instance of event-emitter. So we can emit and listen to events on the object

## Useful properties and events

- version: Read dependencies and versions

```bash
$ node -p "process.version"
{
  node: '13.12.0',
  v8: '7.9.317.25-node.30',
  uv: '1.35.0',
  zlib: '1.2.11',
  brotli: '1.0.7',
  ares: '1.16.0',
  modules: '79',
  nghttp2: '1.40.0',
  napi: '6',
  llhttp: '2.0.4',
  openssl: '1.1.1e',
  cldr: '36.1',
  icu: '66.1',
  tz: '2019c',
  unicode: '13.0'
}
```

- env - Lists all environment variables. Better to always read values from a layer above it using `config`.

- release.lts - `node -p "process.release.lts"` will be undefined if not on LTS version of node.

- `exit` event - Will be invokes when application has nothing else to do or a manual `process.exit` call is made.

```js
process.on("exit", (code) => {
  // do one final synchronous operation
  // before node process terminates.
  // can't stop termination at this point
});
```

- `uncaughtException` event - Will invoke when an error is not caught in the application. If not registered, node will print the stack trace and terminate. When it is registered, node will not terminate and will stay in unstable state. It's better to forcefully terminate the process when this event is invoked.

```js
process.on("uncaughtException", (err) => {
  // something wnet unhandled
  // Do any cleanup and EXIT forcefully.
});
```
 