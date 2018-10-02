'use strict';

const ava = require('ava');

const skipUntilEnv = (env, name, fn) => process.env[env] ? ava(name, fn) : ava.skip(name, fn);

module.exports = {
    skipUntilEnv,
};
