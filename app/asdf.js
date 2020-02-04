var arr = [1, 2, 3, 4, 5];

function countEl() {
  var output = [];
  var result = '';
  for (let i = 0, x = arr.length; i < x; i++) {
    const isOut = output.findIndex(o => o.value === arr[i]);
    if (isOut >= 0) {
      output[isOut].occurence++;
    } else {
      const out = {
        value: arr[i],
        occurence: 1
      };
      output.push(out);
    }
  }

  for (let j = 0, y = output.length; j < y; j++) {
    result += `${output[j].value} occured ${output[j].occurence} times \n`;
  }
  return result;
}
