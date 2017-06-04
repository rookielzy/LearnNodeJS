const fs = require("fs");
const file = process.argv[2];

fs.readFile(file, (err, data) => {
  if (err) throw err;

  let contents = data.toString().split('\n');
  console.log(contents.length - 1);
});