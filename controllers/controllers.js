const fs = require('fs');
const https = require('https');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const csv = require('csv-parser');

const authConfig = require('../config/auth.json');
const stockConfig = require('../config/stock.json');
const User = require('../models/user');

module.exports.authenticate = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(401).send({ error: true, message: 'E-mail not provided' });
    }
    if (!password) {
        return res.status(401).send({ error: true, message: 'Password not provided' });
    }

    User
    .findOne({ email: email, password: password })
    .then(user => {
        if (!user) {
            return res.status(401).send({ error: true, message: 'Invalid e-mail or password' });
        }
        try {
            const token = jwt.sign({ id: email }, authConfig.secret, { expiresIn: 86400 });
            return res.status(200).send({ error: false, message: 'Success', token: token });
        } catch (err) {
            return res.status(500).send({ error: true, message: 'Could not generate authentication token' });
        }
    })
    .catch(err => {
        return res.status(500).send({ error: true, message: 'Could not generate authentication token' });
    });
}

module.exports.getStockQuote = (req, res, next) => {
    const user = req.authenticatedUser;
    const { ticker } = req.body;
    
    if (!ticker) {
        return res.status(422).send({ error: true, message: 'No ticker provided' });
    }

    const remoteUrl = stockConfig.url + ticker;
    const localPath = 'data/stockquotes-' + ticker + '.csv';

    const results = [];
    try {
        // reads the remote url and write content to a local file
        const file = fs.createWriteStream(localPath);
        https.get(remoteUrl, response => {
            var stream = response.pipe(file);
            stream.on("finish", function() {
                // reads the local file and parses to an object
                fs.createReadStream(localPath)
                    .pipe(csv())
                    .on('data', (data) => {
                        results.push(data);
                    })
                    .on('end', () => {
                        // returns the success message with the real-time stock quotes
                        const result = results[0];
                        res.status(200).send({ error: false, message: {
                            symbol: result.Symbol,
                            date: result.Date,
                            time: result.Time,
                            open: result.Open,
                            high: result.High,
                            low: result.Low,
                            close: result.Close,
                            volume: result.Volume
                        } });
                    });
            });
        });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Could not get real-time stock information' });
    }
}