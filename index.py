import json

with open('./sample.json') as f:
    data = json.load(f)

print(type(data))

page_keys = sorted(list(data.keys()))

result = {}

for page_key in page_keys:
    group_keys = list(data[page_key].keys())

    for group_key in group_keys:
        new_data = data[page_key][group_key]

        if group_key in result:
            result[group_key] = result[group_key] + new_data
        else:
            result[group_key] = new_data
