const Transaction = require('./transaction');
const Output = require('./output');
const Input = require('./input');
const fs = require('fs');
const { longToByteArray, byteArrayToLong, HexToByteArray, ByteArrayToHex , cryptoHash} = require('../utils');

var fileName = '010.dat';
var buffer = fs.readFileSync(fileName);
console.log(buffer);

var transaction = byteArrayToTransaction(buffer);
console.log(transaction);

function byteArrayToTransaction(data) {
    const buffer = Buffer.from(data);
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

        buf = buffer.slice(i, i+4);
        i = i+4;
        buf = Uint8Array.from(buf);
        var index = byteArrayToLong(buf);

        buf = buffer.slice(i, i+4);
        i = i+4;
        buf = Uint8Array.from(buf);
        var signatureLength = byteArrayToLong(buf);

        buf = buffer.slice(i, i + signatureLength);
        i = i + signatureLength;
        var signature = ByteArrayToHex(buf);

        var input = new Input({ id, index, signatureLength, signature });
        inputs.push(input);
    }

    buf = buffer.slice(i, i+4);
    i = i+4;
    buf = Uint8Array.from(buf);
    var numOuput = byteArrayToLong(buf);
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

    var transaction = new Transaction({ inputs, outputs });
    return transaction;
}




// var i = 0;
// var buf = buffer.slice(i, i+4);
// i = i+4;
// buf = Uint8Array.from(buf);
// var numInput = byteArrayToLong(buf);
// var inputs = [];

// for(let j=0; j< numInput; j++) {
//     buf = buffer.slice(i, i+32);
//     i = i+32;
//     var id = ByteArrayToHex(buf);

//     buf = buffer.slice(i, i+4);
//     i = i+4;
//     buf = Uint8Array.from(buf);
//     var index = byteArrayToLong(buf);

//     buf = buffer.slice(i, i+4);
//     i = i+4;
//     buf = Uint8Array.from(buf);
//     var signatureLength = byteArrayToLong(buf);

//     buf = buffer.slice(i, i + signatureLength);
//     i = i + signatureLength;
//     buf = Uint8Array.from(buf);
//     var signature = ByteArrayToHex(buf);

//     var input = new Input({ id, index, signatureLength, signature });
//     inputs.push(input);
// }

// buf = buffer.slice(i, i+4);
// i = i+4;
// buf = Uint8Array.from(buf);
// var numOuput = byteArrayToLong(buf);

// var outputs = [];

// for(let j=0; j< numOuput; j++) {

//     buf = buffer.slice(i, i+8);
//     i = i+8;
//     buf = Uint8Array.from(buf);
//     var coins = byteArrayToLong(buf);

//     buf = buffer.slice(i, i+4);
//     i = i+4;
//     buf = Uint8Array.from(buf);
//     var publicKeyLength = byteArrayToLong(buf);

//     buf = buffer.slice(i, i+publicKeyLength);
//     i = i + publicKeyLength;
//     var publicKey = buf.toString();
    
//     var output = new Output({ coins, publicKeyLength, publicKey });
//     outputs.push(output);
// }


// var transaction = new Transaction({inputs, outputs });
// console.log(transaction);
// var checkBuffer = transaction.byteArrayToTransaction();
// console.log(checkBuffer);

// checkBuffer = Buffer.from((checkBuffer));
// console.log(checkBuffer);
// var check = Buffer.compare(buffer, checkBuffer);

// for(let i=0; i<buffer.length; i++) {
//     if(checkBuffer[i]!=buffer[i]) {
//         console.log(i, buffer[i], checkBuffer[i]);
//     }
// }