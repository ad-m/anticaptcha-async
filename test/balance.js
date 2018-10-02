'use strict';
const { skipUntilEnv } = require('../lib.js');

skipUntilEnv('ANTICAPTCHA_KEY', 'able to get balances', async t => {
    const result = await require('../examples/balance.js')();

    t.true(typeof result === 'number');
    t.true(result > 0);
});
