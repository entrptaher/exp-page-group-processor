require "benchmark"
require "json"

def time(&block) 
  puts Benchmark.measure(&block) 
end

json = File.open("sample.json") do |file|
  time {
    JSON.parse(file)
  }
end