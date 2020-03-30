module.exports = function processTable(output) {
    if (!output)
        return {
            columns: [],
            dataSource: []
        };

    const data = {};
    const headers = [];

    for (const groups of Object.values(output)) {
        for (const groupKey of Object.keys(groups)) {
            if (!data[groupKey]) data[groupKey] = [];
            data[groupKey].push(...groups[groupKey])
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
