function getData(pageLimit = 1, groupLimit = 1){
  function getGroupData(identifier) {
    const groupData = [];
    for (let i = 1; i <= groupLimit; i++) {
      const rand = Math.random().toString(36).substring(7);
      groupData.push({
        [`${identifier} property 1`]: `${identifier} - ${i} First ${rand}`,
        [`${identifier} property 2`]: `${identifier} - ${i} Second ${rand}`,
      });
    }
    return groupData;
  }
  
  const newData = {};
  for (let i = 1; i <= pageLimit; i++) {
    newData[`page${i}`] = {
      group1: getGroupData('group 1'),
      group2: getGroupData('group 2')
    };
  }
  return newData;
}

module.exports = getData;