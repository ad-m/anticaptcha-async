'use strict';
const anticaptcha = require('../index');

module.exports = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
    return client.getBalance();
};

