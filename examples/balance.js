'use strict';
const anticaptcha = require('../index');

const main = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
    return client.getBalance();
};

module.exports = main;

