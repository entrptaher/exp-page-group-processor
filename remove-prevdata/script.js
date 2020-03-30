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

const processGroup = require('./process-data');

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