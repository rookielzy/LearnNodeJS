const http = require("http");
const urls = [...process.argv].slice(2);
const reg = /^(1|4|5)/;
const results = [];
let count = 0;
let rawData = '';
urls.forEach(url => {
  http.get(url, res => {
    const { statusCode } = res;
    if (!reg.test(statusCode.toString())) {
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        results.push(rawData.toString());
        count++;

        if (count === 3) {
          results.forEach(result => console.log(result));
        }
      });
    } else {
      console.error('Service Error');
      res.resume();
      return;
    }
  }).on('error', e => {
    console.error(e.message);
  });
});