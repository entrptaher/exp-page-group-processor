var _ = require('./lib/lodash');

module.exports = function processTable(dataInput, {
    pageParams = [],
    groupParams = [],
    columns = true,
    key = true
} = {}) {

    if (!dataInput)
        return {
            columns: [],
            dataSource: []
        };

    if (pageParams.length > 0) {
        dataInput = _.pick(dataInput, pageParams);
    }

    const data = {};


    for (const groups of Object.values(dataInput)) {
        for (const groupKey of Object.keys(groups)) {
            if (groupParams.length > 0 && !groupParams.includes(groupKey))
                continue;

            if (!data[groupKey]) data[groupKey] = [];
            data[groupKey].push(...groups[groupKey]);
        }
    }

    const result = data && Object.values(data).flat();

    let count = 0;
    const headers = [];
    const keyAddedResult = [];

    result.forEach(element => {
        // Make Headers
        if (columns) {
            const keys = Object.keys(element);
            const difference = keys.filter(x => !headers.includes(x));
            headers.push(...difference);
        }

        // Make Keys
        if (key) {
            keyAddedResult.push({
                key: count++,
                ...element
            });
        }
    });

    // Preapare output
    const output = {};

    // 
    output.columns = headers.map(e => ({
        title: e,
        dataIndex: e
    }));

    if (key) {
        output.dataSource = keyAddedResult.length ? keyAddedResult : []
    } else {
        output.dataSource = result.length ? result : []
    }

    return output;
}
