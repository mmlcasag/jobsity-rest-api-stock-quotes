# jobsity-rest-api-stock-quotes

This application is an API with authentication and only one endpoint, which receives a ticker as an argument, and then gets stock quotes for that particular ticker from a remote address, parses it and returns the stock price to the caller application.

Dependencies:
* express
* body-parser
* jsonwebtoken
* csv-parser
* mongoose
* bcrypt

How to Run:

* Download and install NodeJS if you do not have it already. You can find it at https://nodejs.org/en/
* Open up the command prompt and navigate until you find yourself at the root folder of this application
* Run "npm install" to install all dependencies
* Run "npm start" to start the application. It should run on port 3030

About the Project:

I have used the MongoDB Atlas service to host the database in the cloud. You can also sign in to the account with the following credentials:

* https://www.mongodb.com/cloud/atlas/signup
* User: mmlcasag.jobsity@gmail.com
* Pass: NodeJS1@

If you want to check how the information is stored in the database, you can use Compass or any other tool you like and connect to the database using the following URL:

* mongodb+srv://admin:admin@cluster-dfw5l.mongodb.net/jobsity-chat-app

This application receives a request from the main application with the ticker name and responds with all the quotes it got from the CSV file.