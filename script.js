// https://stackoverflow.com/a/18650828/6161265
function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  var c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

// https://gist.github.com/lovasoa/11357947
function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
  }
  return formatBytes(s);
}

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

const getKeys = data => Object.keys(data).sort(collator.compare);

const processGroup = output => {
  if (!output) return;
  console.time("processGroup");
  const pageKeys = getKeys(output);
  const data = {};
  for (const pageKey of pageKeys) {
    for (const groupKey of getKeys(output[pageKey])) {
      const newData = output[pageKey][groupKey];
      const prevData = data[groupKey] || [];
      data[groupKey] = [...prevData, ...newData];
    }
  }
  console.timeEnd("processGroup");
  return data;
};

const mergeProcess = input => mergeGroup(processGroup(input));

module.exports = {
  byteLength,
  mergeProcess,
  mergeGroup,
  processGroup
};
