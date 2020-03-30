import { mergeProcess, tableData } from "./script.js";
import { getData, byteLength, log, logLength } from "./utils.js";
import processTableNew from './process-table-new';
import processTableOld from './process-table';

// uncomment if you created json file manually
// node index.js > sample.json
// const input = require('./sample.json');

// put (10, 415) to generate a ~1MB file
// put (1000, 1000) to generate a ~195MB file
// put (1000, 100) to generate a ~19.17MB file
const input = getData(10, 302); // 100MB file?

// logLength(input);
// log(input);
// mergeProcess(input)
console.time("tableNew");
processTableNew(input);
console.timeEnd("tableNew");

console.time("tableOld");
processTableOld(input);
console.timeEnd("tableOld");
