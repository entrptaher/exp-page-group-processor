var _ = require('./lib/lodash');

module.exports = function processTable(dataInput, { pageParams = [], groupParams = [] } = {}) {
    if (!dataInput)
        return {
            columns: [],
            dataSource: []
        };


    if (pageParams.length > 0) {
        dataInput = _.pick(dataInput, pageParams);
    }

    const data = {};
    const headers = [];

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
    const keyAddedResult = [];

    result.forEach(element => {
        const keys = Object.keys(element);
        const difference = keys.filter(x => !headers.includes(x));
        headers.push(...difference);

        keyAddedResult.push({
            key: count++,
            ...element
        })
    });

    return {
        columns: headers.map(e => ({
            title: e,
            dataIndex: e
        })),
        dataSource: keyAddedResult.length ? keyAddedResult : []
    };
}
