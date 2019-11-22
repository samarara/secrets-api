const db = require('diskdb');
const fs = require('fs');

const write = data => {
  db.connect(`${__dirname}/db`, ['secrets']);
  db.secrets.save(data);
}

const read = id => {
  db.connect(`${__dirname}/db`, ['secrets']);
  return db.secrets.find({ id });
}

module.exports = {
  write,
  read
};