# Experiment to make processing large amount of page data
Assuming we are collecting lots of data, it's important to process them in right order, while keeping the algorithm extremely fast as well.
This script will auto generate few random data, which will be processed and merge together.

Current stats:
- It takes 1.5 seconds to process ~20MB of data.
- It takes 30 seconds to process ~200MB of data.

Tasks:
- Make it faster.
- Make it accept a specific group, and a specific page as parameter to process only mentioned groups or pages.

## input
➜  json-data-comparison git:(master) ✗ node index.js
525 Bytes
```json
{
  "page1": {
    "group1": [
      {
        "group 1 property 1": "group 1 - 1 First 9ylp7h",
        "group 1 property 2": "group 1 - 1 Second 9ylp7h"
      },
      {
        "group 1 property 1": "group 1 - 2 First zb226h",
        "group 1 property 2": "group 1 - 2 Second zb226h",
        "group 1 property 3": "group 1 - 2 third zb226h"
      }
    ],
    "group2": [
      {
        "group 2 property 1": "group 2 - 1 First t5km7v",
        "group 2 property 2": "group 2 - 1 Second t5km7v"
      },
      {
        "group 2 property 1": "group 2 - 2 First 3e0a7f",
        "group 2 property 2": "group 2 - 2 Second 3e0a7f",
        "group 2 property 3": "group 2 - 2 third 3e0a7f"
      }
    ]
  }
}
```

## merged data
```json
[
  {
    "group 1 property 1": "group 1 - 1 First 9ylp7h",
    "group 1 property 2": "group 1 - 1 Second 9ylp7h"
  },
  {
    "group 1 property 1": "group 1 - 2 First zb226h",
    "group 1 property 2": "group 1 - 2 Second zb226h",
    "group 1 property 3": "group 1 - 2 third zb226h"
  },
  {
    "group 2 property 1": "group 2 - 1 First t5km7v",
    "group 2 property 2": "group 2 - 1 Second t5km7v"
  },
  {
    "group 2 property 1": "group 2 - 2 First 3e0a7f",
    "group 2 property 2": "group 2 - 2 Second 3e0a7f",
    "group 2 property 3": "group 2 - 2 third 3e0a7f"
  }
]
```

## final data
Notice how the columns are extracted from all groups
```json
{
  "columns": [
    {
      "title": "group 1 property 1",
      "dataIndex": "group 1 property 1"
    },
    {
      "title": "group 1 property 2",
      "dataIndex": "group 1 property 2"
    },
    {
      "title": "group 1 property 3",
      "dataIndex": "group 1 property 3"
    },
    {
      "title": "group 2 property 1",
      "dataIndex": "group 2 property 1"
    },
    {
      "title": "group 2 property 2",
      "dataIndex": "group 2 property 2"
    },
    {
      "title": "group 2 property 3",
      "dataIndex": "group 2 property 3"
    }
  ],
  "dataSource": [
    {
      "key": "1",
      "group 1 property 1": "group 1 - 1 First 9ylp7h",
      "group 1 property 2": "group 1 - 1 Second 9ylp7h"
    },
    {
      "key": "2",
      "group 1 property 1": "group 1 - 2 First zb226h",
      "group 1 property 2": "group 1 - 2 Second zb226h",
      "group 1 property 3": "group 1 - 2 third zb226h"
    },
    {
      "key": "3",
      "group 2 property 1": "group 2 - 1 First t5km7v",
      "group 2 property 2": "group 2 - 1 Second t5km7v"
    },
    {
      "key": "4",
      "group 2 property 1": "group 2 - 2 First 3e0a7f",
      "group 2 property 2": "group 2 - 2 Second 3e0a7f",
      "group 2 property 3": "group 2 - 2 third 3e0a7f"
    }
  ]
}
```