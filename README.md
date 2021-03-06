# jobsity-rest-api-stock-quotes

This application is an API with authentication and only one endpoint, which receives a ticker as an argument, and then gets stock quotes for that particular ticker from a remote address, parses it and returns the stock price to the caller application.

Dependencies:
* express
* body-parser
* jsonwebtoken
* csv-parser

How to Run:

* Download and install NodeJS if you do not have it already. You can find it at https://nodejs.org/en/
* Open up the command prompt and navigate until you find yourself at the root folder of this application
* Run "npm install" to install all dependencies
* Run "npm start" to start the application. It should run on port 3030

About the Project:

This application receives a request from the main application with the ticker name and responds with all the quotes it got from the CSV file.

I will provide you with Insomnia and Postman files so you can import them and test the endpoints.