var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express App'});
});

router.get('/scores', function(req, res, next) {
  //fixed data, delete later
  const scores = [
    {username: 'Crabby Jabby', wpm: 80, cpm: 400, accuracy: .95 },
    {username: 'Bao WoW', wpm: 70, cpm: 300, accuracy: .93 },
    {username: 'Sobby Bobby ', wpm: 30, cpm: 100, accuracy: .57 },
    {username: 'Buh Wuh', wpm: 150, cpm: 1000, accuracy: 1}
  ]
  res.json(scores);
});

module.exports = router;
