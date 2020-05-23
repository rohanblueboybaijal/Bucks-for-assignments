const Transaction = require('./transaction');
const Output = require('./output');
const Input = require('./input');
const fs = require('fs');
const { longToByteArray, byteArrayToLong, cryptoHash } = require('../utils');
const readlineSync = require('readline-sync');

var inputs = [];
var outputs = [];

var numInput = readlineSync.question('Enter the number of inputs') - 0;

var id, index, signature;
for(let i=0; i < numInput; i++) {
    id = readlineSync.question('Enter the id ');
    index = readlineSync.question('Enter the index ') - 0;
    signature = readlineSync.question('Enter the signature ');
    input = new Input({
        id: id,
        index: index,
        signature: signature,
        signatureLength: Math.floor(signature.length/2)
    });
    inputs.push(input);
}

var numOutput = readlineSync.question('Enter the number  of outputs') - 0;

var coins, publicKey, publicKeyPath;
for(let i=0; i< numOutput; i++) {
    coins = readlineSync.question('Enter the number of coins ') - 0;
    publicKeyPath = readlineSync.question('Enter publicKeyPath ');
    publicKey = fs.readFileSync(publicKeyPath, 'utf8');
   //publicKey = readlineSync.question('Enter the public Key ');
    output = new Output({
        coins: coins,
        publicKeyLength: publicKey.length,
        publicKey: publicKey
    });
    outputs.push(output);
}

var transaction = new Transaction({inputs, outputs});
console.log(transaction);
var fileName = transaction.id;
console.log(fileName);
//fs.writeFileSync(fileName, transaction.data);

var data = fs.readFileSync('4363de44cf11799a8b2ae12074fc8edf82aa0ec698c5591498a5f286f59cf0f4.dat');
var check = Buffer.compare(data, transaction.data);
console.log(check);






var checkTransaction = transaction.byteArrayToTransaction();
console.log(checkTransaction);

// const numInputs = checkTransaction.inputs.length;
// for(let i=0;i<numInputs; i++) {
//     var val;
//     val = transaction.inputs[i].id == checkTransaction.inputs[i].id;
//     console.log('id check ', val);
//     val = transaction.inputs[i].index == checkTransaction.inputs[i].id;
//     console.log('index check ', val);
//     val = transaction.inputs[i].signature == checkTransaction.inputs[i].signature;
//     console.log('check signature ', val);
//     val = transaction.inputs[i].signatureLength == checkTransaction.inputs[i].signatureLength;
//     console.log('check signatureLength ', val)
// }

// const numOutputs = checkTransaction.outputs.length;
// for(let i=0; i<numOutputs; i++) {
//     var val ;
//     val = transaction.outputs[i].coins == checkTransaction.outputs[i].coins;
//     console.log('coins check ', val);
//     val = transaction.outputs[i].publicKey == checkTransaction.outputs[i].publicKey;
//     console.log('publicKey check ' , val);
//     val = transaction.outputs[i].publicKeyLength == checkTransaction.outputs[i].publicKeyLength;
//     console.log('publicKeyLength check', val);

// }
check = JSON.stringify(transaction) == JSON.stringify(checkTransaction);
console.log(check);
