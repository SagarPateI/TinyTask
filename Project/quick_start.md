### Quick Start Instructions

### Pre-requisites:

1. **Install Microsoft Visual Studio Code:**
   - Download and install Visual Studio Code from [here](https://code.visualstudio.com/Download).
   
2. **Install Node.js:**
   - Download and install Node.js from [here](https://nodejs.org/en/download).
   
3. **Open Terminal in Visual Studio Code:**
   - Open Visual Studio Code.
   - Press `Ctrl + \` or click on View -> Terminal to open a terminal.
   - Make sure the terminal is set to use PowerShell.
   
4. **Install Expo CLI:**
   - Install Expo CLI globally by running the following command in the terminal:
     ```bash
     npm install -g expo-cli
     ```
     
#### Client Setup:
1. **Install Git Bash:**
   Download and install Git Bash from [here](https://git-scm.com/downloads).

2. **Open Git Bash Terminals:**
   Open Visual Studio Code and open three Git Bash terminals.

3. **Client Setup:**
   In the first terminal, navigate to the client (`tinytask`) folder:
   ```bash
   cd ./Project/tinyTask
   ```

4. **Install Dependencies:**
   Install the necessary dependencies:
   ```bash
   npm install
   ```

5. **Run Metro:**
   Start Metro by executing either:
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start
   ```

#### Server Setup:
6. **Server Setup:**
   In the second terminal, navigate to the server folder:
   ```bash
   cd ./Project/server/
   ```

7. **Install Server Dependencies:**
   Install server dependencies:
   ```bash
   npm install
   ```

8. **Install Nodemon:**
   Install nodemon globally if not installed:
   ```bash
   npm install -g nodemon
   ```

9. **Start the API Server:**
   Start the API server:
   ```bash
   nodemon start
   ```

#### Running Locally:

10. **Localtunnel Setup:**
    In the third terminal, navigate to the client folder:
    ```bash
    cd ./Project/server
    ```

11. **Install Localtunnel:**
    Install localtunnel globally:
    ```bash
    npm install -g localtunnel
    ```

12. **Start Localtunnel:**
    Start localtunnel with port 8000:
    ```bash
    lt --port 8000 -s tinytask
    ```

13. **Access App on Phone:**
    - Click on the generated URL in the terminal.
    - Click the IPv4 link. Copy and paste the public IP address into the input box on the first webpage.
    - Copy the URL from the previous step.

14. **Update URL in Code:**
    Update the URL inside `screens/Login.tsx` and `screens/Signup.tsx` (keeping the `/login` and `/signup` parts). For example:
    ```typescript
    const { data } = await instance.post('https://tinytask.loca.lt/login', {
        email,
        password,
    });
    ```

15. **Run the Client:**
    In the client terminal, start the client:
    ```bash
    npm start
    ```