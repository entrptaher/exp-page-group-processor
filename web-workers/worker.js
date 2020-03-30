const { expose } = require("threads/worker");

async function processData([index, part]) {
  const data = {};
  for (const pageData of part) {
    const groupKeys = Object.keys(pageData[1]);
    console.log(groupKeys);
    for (const groupKey of groupKeys) {
      const prevData = (data[groupKey] || []);
      const newData = pageData[1][groupKey];
      data[groupKey] = [...prevData, ...newData];
    }
  }
  return { index, data };
}

expose(processData);
