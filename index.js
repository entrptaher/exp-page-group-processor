const { mergeProcess, tableData } = require("./script");
const { getData, byteLength } = require("./utils");

// creating the data takes around 4 seconds
// put (1000, 1000) to generate a ~195MB file
// put (1000, 100) to generate a ~19.17MB file
const input = getData(1, 2);

console.log(byteLength(JSON.stringify(input)));
console.log(JSON.stringify(input, null, 2));
console.log(JSON.stringify(mergeProcess(input), null, 2));
console.log(JSON.stringify(tableData(mergeProcess(input)), null, 2));
