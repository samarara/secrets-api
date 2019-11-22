const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const generateKeyPair = require('./generateKeys');

const readFilePromise = util.promisify(fs.readFile);

const init = async () => {
  const keyAlg = 'rsa';
  const keyOptions = {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  };
  await generateKeyPair(keyAlg, keyOptions);
};

const encrypt = async data => {
  const dataBuffer = Buffer.from(data);
  const publicKey = await readFilePromise(`${__dirname}/public.pem`);
  const encrypted = crypto.publicEncrypt(publicKey, dataBuffer);
  return encrypted.toString('base64');
}

const decrypt = async encryptedData => {
  const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
  const privateKey = await readFilePromise(`${__dirname}/private.pem`);
  const key = {
    key: privateKey,
    passphrase: 'top secret'
  }
  const decrypted = crypto.privateDecrypt(key, encryptedDataBuffer);
  return decrypted.toString();
}

const encryptWithKey = async (data, key) => {
  const dataBuffer = Buffer.from(data);
  const encrypted = crypto.publicEncrypt(key, dataBuffer);
  return encrypted.toString('base64');
}
// encrypt('HI')
//   .then(encrypted => {
//     console.log('encrypted', encrypted);
//     return decrypt(encrypted);
//   })
//   .then(decrypted => {
//     console.log('decrypted', decrypted);
//   })
//   .catch(err => console.log(err));

module.exports = {
  init,
  encrypt,
  encryptWithKey,
  decrypt
}