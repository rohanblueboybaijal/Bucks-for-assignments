readline-sync module used for synchronous I/O.  
A sample input and output chain is provided in the comments in ```transact.js```.

A Transaction object is created with the inputs and outputs as parameters.  
Inside the constructor, the transactionToByteArray function is called and is used to calculate the hash and set the ID.  
Inside transact.js itself, the byteArrayToTransaction function is called and the data is compared against the original transaction.
