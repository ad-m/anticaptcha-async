'use strict';
const { skipUntilEnv } = require('../lib.js');

skipUntilEnv('ANTICAPTCHA_KEY', 'examples/recaptcha.js', async t => {
    const result = await require('../examples/recaptcha.js')();
    t.true(result.includes('Verification Success... Hooray!'));
});

