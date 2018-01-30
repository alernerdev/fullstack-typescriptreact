'use strict';

import express from 'express';
import path from 'path';
const fs = require('fs');

const router = express.Router();

const DATA_FILE = './tools/sampleData/savedOrders.json';

router.route('/')
	.get((req, res) => {
        let pageName;

        console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/index.html'):
            pageName = path.join(__dirname + '/../../dist/index.html');

        console.log("entered / route. ");
        res.sendFile(pageName);
    });

    router.route('/api/orders')
    .get((req, res) => {
        // either return an empty set or valid orders
        let orders = [];
        console.log("entered /api/orders route. ");
        res.setHeader('Cache-Control', 'no-cache');
        fs.readFile(DATA_FILE, 'utf8', (err, data) =>{
            orders = data;
        })
        res.json(orders);
    })
    .post((req, res) => {
        console.log(`received body ${JSON.stringify(req.body)}`);
        fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 4), (err) => {
            if (err) {
                throw err;
            }
            console.log("successfully written orders to file");
            res.setHeader('Cache-Control', 'no-cache');
            res.json(req.body);
        });
    })
    
module.exports = router;

