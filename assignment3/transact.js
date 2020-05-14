const Transaction = require('./transaction');
const Output = require('./output');
const Input = require('./input');
const fs = require('fs');
const { toUTF8Array, longToByteArray, byteArrayToLong, cryptoHash } = require('./utils');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var inputs = [];
var input = new Input({ 
    id: '0000cc0c644c4a4de29d0d0a5b4cfaa2186718c99dcf2d63c0f0ad5cc59cc4f5',
    index: 1,
    signature : '0000825430717fb8b3a5e18b2f04c76054ec8b43b0e8e2aac433d12c401da75a',
    signatureLength : 64
});
inputs.push(input);
input = new Input({
    id: '0000825430717fb8b3a5e18b2f04c76054ec8b43b0e8e2aac433d12c401da75a',
    index: 1,
    signature : '0000cc0c644c4a4de29d0d0a5b4cfaa2186718c99dcf2d63c0f0ad5cc59cc4f5',
    signatureLength : 64
});

inputs.push(input);

var outputs = [];
var output;

var publicKey = fs.readFileSync('../assignment2/publicAlice.pem', 'utf8');
output = new Output({
    coins: 20,
    publicKey: publicKey,
    publicKeyLength: publicKey.length
});
outputs.push(output);

publicKey = fs.readFileSync('../assignment2/publicBob.pem', 'utf8');
output = new Output({
    coins: 50,
    publicKey: publicKey,
    publicKeyLength: publicKey.length
});
outputs.push(output);

transaction = new Transaction({inputs, outputs});

var buffer = transaction.transactionToByteArray();
var hash = cryptoHash(buffer.toString());
console.log(hash);
var fileName = hash + '.dat';
fs.writeFileSync(fileName, buffer);
var buf = fs.readFileSync(fileName);
var val = Buffer.compare(buffer, buf);
console.log(val);











// utf8 = toUTF8Array(str);
// console.log(utf8);

// utf8 = unescape(encodeURIComponent(str));

// var arr = [];
// for (let i = 0; i< utf8.length; i++) {
//     arr.push(utf8.charCodeAt(i));
// }

//0000cc0c644c4a4de29d0d0a5b4cfaa2186718c99dcf2d63c0f0ad5cc59cc4f5
//0000825430717fb8b3a5e18b2f04c76054ec8b43b0e8e2aac433d12c401da75a