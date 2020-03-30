import * as Comlink from "comlink";

async function processData([pageKeys, output]) {
  const data = {};
  // For every key in array of page keys
  for (const pageKey of pageKeys) {
    // Get Sorted Array of group keys in data
    const groupKeys = Object.keys(output[pageKey]); // 1.221ms - 0.631ms

    // For every key in array of group keys
    for (const groupKey of groupKeys) {
      // Get list of values in a group
      const newData = output[pageKey][groupKey];

      // Get list of values in the same group in previous data (Feels unnecessary)
      const prevData = data[groupKey] || [];

      // Merge them and add to the same group in `data` variable
      data[groupKey] = [...prevData, ...newData];
    }
  }
  return { pageKeys, data };
}

Comlink.expose(processData);
