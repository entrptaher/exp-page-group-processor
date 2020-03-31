import { mergeProcess, tableData } from "./script.js";
import { getData, byteLength, log, logLength } from "./utils.js";
import processTable from './process-table';

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
console.time("processTable");
processTable(input, { pageParams: ["page1", "page2"], groupParams: ['group1'] });
console.timeEnd("processTable");
