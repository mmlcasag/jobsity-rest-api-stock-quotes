const fs = require('fs');
const https = require('https');

const jwt = require('jsonwebtoken');
const csv = require('csv-parser');

const authConfig = require('../config/auth.json');
const stockConfig = require('../config/stock.json');

module.exports.authenticate = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(401).send({ error: true, message: 'E-mail not provided' });
    }
    if (!password) {
        return res.status(401).send({ error: true, message: 'Password not provided' });
    }

    try {
        const token = jwt.sign({ id: email }, authConfig.secret, { expiresIn: 86400 });
        return res.status(200).send({ error: false, message: 'Success', token: token });
    } catch (err) {
        return res.status(500).send({ error: true, message: 'Could not generate authentication token' });
    }
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
                        res.status(200).send({ error: false, message: results });
                    });
            });
        });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Could not get real-time stock information' });
    }
}