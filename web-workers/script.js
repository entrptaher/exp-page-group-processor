import { spawn, Thread, Worker } from "threads";
import chunk from "lodash/chunk";
import pick from "lodash/pick";

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
  console.group("processGroup");

  const data = {};

  console.time("getKeys");
  // Get Sorted Array of page keys in data
  const pageKeys = getKeys(output);
  console.timeEnd("getKeys");

  const getSlicedData = async (part, index) => {
    var worker = await spawn(new Worker("./worker.js"));
    return {
      worker,
      processor: () => worker([index, part])
    };
  };

  const threadCount =
    typeof navigator !== "undefined"
      ? navigator.hardwareConcurrency
      : require("os").cpus().length;

  // if user have 6 core, it'll process 3 chunks, to avoid using all cores/threads
  const chunkLimit = Math.ceil(pageKeys.length / threadCount);
  const chunks = chunk(Object.entries(output), chunkLimit);
  console.log({ chunks, chunkLimit });

  console.time("processGroup");
  const chunkPromise = Promise.all(
    chunks.map(async (part, index) => {
      const { worker, processor } = await getSlicedData(part, index);
      console.time("processor" + index);
      const data = await processor();
      console.timeEnd("processor" + index);
      await Thread.terminate(worker);
      return data;
    })
  );

  chunkPromise.then(data => {
    console.log({ output, chunks, data });
    console.timeEnd("processGroup");
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
