# Jumia Server
This is a jumia eccomerce server that uses Node.js, Express and Sequelize to manage products, users, and orders. The website also uses Multer for file uploading and Postgresql as the database.

# Getting started
These instructions will get you a copy of the project running on your local machine for development and testing purposes.

# Prerequistes
What things you need to install the sofyware and how to install them
- Node.js
- npm
- Postgresql

# Installing
A step by step series of examples that tell you how to get the development environment running.

git clone https://github.com/fatuma65/JumiaServer.git

# Install dependencies
npm install

# Create a .env file in the root directory and add the following environment variables
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_HOST=your_database_host

# Run the migrations to create the database tables
npx sequelize-cli db:migrate

# Start the server
npm start if you have nodemon intalled in your project.

The server will now be running on port 4000. You can access the website by visiting http://localhost:3000 in your browser.

# Built With

- Node.js - The web framework used
- Express - Node.js web framework
- Sequelize - Object-Relational Mapping (ORM) library
- Postgresql - The database used
- Multer - A node.js middleware for handling multipart/form-data, which is used for uploading files.

# Acknowledgments

npm install express
npm install body-parser
npm install cors
npm install nodemon
npm install jsonwebtoken
npm install bcrypt
npm install dotenv
npm install multer
npm install nodemon
npm install sequelize
npm install sequelize-cli
