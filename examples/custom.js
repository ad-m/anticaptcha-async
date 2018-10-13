'use strict';
const anticaptcha = require('../index');

module.exports = async () => {

    const client = anticaptcha(process.env.ANTICAPTCHA_KEY);

    const image_url = 'https://files.anti-captcha.com/26/41f/c23/7c50ff19.jpg';
    const assigment = 'Enter license plate number';
    const fields = [
        {
            label: 'Number',
            labelHint: false,
            contentType: false,
            name: 'license_plate',
            inputType: 'text',
            inputOptions: {
                width: '100',
                placeHolder: 'Enter a letters and number without spaces',
            },
        },
        {
            label: 'Car color',
            labelHint: 'Select color of the car',
            name: 'color',
            inputType: 'select',
            inputOptions: [
                {
                    value: 'white',
                    caption: 'White color',
                },
                {
                    value: 'black',
                    caption: 'Black color',
                },
                {
                    value: 'grey',
                    caption: 'Grey color',
                },
                {
                    value: 'blue',
                    caption: 'Blue color',
                },
                {
                    value: 'red',
                    caption: 'Red color',
                },
            ],
        },
    ];
    const result = await client.getCustom(assigment, image_url, fields, {
        delay: 10 * 1000,
    });
    return result.getValue();
};
