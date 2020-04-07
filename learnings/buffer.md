# Buffer

Buffer is heavily used in Node to work with binary streams of data. It is a low level object to represent a sequence of binary data.

A buffer is essentially a chunk of memory allocated *outside v8 heap* and we can put some data in memory, which can be interpreted in many ways based on length of each character. That's why there is always a correcponding *character-encoding* associated with that buffer. 

Whatever we place inside a buffer, doesn't have any character encoding, so to read it we need to specify an encoding.

Unlike arrays, once buffer is allocated, it can't be resized. We can create a buffer in 1 of 3 major ways.

1. Buffer.alloc(n) - Allocates a 0-filed buffer of n bytes in memory.
2. Buffer.allocUnsafe(n) - Allocates a buffer of n byte in memory. This can cause a vulnerability as it can contain sensitive information.
3. Buffer.from() - Allocates a buffer for value passed in argument.

```js

const string = "touché";
const buffer = Buffer.from("touché");

console.log(string.length) // 6
console.log(buffer.length) // 7

```

Buffers are useful when we want to read an image file from TCP stream or a compressed file, or any other form of binary data.

Just like arrays and string, we can use operations like `includes`, `slice`, `indexOf`.

In case of `slice`, unlike arrays, sliced copy will use the same memory space.

See example `1.5/buff.slice.js`

When converting streams of binary data, use [String Decoder](https://nodejs.org/api/string_decoder.html) module as it handles multi-byte charcaters much better. It gracefully handle incomplete characters, while calling `toString` method on buffer doesn't do that.

See example `1.5/StringDecoder.js`
