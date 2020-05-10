const { generateKeyPairSync } = require('crypto');
const fs = require('fs');

var { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    // cipher: 'aes-256-cbc',
    // passphrase: ''
  }
});

fs.writeFileSync('privateAlice.pem', privateKey);
fs.writeFileSync('publicAlice.pem', publicKey);


var { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      // cipher: 'aes-256-cbc',
      // passphrase: ''
    }
});
  
fs.writeFileSync('privateBob.pem', privateKey);
fs.writeFileSync('publicBob.pem', publicKey);
