const log = data => console.log(JSON.stringify(data, null, 2));
const logLength = data => console.log(byteLength(JSON.stringify(data)));

// Generates fake data to use in this experiment
function getData(pageLimit = 1, groupLimit = 1) {
  function getGroupData(page, identifier) {
    const groupData = [];
    for (let i = 1; i <= groupLimit; i++) {
      const rand = Math.random()
        .toString(36)
        .substring(7);
      const data = {
        [`${identifier} property 1`]: `${page} ${identifier} - ${i} First ${rand}`,
        [`${identifier} property 2`]: `${page} ${identifier} - ${i} Second ${rand}`
      };

      // this data get's added only sometimes, which means the first group might not have all keys we need
      if (i % 2 === 0)
        data[`${identifier} property 3`] = `${identifier} - ${i} third ${rand}`;

      groupData.push(data);
    }
    return groupData;
  }

  const newData = {};
  for (let i = 1; i <= pageLimit; i++) {
    newData[`page${i}`] = {
      group1: getGroupData(`page${i}`, "group 1"),
      group2: getGroupData(`page${i}`, "group 2")
    };
  }
  return newData;
}

// https://stackoverflow.com/a/18650828/6161265
// outside function, don't touch
function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  var c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

// https://gist.github.com/lovasoa/11357947
// outside function, don't touch
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

export { getData, byteLength, log, logLength };
