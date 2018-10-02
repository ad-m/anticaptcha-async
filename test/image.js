'use strict';
const { skipUntilEnv } = require('../lib.js');

skipUntilEnv('ANTICAPTCHA_KEY', 'examples/image.js', async t => {
    const result = await require('../examples/image.js')();
    t.true(result.toLowerCase() === '56nn2');
});
