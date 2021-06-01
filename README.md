This is the Full Stack Application for the Raffle page. Below I have the separate ReadMEs for both and to run this application, you must run in terminal nodemon App.js in the backend folder to run the database, if successful the terminal will console.log("Listening to port 3001"). Then you must run in terminal npm start when in the frontend folder. When initialized the backend will be empty and fresh from start. Since it is running on the local machine you can use -psql -f rafflefullapp/backend/db/schema.sql to start the database in Postgres and run -psql -f rafflefullapp/backend/db/seeds.sql to create a pair of users and raffle.


Backend

I have removed the node_modules folder for this submission.

This is the raffle backend I have created for the entire raffle App. To run this backend you must type into terminal nodemon App.js. Once the terminal returns "Listening to port 3001" it is working. This backend has a database that uses express and node.js to create data that communicated via routes using the local host.

I have tried to complete all the routes but missed one bonus route, which was the active param set to a boolean. This was very exciting and required a lot of thought to get this backend functioning. The most challenging was picking a winner and returning said winner in json format as it required multiple calls to my schema as well as an if statement to verify the secret token. I added the extra table of entries as it was easier to handle the amount of participants in one given raffle. As well as the intentions of possible allowing a user to enter multiple raffles, however, this was not a requirement but I left it open for the future. 

Dependencies installed: body-parser, cors, dotenv, express, pg-promise

Frontend

I have removed the node_modules folder for this submission.

This raffle frontend project was created in hand with my personal raffle backend database (see other file to connect).

To run this entire project the backend must be launched first with nodemon App.js in terminal to run it as local host. Once the backend is running, this app can be launched in another terminal using npm start.

All routes from my backend will work with this project, however, due to the lack of time, I could not complete the navbar and have decided to scrap the idea in order to have a functioning page.

All routes and params work with this front end raffle app and uses routes, passing down of props, uses react hooks, and is entirely functional with some error handling for the user.

I have also tried to replicate a similar aesthetic to the example given, give more time I would have liked to create a UI and other strech goals I had in mind. I installed and used material UI to assist with elements within the app and to have an overall nice appeal.

Dependencies installed: axios, react, react-dom, react-router-dom, material-ui/core, @material-ui/icons