const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter message: ', text => {
    readline.question('Who are you? ', name => {
        const signature = encrypt({text, name});
        console.log(signature);
        readline.close();
    });
});


function encrypt({ text, name }) {
    name = name.toString();
    text = text.toString();
    fs.writeFileSync('unencrypted_text.txt', text);
    privatePath = 'private' + name + '.pem';
    privateKey = fs.readFileSync(privatePath, 'utf8');

    const signature = crypto.sign('sha256', Buffer.from(text), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }).toString('hex');

    fs.writeFileSync('encrypted_text.txt', signature);
    return signature;
}