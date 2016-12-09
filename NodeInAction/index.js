function foo(callback) {
    setTimeout(callback, 200);
}

var color = 'blue';

(function(color) {
    console.log('The color is ' + color);
})(color);

color = 'green';