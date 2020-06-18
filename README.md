# jobsity-rest-api-stock-quotes

This application is an API with authentication and only one endpoint, which receives a ticker as an argument, and then gets stock quotes for that particular ticker from a remote address, parses it and returns the stock price to the caller application.

Dependencies:
* express
* body-parser
* jsonwebtoken
* csv-parser

How to Run:
1) Run "npm install" to install all dependencies
2) Run "npm start" to run the application. It should run on port 3030