const filterFn = require('./solution_filter');
const dir = process.argv[2];
const filterStr = process.argv[3];

filterFn(dir, filterStr, (err, list) => {
    if (err) {
        return console.error('There was an error: ', err);
    }

    list.forEach(file => {
        console.log(file);
    })
})