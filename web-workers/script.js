import * as Comlink from "comlink";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base"
});

function chunk(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}

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
  console.group("processGroup");

  const data = {};

  console.time("getKeys");
  // Get Sorted Array of page keys in data
  const pageKeys = getKeys(output);
  console.timeEnd("getKeys");

  const getSlicedData = slicedKeys => {
    var worker = new Worker("worker.js");
    const wrappedFn = Comlink.wrap(worker);
    return wrappedFn([slicedKeys, output]);
  };

  // each thread will handle almost equal keys
  const chunkLimit = Math.ceil(pageKeys.length / navigator.hardwareConcurrency * 2);
  const chunks = chunk(pageKeys, chunkLimit);
  console.log({chunkLimit});
  
  console.time("processGroup-beforePromise");
  const chunkPromise = Promise.all(chunks.map(part => getSlicedData(part)));

  console.time("processGroup-afterPromise");
  chunkPromise.then(data => {
    console.log({ output, chunks, data });
    console.timeEnd("processGroup-beforePromise");
    console.timeEnd("processGroup-afterPromise");
    console.groupEnd("processGroup");
  });

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

export { tableData, generateColumns, mergeProcess, mergeGroup, processGroup };
