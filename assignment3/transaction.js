const { toUTF8Array, longToByteArray, byteArrayToLong, HexToByteArray, cryptoHash } = require('./utils');

class Transaction {
    constructor({ inputs, outputs }) {
        this.inputs = inputs;
        this.outputs = outputs;
        var buffer = this.transactionToByteArray();
        this.id = cryptoHash(buffer.toString());
    }

    addOutput( output ) {
        this.outputs.push(output);
    }

    addInput( input ) {
        this.inputs.push(input);
    }

    transactionToByteArray() {
        var buf1;
        var buffer = Buffer.alloc(0);
        var list = [buffer, buf1];
        const inputs = this.inputs;
        const outputs = this.outputs;

        var inputLength = inputs.length;
        var byteArray = longToByteArray(inputLength);
        buf1 = new Uint8Array(4)
        for(let i = 0; i<4; i++) buf1[i] = byteArray[i];

        buf1 = Buffer.from(buf1);
        list = [buffer,buf1];
        buffer = Buffer.concat(list);

        for(let i = 0; i < inputLength; i+=1) {

            byteArray = HexToByteArray(inputs[i].id);
            buf1 = new Uint8Array(byteArray.length);
            for(let j = 0; j< byteArray.length; j++) {
                buf1[j] = byteArray[j];
            }
            buf1 = Buffer.from(buf1);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);

            byteArray = longToByteArray(inputs[i].index);
            buf1 = new Uint8Array(4)
            for(let j = 0; j<4; j++) buf1[j] = byteArray[j];
            buf1 = Buffer.from(buf1);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);

            byteArray = longToByteArray(inputs[i].signatureLength);
            buf1 = new Uint8Array(4)
            for(let j = 0; j<4; j++) buf1[j] = byteArray[j];
            buf1 = Buffer.from(buf1);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);

            buf1 = Buffer.from(inputs[i].signature);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);
        }

        var outputLength = outputs.length;
        byteArray = longToByteArray(outputLength);
        buf1 = new Uint8Array(4);
        for(let i = 0; i<4; i++) buf1[i] = byteArray[i];
        list = [buffer,buf1];
        buffer = Buffer.concat(list);

        for(let i = 0; i< outputLength; i++) {
            byteArray = longToByteArray(outputs[i].coins);
            buf1 = new Uint8Array(8);
            for(let j = 0; j < 8; j++) buf1[j] = byteArray[j];
            buf1 = Buffer.from(buf1);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);

            byteArray = longToByteArray(outputs[i].publicKeyLength);
            buf1 = new Uint8Array(4);
            for(let j = 0; j< 4 ; j++) buf1[j] = byteArray[j];
            buf1 = Buffer.from(buf1);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);

            buf1 = Buffer.from(outputs[i].publicKey);
            list = [buffer,buf1];
            buffer = Buffer.concat(list);
        }

        return buffer;
    }
}

module.exports = Transaction;