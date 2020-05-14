const crypto = require('crypto');

function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

function longToByteArray(/*long*/long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }

    return byteArray;
};

function byteArrayToLong(/*byte[]*/byteArray) {
    var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};function longToByteArray(/*long*/long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }

    return byteArray;
};

function byteArrayToLong(/*byte[]*/byteArray) {
    var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};

function HexToByteArray(str) {
    var byteArray = [];
    const len = str.length;
    for(let i=0; i<len ;i+=2) {
        var byte = 0;
        if(str[i]>='0' && str[i] <='9') {
            byte += 16*(str[i] - '0' );
        }
        else {
            byte += 16*(str[i].charCodeAt(0) - 97 + 10);
        }

        if(str[i+1]>='0' && str[i+1] <='9') {
            byte += (str[i+1] - '0' );
        }
        else {
            byte += (str[i+1].charCodeAt(0) - 97 + 10);
        }
        byteArray.push(byte);
    }
    return byteArray;
}

function ByteArrayToHex(byteArray) {
    var str = '';
    const len = byteArray.length;
    var num;
    for(let i=0; i< len; i++) {
        num = byteArray[i];
        var num1 = Math.floor(num/16);
        if(num1>=0 && num1<=9) {
            str = str + num1;
        }
        else {
            var ch = 97 + num1 - 10;
            ch = String.fromCharCode(ch);
            str = str + ch;
        }
        var num2 = num - 16*num1;
        if(num2>=0 && num2 <=9) {
            str = str + num2;
        }
        else {
            var ch = 97 + num2 - 10;
            ch = String.fromCharCode(ch);
            str = str + ch;
        }
    }
    
    return str;
}

function cryptoHash(str) {
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
}

module.exports = { toUTF8Array, longToByteArray, byteArrayToLong, HexToByteArray, ByteArrayToHex, cryptoHash };