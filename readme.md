# Experiment to make processing large amount of page data
Assuming we are collecting lots of data, it's important to process them in right order, while keeping the algorithm extremely fast as well.
This script will auto generate few random data, which will be processed and merge together.

Current stats:
- It takes 1.5 seconds to process ~20MB of data.
- It takes 30 seconds to process ~200MB of data.

Tasks:
- Make it faster.
- Make it accept a specific group, and a specific page as parameter to process only mentioned groups or pages.

## Sample Input

➜  node index.js
425 Bytes
```json
{
  "page1": {
    "group1": [
      {
        "group 1 property 1": "group 1 - 1 First qi0atr",
        "group 1 property 2": "group 1 - 1 Second qi0atr"
      },
      {
        "group 1 property 1": "group 1 - 2 First v8ajbs",
        "group 1 property 2": "group 1 - 2 Second v8ajbs"
      }
    ],
    "group2": [
      {
        "group 2 property 1": "group 2 - 1 First n1jeg",
        "group 2 property 2": "group 2 - 1 Second n1jeg"
      },
      {
        "group 2 property 1": "group 2 - 2 First jwxln",
        "group 2 property 2": "group 2 - 2 Second jwxln"
      }
    ]
  }
}
```

## Sample Output
processGroup: 0.160ms
mergeGroup: 0.035ms

```json
[
  {
    "group 1 property 1": "group 1 - 1 First qi0atr",
    "group 1 property 2": "group 1 - 1 Second qi0atr"
  },
  {
    "group 1 property 1": "group 1 - 2 First v8ajbs",
    "group 1 property 2": "group 1 - 2 Second v8ajbs"
  },
  {
    "group 2 property 1": "group 2 - 1 First n1jeg",
    "group 2 property 2": "group 2 - 1 Second n1jeg"
  },
  {
    "group 2 property 1": "group 2 - 2 First jwxln",
    "group 2 property 2": "group 2 - 2 Second jwxln"
  }
]
```