const diskdb = require('../data-provider/diskdb');

dataProviders = {
  diskdb
}

// use this to switch data proviers 
const dataProvider = 'diskdb';
const { read: readWithProider, write: writeWithProvider } = dataProviders[dataProvider];

const read = id => readWithProider(id);
const write = data => writeWithProvider(data);

module.exports = {
  read,
  write
}

