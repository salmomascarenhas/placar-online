var express = require('express');
var router = express.Router();

// database setting.
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileSync');
const defaultData = require('../data/default-data.json');
const adapter = new FileAsync(__dirname + '/../data/db.json');
const db = low(adapter);
db.defaults(defaultData).write();

const _ = require('lodash');

/* GET home page. */
router.get('/', function (req, res, next) {
  const matches = db.get('matches').value();

  res.render('index', { matches });
});

router.get('/match/:id', function (req, res, next) {
  const { id } = req.params;
  const matches = db.get('matches').value();
  const match = db.get(`matches[${id}]`).value();
  match.bids = _.orderBy(match.bids, ['half', 'time'], ['desc', 'desc']);

  res.render('match', { matches, match, id });
});

module.exports = router;
