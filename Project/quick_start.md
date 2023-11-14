1. run `npm install` inside the client (tinytask) folder
2. run `npx expo start` inside the client folder to run metro
3. run `npm install` inside the server folder
4. run `npm start` inside the server folder to start the api server
5. to run localtunnel so that you can use the app on your phone
    a. globally install `npm install -g localtunnel`
    b. make sure server is running first
    c. generate a url by running li --port 8000
    d. click on the url and enter your public IP address
    e. change the url inside screens/Login.js and screens/Signup.js (keep the /login and /signup part)
    f. run the client