const fs = require("fs");

var contentArray = (fs.readFileSync(process.argv[2])).toString().split('\n');
console.log(contentArray.length - 1);