const util = require('util');
const crypto = require('crypto');
const fs = require('fs');

const options = {
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

const objectToSign = {
  field1: 'val1',
  field2: 'val2'
};

const generateKeyPairPromise = util.promisify(crypto.generateKeyPair);
const writeFilePromise = util.promisify(fs.writeFile);
// generateKeyPairPromise('rsa', options)
//   .then(keypair => {
//     console.log(keypair);
//     const signer = crypto.createSign('RSA-SHA256');

//     signer.write(JSON.stringify(objectToSign));
//     signer.end();
//     const signature = signer.sign({ key: keypair.privateKey, passphrase: 'top secret' }, 'base64');

//     const verifier = crypto.createVerify('RSA-SHA256');
//     verifier.write(JSON.stringify(objectToSign));
//     verifier.end();

//     console.log(verifier.verify(keypair.publicKey, signature, 'base64'));
//     console.log(signature);
//   })
//   .catch(err => console.log(err));

// dynamically created as a proof of concept
// this should not change 
const generateKeyPair = async (alg, options) => {
  const keypair = await generateKeyPairPromise(alg, options);
  await writeFilePromise(`${__dirname}/public.pem`, keypair.publicKey);
  await writeFilePromise(`${__dirname}/private.pem`, keypair.privateKey);
}

// generateKeyPair('rsa', options)
//   .then(() => console.log('done'))
//   .catch(err => console.log(err));
module.exports = {
  generateKeyPair
}