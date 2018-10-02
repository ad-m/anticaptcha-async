'use strict';
// const anticaptcha = require('./../index');
// const { skipUntilEnv } = require('../lib.js');
const ava = require('ava');

// Is there any online website which provides demo for Funcaptcha?

// const legible_useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) ' +
//     'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';

// skipUntilEnv('ANTICAPTCHA_KEY', 'client.getFuncaptcha', async t => {
//     const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
//
//     const url = 'https://www.funcaptcha.com/demo/';
//     const resp = await request
//         .get(url)
//         .set('User-Agent', legible_useragent);
//     const key = resp.text.match(/data-pkey="(.+?)"/)[1];
//
//     const result = await client.getFuncaptcha(url, key);
//     t.true(typeof result.getValue() === 'string');
// });

ava.todo('client.getFuncaptcha');
