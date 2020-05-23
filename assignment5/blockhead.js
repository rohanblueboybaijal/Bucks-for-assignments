const fs = require('fs');
const readlineSync = require('readline-sync');
const now = require('nano-time');
const bigintConversion = require('bigint-conversion');
const { longToByteArray, byteArrayToLong, HexToByteArray, ByteArrayToHex, cryptoHash } = require('../utils');

const data = fs.readFileSync('015.dat');
const index = 5;
const parentHash = '2b21ef8ab698e7daf03ccf0110acb4d844fabb5b9513221285f96593d4d4a573';
const target = '0000000f00000000000000000000000000000000000000000000000000000000';
//const target = '00f0000000000000000000000000000000000000000000000000000000000000';

var buffer = Buffer.alloc(0);
var buf1;
var list = [buffer, buf1];


var byteArray = longToByteArray(index);
buf1 = new Uint8Array(4);
for(let i=0; i<4; i++) buf1[i] = byteArray[i+4];
buf1 = Buffer.from(buf1);
list = [buffer, buf1];
buffer = Buffer.concat(list);

byteArray = HexToByteArray(parentHash);
buf1 = new Uint8Array(byteArray.length);
for(let i=0; i<byteArray.length; i++) buf1[i] = byteArray[i];
buf1 = Buffer.from(buf1);
list = [buffer, buf1];
buffer = Buffer.concat(list);

const bodyHash = cryptoHash(data);
byteArray = HexToByteArray(bodyHash);
buf1 = new Uint8Array(byteArray.length);
for(let i=0; i<byteArray.length; i++) buf1[i] = byteArray[i];
buf1 = Buffer.from(buf1);
list = [buffer, buf1];
buffer = Buffer.concat(list);

byteArray = HexToByteArray(target);
buf1 = new Uint8Array(byteArray.length);
for(let i=0; i<byteArray.length; i++) buf1[i] = byteArray[i];
buf1 = Buffer.from(buf1);
list = [buffer, buf1];
buffer = Buffer.concat(list);

const tick = BigInt(now());

const {hash, nonce, timestamp } = findNonce(buffer, target);
console.log('hash ', hash);
console.log('nonce ', nonce);
console.log('timestamp', timestamp);

const tock = BigInt(now());
const t = (tock- tick)/(BigInt(Math.pow(10,9)));
console.log(t);

buf1 = Int64ToBytes(timestamp);
buf1 = Buffer.from(buf1);
list = [buffer, buf1];
buffer = Buffer.concat(list);

buf1 = Int64ToBytes(nonce);
buf1 = Buffer.from(buf1);
list = [buffer, buf1];
buffer = Buffer.concat(list);

var hashCheck = cryptoHash(buffer);
console.log(hashCheck);



function findNonce(data, target) {
    var nonce = 0n;
    const targetValue = HashToNumber(target);
    do {
        nonce += 1n;
        if(nonce%1000n==0n) console.log('trying ', nonce);
        var buffer = data;

        var timestamp = BigInt(now());
        buf1 = Int64ToBytes(timestamp);
        buf1 = Buffer.from(buf1);
        var list = [buffer, buf1];
        buffer = Buffer.concat(list);

        buf1 = Int64ToBytes(nonce);
        buf1 = Buffer.from(buf1);
        list = [buffer, buf1];
        buffer = Buffer.concat(list);

        //console.log(timestamp);
        var hash = cryptoHash(buffer);
        var hashNum = HashToNumber(hash);

    } while(hashNum>=targetValue);

    return {hash, nonce, timestamp};
}


function HashToNumber(hash) {
    
    length = hash.length;
    var ans = BigInt(0);
    for(let i=0; i<length ; i++) {
        if(hash[i]>='0' && hash[i]<='9') {
            let x = hash[i] - '0';
            x = BigInt(x);
            ans = ans*BigInt(16) + x;
        }
        else {
            let x = hash[i].charCodeAt(0) - 97 + 10;
            x = BigInt(x);
            ans = ans*BigInt(16) + x;
        }
    }
    return ans;
}


function BigIntToByteArray(/*long*/long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = BigInt(long & BigInt(0xff));
        byteArray[index] = BigInt(byte);
        long = (long - byte) / BigInt(256) ;
    }

    return byteArray.reverse();
};

function Int64ToBytes(num) {
    var byteArray = new Uint8Array(8);
    for(let i=0; i<8; i++) {
        byteArray[7-i] = parseInt(num%256n);
        num = num/256n;
    }
    return byteArray;
}