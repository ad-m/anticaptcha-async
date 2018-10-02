'use strict';
const request = require('superagent');
const path = require('path');
const anticaptcha = require('../index');

const main = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
    return client.getBalance();
};


module.exports = main;

