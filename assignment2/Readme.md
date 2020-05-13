**keypairgen.js** : Run it using ```node keypairgen.js``` to generate key pairs for Alice and Bob.  
The keys are stored in ```.pem``` files named as ```privateAlice.pem``` and so on.

**encryption.js** : The user shall enter 2 arguments. The message and the person that shall sign (Alice or Bob).  
The message is stored in ```unencrypted_text.txt``` and the signature is stored in ```encrypted_text.txt```  

**verification.js** : The user shall answer who signed the message.   
Then the signature is verified using the public key of that person. 
