const fs = require("fs");
const { getData, byteLength, log, logLength } = require("./utils");

// by default it will create a 100MB file with spaces
const [
  pageLength = 1000,
  groupLength = 302,
  filePath = "sample.json"
] = process.argv.slice(2);

const fakeData = getData(pageLength, groupLength);
fs.writeFileSync(filePath, JSON.stringify(fakeData, null, 2))