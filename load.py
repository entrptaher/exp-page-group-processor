import json
import time

with open('sample.json') as f:
  tic = time.perf_counter()
  data = json.load(f)
  toc = time.perf_counter()
  print(f"json.load took {toc - tic:0.4f} seconds")
