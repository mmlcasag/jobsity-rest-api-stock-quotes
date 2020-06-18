const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(3030);