const fs = require('fs');

const conversionMap = {
  '88': '65',
  '89': '66',
  '90': '67',
};


// Reading this file, getting last 4 charcaters which are
// X(88) with A(65)
// Y(89) with B(66)
// Z(90) with C(67)
// Finally logging buffer back
// As you can see buffer was modified in place.

fs.readFile(__filename, (err, buffer) => {
  let tag = buffer.slice(-5, -1);

  for(let i=0;i < tag.length; i++) {
    console.log(tag[i])
    tag[i] = conversionMap[tag[i]];
  }

  console.log(buffer.toString());
});

// TAG: XYZ
