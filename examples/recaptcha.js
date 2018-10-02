'use strict';
const request = require('superagent');

const anticaptcha = require('../index');

const main = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);

    const url = 'https://www.google.com/recaptcha/api2/demo?invisible=false';

    const agent = request.agent();
    const resp = await agent.get(url);

    const key = resp.text.match(/data-sitekey="(.+?)"/)[1];

    const result = await client.getRecaptcha(url, key);
    const data = {
        'g-recaptcha-response': result.getValue(),
    };
    console.dir(data, {depth: null});
    const submit_resp = await agent
        .post(url)
        .type('form')
        .send(data);
    return submit_resp.text;
};


module.exports = main;
