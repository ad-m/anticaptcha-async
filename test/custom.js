'use strict';
const anticaptcha = require('./../index');
const { skipUntilEnv } = require('../lib.js');


skipUntilEnv('ANTICAPTCHA_KEY', 'client.getCustom', async t => {
    const result = await require('../examples/custom.js')();
    t.true(typeof result === 'object');

    const normalized_license_plate = result.getValue().license_plate
        .replace(' ', '')
        .replace('0', 'O')
        .toUpperCase();

    t.true(normalized_license_plate === 'TONFNTI');
    t.true(result.color === 'grey');
});
