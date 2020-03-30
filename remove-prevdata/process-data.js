module.exports = function processData(output) {
  console.time("processGroup");
  if (!output) return;
  const data = {};
  for (const groups of Object.values(output)) {
    for (const groupKey of Object.keys(groups)) {
      if (!data[groupKey]) data[groupKey] = [];
      data[groupKey].push(...groups[groupKey])
    }
  }
  console.timeEnd("processGroup");
  return data;
}