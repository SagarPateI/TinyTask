1. run `npm install` inside the client (tinytask) folder
2. run `npx expo start` inside the client folder to run metro
3. run `npm install` inside the server folder
4. run `npm start` inside the server folder to start the api server
5. to run localtunnel so that you can use the app on your phone

    a. globally install `npm install -g localtunnel`
    
    b. make sure server is running first: `npm start`
    
    c. generate a url by running `lt --port 8000`
    
    d. click on the url in the terminal, click the ipv4 link, copy/paste the public IP address into the box on the first webpage
    
    e. change the url inside screens/Login.js and screens/Signup.js (keep the /login and /signup part)

ex. 
``` Typescript
    const { data } = await instance.post('https://short-ants-take.loca.lt/login', {
            email,
            password,
        });
```
    f. run the client: `npm start`