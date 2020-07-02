```server.js``` contains the code with all the endpoints.   
```miner.js``` contains the code for finding the nonce.   

Start the server using the following command ```node server.js```  

You can send a ```POST``` request on ```http://localhost:3000/start``` with a **data** field containing the string whose nonce you want to find.   
This endpoint then calls the ```miner.js``` as a parallel node (it keeps trying to find the nonce without affecting the main thread )   

You can send a ```GET``` request on ```http://localhost:3000/result``` to get the result of the **nonce**
