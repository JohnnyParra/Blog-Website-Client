# Blog Application (Client / Front-end)

The backend of this application can be found here: [Server Repo](https://github.com/JohnnyParra/BVTCA-Final-Project-Server)

## Getting Started
1. Clone both the Client and Server repositories into a single folder

2. Install all the dependecies for both repos with the following commmand:
```
npm i
```
The above step will need to completed twice, once while in the Client directory and another in the Server directory

3. A database dump was performed and stored in the ExampleDB folder on the server repo.  import this to have a database setup along with some default data for the application.

4. Create a .env file in the server folder that stores the following information:
>DB_HOST      = //The name of the database host (ex. localhost)
>DB_USER      = //The name of the user (ex. root)
>DB_Password  = //The password you used to access your database
>DB_NAME      = //The name of the Schema (ex. blog_database)
>DB_PORT      = //The port your database is running on
>
>JWT_KEY      = //The key you want to use to sign the JWT
>
>PORT         = //The port you want the express backend to run on (ex. 3000)
