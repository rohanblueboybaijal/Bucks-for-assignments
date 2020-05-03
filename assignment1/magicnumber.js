const crypto = require('crypto');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
readline.question('Enter a string: ', str => {
    console.log(str);
    const {magicNumber, hash } = findMagicNumber(str);
    console.log(magicNumber);
    console.log(hash);
    readline.close();
});

function findMagicNumber(str) {
    let i = 0;
    const hash = crypto.createHash('sha256');
    var newString;
    do {
        i++;
        newString = str + i;
        hashString = cryptoHash(newString);
    }while((hashString).substring(0,4) !== '0'.repeat(4));

    return{
        magicNumber: i,
        hash: hashString
    }

}

function cryptoHash(str) {
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
}