'use strict';
const puppeteer = require('puppeteer');
const anticaptcha = require('../index');

module.exports = async () => {
    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();
    await page.goto('https://www.google.com/recaptcha/api2/demo?invisible=false');
    await client.patchPuppeterPage(page);

    await page.$eval('form', el => el.submit());


    debugger;

    // await browser.close();
};

if (require.main === module) {
    module.exports().catch(console.error);
}
