'use strict';
const path = require('path');
const anticaptcha = require('../index');
const fs = require('fs');

const main = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);

    const file_path = path.join(__dirname, 'captcha_ms.jpeg');
    const result = await client.getImage(fs.createReadStream(file_path), {
        restriction: {
            minLength: 5,
            maxLength: 5,
        },
    });
    return result.getValue();
};


module.exports = main;

