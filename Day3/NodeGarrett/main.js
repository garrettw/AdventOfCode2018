const fs = require('fs');

try {
  var data = fs.readFileSync('input.txt', 'utf8').toString().split("\n");
} catch (e) {
  console.log('Error:', e.stack);
}

var gridsize = [0, 0];
var grid = [];
var counter = 0;

for (i in data) {
  if (data[i] == "") continue;

  var parse = data[i].match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  data[i] = {
    "index": parseInt(parse[1]),
    "left": parseInt(parse[2]),
    "top": parseInt(parse[3]),
    "width": parseInt(parse[4]),
    "height": parseInt(parse[5]),
  };
  gridsize[0] = Math.max(gridsize[0], parse[2] + parse[4]);
  gridsize[1] = Math.max(gridsize[1], parse[3] + parse[5]);
}

var grid = Array(gridsize[1]).fill(Array(gridsize[0]).fill([]));

for (i in data) {
  right = data[i].left + data[i].width;
  bottom = data[i].top + data[i].height;

  for (x = data[i].left; x < right; x++) {
    for (y = data[i].top; y < bottom; y++) {
      grid[y][x].push(data[i].index);
      if (grid[y][x].length > 1) {
        counter++;
      }
    }
  }
}

console.log(counter);
