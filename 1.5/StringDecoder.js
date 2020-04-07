const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

// Process is listening for bytes on stdin,
// when we enter, 
// we put chunk in a buffer 
// feed to toString and decoder write stream

// try the byte sequence mentioned below,
// toString: Tries to read each byte and prints out garbage
// StringDecoder: Waits till byte sequence is complete and then prints

process.stdin.on('readable', () => {
  let chunk;
  while((chunk = process.stdin.read()) !== null) {
    const buff = Buffer.from([chunk])
    console.log('With .toString():', buff.toString());
    console.log('With StringDecoder:', decoder.write(buff));
  }
});

// 0xE2, 0x82, 0xAC -> €
// 0xE2, 0x82, 0xB9 -> ₹
