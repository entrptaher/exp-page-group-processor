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

module.exports = function processTable(output) {
    console.time("processGroup");
    if (!output)
        return {
            columns: [],
            dataSource: []
        };

    const data = {};

    for (const groups of Object.values(output)) {
        for (const groupKey of Object.keys(groups)) {
            if (!data[groupKey]) data[groupKey] = [];
            data[groupKey].push(...groups[groupKey])
        }
    }

    console.timeEnd("processGroup");

    const result = data && Object.values(data).flat();


    const keyAddedResult = result.map((d, index) => ({ key: `${index + 1}`, ...d }));

    return {
        columns: generateColumns(keyAddedResult),
        dataSource: keyAddedResult.length ? keyAddedResult : []
    };
}
