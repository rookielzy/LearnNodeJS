const http = require("http");

http.get(process.argv[2], res => {
  const { statusCode } = res;
  if (statusCode !== 200) {
    console.error('Not 200');
  } else {
    let rawData = '';
    res.on('data', chunck => { rawData += chunck; });
    res.on('end', () => {
      rawData = rawData.toString();
      console.log(rawData.length);
      console.log(rawData);
    });
  }

}).on('error', (e) => {
  console.error(`错误: ${e.message}`);
});