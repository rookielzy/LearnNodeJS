const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // const rookielzy = {name: 'Jet', age: 23, cool: true };
  // const dog = "O";
  // res.send('Hey! It works!');
  // res.json(rookielzy);
  res.render('hello');
});

module.exports = router;
