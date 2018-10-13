'use strict';
const request = require('superagent');

const anticaptcha = require('../index');

const legible_useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';

module.exports = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);

    const url = 'https://www.google.com/recaptcha/api2/demo?invisible=false';

    const agent = request
        .agent()
        .set('User-Agent', legible_useragent);

    const resp = await agent.get(url);
    const key = resp.text.match(/data-sitekey="(.+?)"/)[1];

    const result = await client.getRecaptcha(url, key);
    const submit_resp = await agent
        .post(url)
        .type('form')
        .send({ 'g-recaptcha-response': result.getValue() });
    return submit_resp.text;
};
