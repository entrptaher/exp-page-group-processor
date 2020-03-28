const { mergeProcess, tableData } = require("./script");
const { getData, byteLength, log, logLength } = require("./utils");

// uncomment if you created json file manually
// node index.js > sample.json
// const input = require('./sample.json');

// put (10, 415) to generate a ~1MB file
// put (1000, 1000) to generate a ~195MB file
// put (1000, 100) to generate a ~19.17MB file
const input = getData(1000, 415);

// logLength(input);
// log(input);
mergeProcess(input)
// log(tableData(mergeProcess(input)));
