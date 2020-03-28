const {
  mergeProcess,
  byteLength,
  mergeGroup,
  processGroup
} = require("./script");

// creating the data takes around 4 seconds
// put (1000, 1000) to generate a ~195MB file
// put (1000, 100) to generate a ~19.17MB file
const input = require('./get-data')(1000, 1000); 

console.log(byteLength(JSON.stringify(input)));
// console.log(JSON.stringify(input, null, 2));
// console.log(JSON.stringify(mergeProcess(input), null, 2));
mergeProcess(input)
