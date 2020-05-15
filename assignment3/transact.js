const Transaction = require('./transaction');
const Output = require('./output');
const Input = require('./input');
const fs = require('fs');
const { toUTF8Array, longToByteArray, byteArrayToLong, cryptoHash } = require('./utils');
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
        signatureLength: signature.length
    });
    inputs.push(input);
}

var numOutput = readlineSync.question('Enter the number  of outputs') - 0;

var coins, publicKey, publicKeyPath;
for(let i=0; i< numOutput; i++) {
    coins = readlineSync.question('Enter the number of coins ') - 0;
    publicKeyPath = readlineSync.question('Enter publicKeyPath ');
    publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    output = new Output({
        coins: coins,
        publicKeyLength: publicKey.length,
        publicKey: publicKey
    });
    outputs.push(output);
}

var transaction = new Transaction({inputs, outputs});
var fileName = transaction.id;
fs.writeFileSync(fileName, transaction.data);

var checkTransaction = transaction.byteArrayToTransaction();
console.log(transaction);
console.log(checkTransaction);

const numInputs = checkTransaction.inputs.length;
for(let i=0;i<numInputs; i++) {
    var val;
    val = transaction.inputs[i].id == checkTransaction.inputs[i].id;
    console.log('id check ', val);
    val = transaction.inputs[i].index == checkTransaction.inputs[i].id;
    console.log('index check ', val);
    val = transaction.inputs[i].signature == checkTransaction.inputs[i].signature;
    console.log('check signature ', val);
    val = transaction.inputs[i].signatureLength == checkTransaction.inputs[i].signatureLength;
    console.log('check signatureLength ', val)
}

const numOutputs = checkTransaction.outputs.length;
for(let i=0; i<numOutputs; i++) {
    var val ;
    val = transaction.outputs[i].coins == checkTransaction.outputs[i].coins;
    console.log('coins check ', val);
    val = transaction.outputs[i].publicKey == checkTransaction.outputs[i].publicKey;
    console.log('publicKey check ' , val);
    val = transaction.outputs[i].publicKeyLength == checkTransaction.outputs[i].publicKeyLength;
    console.log('publicKeyLength check', val);

}
var check = JSON.stringify(transaction) == JSON.stringify(checkTransaction);
console.log(check);


// var inputs = [];
// var input = new Input({ 
//     id: '0000cc0c644c4a4de29d0d0a5b4cfaa2186718c99dcf2d63c0f0ad5cc59cc4f5',
//     index: 1,
//     signature : '0000825430717fb8b3a5e18b2f04c76054ec8b43b0e8e2aac433d12c401da75a',
//     signatureLength : 64
// });
// inputs.push(input);
// input = new Input({
//     id: '0000825430717fb8b3a5e18b2f04c76054ec8b43b0e8e2aac433d12c401da75a',
//     index: 2,
//     signature : '0000cc0c644c4a4de29d0d0a5b4cfaa2186718c99dcf2d63c0f0ad5cc59cc4f5',
//     signatureLength : 64
// });

// inputs.push(input);

// var outputs = [];
// var output;

// var publicKey = fs.readFileSync('../assignment2/publicAlice.pem', 'utf8');
// output = new Output({
//     coins: 20,
//     publicKey: publicKey,
//     publicKeyLength: publicKey.length
// });
// outputs.push(output);

// publicKey = fs.readFileSync('../assignment2/publicBob.pem', 'utf8');
// output = new Output({
//     coins: 50,
//     publicKey: publicKey,
//     publicKeyLength: publicKey.length
// });
// outputs.push(output);

// var check = new Transaction({inputs, outputs});
// var checkid = check.id;
// var val = (checkid == fileName);
// console.log(val);







// utf8 = toUTF8Array(str);
// console.log(utf8);

// utf8 = unescape(encodeURIComponent(str));

// var arr = [];
// for (let i = 0; i< utf8.length; i++) {
//     arr.push(utf8.charCodeAt(i));
// }

//0000cc0c644c4a4de29d0d0a5b4cfaa2186718c99dcf2d63c0f0ad5cc59cc4f5
//0000825430717fb8b3a5e18b2f04c76054ec8b43b0e8e2aac433d12c401da75a