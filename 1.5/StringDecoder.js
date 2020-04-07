const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

process.stdin.on('readable', () => {
  let chunk;
  while((chunk = process.stdin.read()) !== null) {
    const buff = Buffer.from([chunk])
    console.log('With .toString():', buff.toString());
    console.log('With StringDecoder:', decoder.write(buff));
  }
});

// 0xE2, 0x82, 0xAC -> €
