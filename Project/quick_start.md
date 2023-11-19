### Quick Start Instructions

#### Client Setup:
1. Inside the client (`tinytask`) folder, run:
   ```bash
   npm install
   ```
2. To run Metro, execute:
   ```bash
   npm start
   ```
   ### or
   ```
   npx expo start
   ```

#### Server Setup:
3. Inside the server folder, install dependencies with:
   ```bash
   npm install
   ```
4. Start the API server by running:
   ```bash
   npm start
   ```

#### Running Locally:

To access the app on your phone:
1. Globally install `localtunnel` by running:
   ```bash
   npm install -g localtunnel
   ```
2. Ensure the server is running with:
   ```bash
   npm start
   ```
3. Generate a URL by executing the following command inside the client folder:
   ```bash
   lt --port 8000
   ```
4. Click on the generated URL in the terminal, then click the IPv4 link. Copy and paste the public IP address into the input box on the first webpage.
5. Copy the URL you clicked in the previous step.
6. Update the URL inside `screens/Login.js` and `screens/Signup.js` (keeping the `/login` and `/signup` parts). For example:
   ```typescript
   const { data } = await instance.post('https://short-ants-take.loca.lt/login', {
       email,
       password,
   });
   ```
7. Run the client:
   ```bash
   npm start
   ```