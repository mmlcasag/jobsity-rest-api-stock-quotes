const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

mongoose.connect('mongodb+srv://admin:admin@cluster-dfw5l.mongodb.net/jobsity-chat-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3030);
    })
    .catch(err => {
        console.log(err);
    });