const crypto = require('crypto');
const { workerData, parentPort } = require('worker_threads');

const target = '00000f0000000000000000000000000000000000000000000000000000000000';
const targetValue = HashToNumber(target);
//const targetValue = BigInt('0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

var str = workerData;
console.log(str);
const nonce = findNonce(str, targetValue);

parentPort.postMessage({ nonce : nonce, status : 'Done' });

/********** UTILS **********/

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

function findNonce(str, targetValue) {
    let i = 0;
    var tempString;
    do {
        i++;
        tempString = str + i;
        var hash = crypto.createHash('sha256').update(tempString).digest('hex');
        var hashValue = HashToNumber(hash);
    } while(hashValue >= targetValue)
    return i;
}