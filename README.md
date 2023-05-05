The app is to test if chatGTP is capable of creating a simple application, e.g The Connected Four Game.
Below is list of main questions used to have ChatGTP coding the app:
# General
##Q:
Building a full-stack application requires knowledge and skills in both front-end and back-end development. Here are the general steps to build a full-stack application:

1. Design the application: Define the requirements, features, and user interface of the application. You can use tools like wireframes and mockups to visualize the application.
2. Set up the development environment: Install and configure the necessary tools and software for both front-end and back-end development, including text editors, frameworks, libraries, and databases.
3. Build the front-end: Develop the user interface of the application using HTML, CSS, and JavaScript. You can use frameworks and libraries like React, Angular, or Vue to build the front-end components.
4. Develop the back-end: Develop the server-side of the application using a back-end programming language like Node.js, Python, Ruby, or PHP. You can use frameworks like Express, Flask, Ruby on Rails, or Laravel to build the back-end components.
5. Connect the front-end and back-end: Use APIs (Application Programming Interfaces) to connect the front-end and back-end components of the application. You can use REST (Representational State Transfer) or GraphQL (Graph Query Language) to create APIs.
6. Implement the database: Choose and implement a database system to store and retrieve data for the application. Popular database systems include MySQL, MongoDB, PostgreSQL, or Firebase.
7. Test and debug the application: Test the application to ensure that it works correctly and debug any issues or errors that arise during the development process.
8. Deploy the application: Deploy the application to a server or cloud platform, such as AWS, Google Cloud, or Heroku, so that it can be accessed by users.

Remember, building a full-stack application is a complex process that requires continuous learning and improvement. Be patient and persistent, and keep honing your skills as you build more applications.
# Backend
## Q1: Outline step to create a backend server our app, using MERN.
1. Install Node.js and NPM on your machine.
2. Create a new directory for your backend server using the command mkdir backend.
3. Navigate into the newly created directory using the command cd backend.
4. Initialize a new Node.js project using the command npm init.
5. Install the required dependencies for your backend server, such as Express, Mongoose, and any other necessary packages using the command npm install.
6. Create a new file called server.js or index.js to define your server and server routes.
7. Configure your server to use the necessary middleware, such as body-parser, cors, and any other required middleware.
6. Define the necessary routes for your backend server using Express.
8. Create a database connection to your MongoDB database using Mongoose.
9. Test your backend server using the command npm start and verify that the server is running as expected.
These are the basic steps to create a backend server for a MERN stack application. From here, you can add additional functionality such as user authentication, database models, and more.

## Q2: Outline steps of using Node.js, express and mongoDB (mongoAtlas) 
to add authentication to our app "The Connected Four Game". 
Only user who has logged in or registered could play the game. 
The backend should create a middleware using JWT tokens, 
additionally, add routes for user registration and login. 
Store user credentials securely in the database using methods like bcrypt to hash passwords before storing them.

1. Create a MongoDB Atlas account and set up a new cluster for the Connected Four Game.
2. Install necessary dependencies, such as express, mongoose, jsonwebtoken, and bcrypt.
3. Set up a database schema for user accounts with fields like email, username, and password (hashed using bcrypt).
4. Create a route for user registration that accepts an email, username, and password, and saves the user's credentials to the database.
5. Create a route for user login that checks the database for the user's email and password, and creates a JWT token for the user.
6. Create middleware that verifies the JWT token before allowing access to the Connected Four Game.
7. Update the Connected Four Game to use the middleware and require user authentication before allowing access to the game.
8. Test the authentication flow by attempting to access the game without being logged in or registered, then registering and logging in before accessing the game.
Note: Make sure to handle errors and edge cases throughout the process.

#Frontend
## Q1: Write the whole game logic correctly and as simple as possible from scratch. Store all the logic in a react component
## Q2: Use sass to add styles to the component above.
## Q3: Provide a scss file named "_variable.scss" with set of dark theme color tone





