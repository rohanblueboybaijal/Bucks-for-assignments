const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Who signed the message? ', name => {
    name = name.toString();
    publicPath = 'public' + name + '.pem';
    const publicKey = fs.readFileSync(publicPath, 'utf8');
    const text = fs.readFileSync('unencrypted_text.txt', 'utf8');
    const signature = fs.readFileSync('encrypted_text.txt', 'utf8');
    
    const isVerified = crypto.verify(
        'sha256',
        Buffer.from(text), {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        Buffer.from(signature, 'hex')
    );
    if(isVerified) {
        console.log('Signature Verified');
    }
    else {
        console.log('Signature Verification Failed');
    }
    readline.close();
});

