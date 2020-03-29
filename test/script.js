
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base"
});

const mergeGroup = groups => {
  console.time("mergeGroup");
  const data = groups && Object.values(groups).flat();
  console.timeEnd("mergeGroup");
  return data;
};

// Sorted Array of keys in data
const getKeys = data => Object.keys(data).sort(collator.compare);

const processGroup = output => {
  if (!output) return;

  console.time("processGroup");

  // Get Sorted Array of page keys in data
  const pageKeys = getKeys(output);  // 0.631ms

  const data = {};

  const pageKeysP1 = pageKeys.slice(0, pageKeys.length / 2);
  const pageKeysP2 = pageKeys.slice(pageKeys.length / 2);


  var myWorker1 = new Worker('worker.js');
  var myWorker2 = new Worker('worker.js');

  console.time("processTime");
  console.time("processTime2");
  myWorker1.postMessage([pageKeysP1, output]);
  myWorker2.postMessage([pageKeysP2, output]);

  myWorker1.onmessage = function (e) {
    console.timeEnd("processTime");
    console.log(e.data)
    console.log('Message received from worker');
  }

  myWorker2.onmessage = function (e) {
    console.timeEnd("processTime2");
    console.log(e.data)
    console.log('Message received from worker');
  }


  // // For every key in array of page keys
  // for (const pageKey of pageKeys) {

  //   // Get Sorted Array of group keys in data
  //   const groupKeys = Object.keys(output[pageKey]) // 1.221ms - 0.631ms

  //   // For every key in array of group keys
  //   for (const groupKey of groupKeys) {

  //     // Get list of values in a group
  //     const newData = output[pageKey][groupKey];

  //     // Get list of values in the same group in previous data (Feels unnecessary)
  //     const prevData = data[groupKey] || [];

  //     // Merge them and add to the same group in `data` variable
  //     data[groupKey] = [...prevData, ...newData];
  //   }
  // }

  console.timeEnd("processGroup");

  return data;
};

const mergeProcess = input => mergeGroup(processGroup(input));

const addKeyToRow = data =>
  data.map((d, index) => ({ key: `${index + 1}`, ...d }));

const generateColumns = data => {
  const headers = [];
  for (const d of data) {
    const keys = Object.keys(d);
    for (const key of keys) {
      if (!headers.includes(key)) {
        headers.push(key);
      }
    }
  }
  return headers.map(e => ({
    title: e,
    dataIndex: e
  }));
};

const tableData = output => {
  const hasData = !!(output && output.length);
  if (hasData) {
    const data = addKeyToRow(output);
    return {
      columns: generateColumns(output),
      dataSource: data.length ? data : []
    };
  }
  return {
    columns: [],
    dataSource: []
  };
};

export {
  tableData,
  generateColumns,
  mergeProcess,
  mergeGroup,
  processGroup
};
