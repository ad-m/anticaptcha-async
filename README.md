# anticaptcha-async

[![TravisCI status](https://travis-ci.org/ad-m/anticaptcha-async.svg?branch=master)](https://travis-ci.org/ad-m/anticaptcha-async)

[![npm version](https://badge.fury.io/js/anticaptcha-async)](https://badge.fury.io/js/anticaptcha-async)

Client library for solve captchas with [Anticaptcha.com] support in
modern promise-based way. It allows you to process a large number of tasks 
in an extremely effective way.

The library is cyclically and automatically tested for proper operation.
We are constantly making the best efforts for its effective operation.

In case of any problems with integration - [see examples], [create an issue] or contact privately.

## Getting Started

Install as standard npm package using:

    npm install anticaptcha-async --save

## Usage

To use this library do you need [Anticaptcha.com] API key.

### Solve recaptcha

Example snippet for Recaptcha:

```javascript
const request = require('superagent');
const anticaptcha = require('anticaptcha-async');

const process = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
    const url = 'https://www.google.com/recaptcha/api2/demo?invisible=false';
    const resp = await request.get(url);
    const key = resp.text.match(/data-sitekey="(.+?)"/)[1];
    
    const result = await client.getRecaptcha(url, key);
    console.log(result.getValue());
};
```

### Solve image captcha

Example snippet for image captcha:

```javascript
const anticaptcha = require('anticaptcha-async');
const fs = require('fs');

const process = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);

    const result = await client.getImage(fs.createReadStream('captcha_ms.jpeg'), {
        restriction: {
            minLength: 5,
            maxLength: 5,
        },
    });
    console.log(result.getValue());
};
```

### Solve funcaptcha

Example snippet for funcaptcha:

```js
const request = require('superagent');
const anticaptcha = require('anticaptcha-async');

const legible_useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';

const process = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
    
    const url = 'https://www.funcaptcha.com/demo/';
    const resp = await request
        .get(url)
        .set('User-Agent', legible_useragent);
    const key = resp.text.match(/data-pkey="(.+?)"/)[1];
    const result = await client.getFuncaptcha(url, key);
    console.log(result.getValue());
};
```

### Report incorrect solution

```javascript
const anticaptcha = require('anticaptcha-async');
const fs = require('fs');

const process = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);

    const result = await client.getImage(fs.createReadStream('captcha_ms.jpeg'));
    if(result.getValue() !== '56nn2'){
        await result.reportIncorrect();
    }
    console.log(result.getValue());
};
````

#### Custom tasks

There is support for your own (captcha) forms. It allows you to analyze any data in various ways, eg. classify offensive
image, count elements on the image, etc. The scope of the data, the form to describe them, you specify yourself.

For details, go to [examples] and documentation of [CustomCaptchaTask](https://anticaptcha.atlassian.net/wiki/spaces/API/pages/237600809/CustomCaptchaTask+%3A+image+captcha+with+custom+form).

# Versioning

We use [SemVer] for versioning. For the versions available, see the
[tags on this repository].

# Authors

-  **Adam Dobrawy** - *Initial work* - [ad-m]

See also the list of [contributors] who participated in this project.

# License

This project is licensed under the MIT License - see the [LICENSE.md]
file for details

[see examples]: https://github.com/ad-m/anticaptcha-async/tree/master/examples
[create an issue]: https://github.com/ad-m/anticaptcha-async/issues/new
[Anticaptcha.com]: http://getcaptchasolution.com/5tln8bfeif
[SemVer]: http://semver.org/
[tags on this repository]: https://github.com/ad-m/anticaptcha-async/tags
[ad-m]: https://github.com/ad-m
[contributors]: https://github.com/ad-m/python-anticaptcha/contributors
[LICENSE.md]: LICENSE.md