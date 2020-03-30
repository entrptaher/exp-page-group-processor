const fs = require('fs')
const data = fs.readFileSync('sample.json', 'utf-8')

console.time('JSON.parse');
JSON.parse(data);
console.timeEnd('JSON.parse');