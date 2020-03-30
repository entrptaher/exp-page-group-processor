import * as Comlink from "comlink";

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

  const data = {};

  // Get Sorted Array of page keys in data
  const pageKeys = getKeys(output);

  // 0, pageKeys.length / 2
  const getSlicedData = (start, end) => {
    const slicedKeys = pageKeys.slice(start, end);
    var worker = new Worker("worker.js");
    const wrappedFn = Comlink.wrap(worker);
    return wrappedFn([slicedKeys, output]);
  };

  Promise.all([
    getSlicedData(0, pageKeys.length / 2),
    getSlicedData(pageKeys.length / 2)
  ]).then(data => {
    console.log({ data })
    console.timeEnd("processGroup");
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
