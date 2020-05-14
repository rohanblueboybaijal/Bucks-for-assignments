const Transaction = require('./transaction');
const Output = require('./output');
const Input = require('./input');
const fs = require('fs');
const { toUTF8Array, longToByteArray, byteArrayToLong, HexToByteArray, ByteArrayToHex , cryptoHash } = require('./utils');

var fileName = '93725843e69cbae2fa723432b98a60ffe67513b2ecf6cdd216647eb1a8e02faf';
var buffer = fs.readFileSync(fileName);

var i = 0;
var buf = buffer.slice(i, i+4);
i = i+4;
buf = Uint8Array.from(buf);
var numInput = byteArrayToLong(buf);
var inputs = [];

for(let j=0; j< numInput; j++) {
    buf = buffer.slice(i, i+32);
    i = i+32;
    var id = ByteArrayToHex(buf);
    //console.log(id);

    buf = buffer.slice(i, i+4);
    i = i+4;
    buf = Uint8Array.from(buf);
    var index = byteArrayToLong(buf);
    //console.log(index);

    buf = buffer.slice(i, i+4);
    i = i+4;
    buf = Uint8Array.from(buf);
    var signatureLength = byteArrayToLong(buf);
    //console.log(signatureLength);

    buf = buffer.slice(i, i + signatureLength);
    i = i + signatureLength;
    var signature = buf.toString();
    //console.log(signature);

    var input = new Input({ id, index, signatureLength, signature });
    inputs.push(input);
}

buf = buffer.slice(i, i+4);
i = i+4;
buf = Uint8Array.from(buf);
var numOuput = byteArrayToLong(buf);
console.log(numOuput);
var outputs = [];

for(let j=0; j< numOuput; j++) {

    buf = buffer.slice(i, i+8);
    i = i+8;
    buf = Uint8Array.from(buf);
    var coins = byteArrayToLong(buf);

    buf = buffer.slice(i, i+4);
    i = i+4;
    buf = Uint8Array.from(buf);
    var publicKeyLength = byteArrayToLong(buf);

    buf = buffer.slice(i, i+publicKeyLength);
    i = i + publicKeyLength;
    var publicKey = buf.toString();
    
    var output = new Output({ coins, publicKeyLength, publicKey });
    outputs.push(output);
}

console.log(outputs);