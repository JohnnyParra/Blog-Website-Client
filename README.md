# Blog Application (Client / Front-end)

The backend of this application can be found here: [Server Repo](https://github.com/JohnnyParra/BVTCA-Final-Project-Server)

## Getting Started
1. Clone both the Client and Server repositories into a single folder

2. Install all the dependecies for both repos with the following commmand: <br>
     -This step will need to be completed twice, once while in the Client directory and another in the Server directory
```
npm i
```

3. Import the database dump into mysql using the folder ExampleDB that is in the [Servo Repo](https://github.com/JohnnyParra/BVTCA-Final-Project-Server)

4. Create a .env file in the server folder that stores the following information:  <br>
DB_HOST      = //The name of the database host (ex. localhost)  
DB_USER      = //The name of the user (ex. root)  
DB_PASSWORD  = //The password you used to access your database  
DB_NAME      = //The name of the Schema (ex. blog_database)  
DB_PORT      = //The port your database is running on  
JWT_KEY      = //The key you want to use to sign the JWT  
PORT         = //The port you want the express backend to run on (ex. 3000)  

5. Start the backend server with the following command in the server directory:
   ```
   npm start
   ```

6. Start the frontend server with the following command in the clinet directory:
   ```
   npm run dev
   ```

### How it should look
[website screenshot](/public/Blog_screenshot.png)
