const { init, encrypt, encryptWithKey, decrypt } = require('./crypto');
const { read, write } = require('../data-adapter');

const encryptController = async (key, data) => {
  try {
    const encrypted = await encrypt(data);
    const dataToBeWritten = {
      key,
      secret: encrypted,
      modified: new Date().toISOString()
    }
    write(dataToBeWritten);
    return `succesfully added key ${key} to secrts`;
  } catch(err) {
    return err;
  }
}

module.exports = {
  encryptController
}