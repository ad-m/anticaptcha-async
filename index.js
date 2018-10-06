'use strict';
const https = require('https');

const stream_to_base64 = (stream) => new Promise((resolve, reject) => {
    const bufs = [];
    stream.on('data', data => {
        bufs.push(data);
    });
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
});

const postRequest = (url, data) => new Promise((resolve, reject) => {
    const options = {
        method: 'POST',
    };
    const req = https.request(url, options, (res) => {
        const data = [];
        res.on('data', (chunk) => data.push(chunk));
        res.on('end', () => resolve(Buffer.concat(data).toString('utf-8')));
        res.once('error', reject);
    });
    req.write(JSON.stringify(data));
    req.once('error', reject);
    req.end();
});

const Anticaptcha = (client_key, opts = {}) => {
    const soft_id = 847;
    const protocol = opts.unsecure ? 'http' : 'https';
    const host = opts.host || 'api.anti-captcha.com';
    const language_pool = opts.language_pool || 'en';

    const request = (path, body) => {
        const data = Object.assign({}, {
            clientKey: client_key,
        }, body);
        return postRequest(`${protocol}://${host}/${path}`, data)
            .then(content => JSON.parse(content))
            .then(body => {
                if (body.errorId) {
                    const err = new Error(body.errorDescription);
                    err.errorId = body.errorId;
                    err.errorCode = body.errorCode;
                    throw err;
                }
                return body;
            });
    };

    const getTaskId = (task) => request('createTask', {
        task: task,
        softId: soft_id,
        languagePool: language_pool,
    })
        .then(body => body.taskId);


    const getTaskResult = async (taskId, options = {}) => {
        const delay = options.delay || 5 * 1000;
        const attempts = options.attempts || 30;
        for (let i = 0; i <= 30; i++) {
            const resp = await request('getTaskResult', {
                clientKey: client_key,
                taskId: taskId,
            });
            if (resp.status && resp.status !== 'processing') {
                return resp;
            }
            await new Promise(r => setTimeout(r, delay));
        }
        throw new Error(`Timeout for get result of time after ${delay * attempts}.`);
    };


    const getImageTask = (file_stream, options = {}) => stream_to_base64(file_stream)
        .then(content => Object.assign({type: 'ImageToTextTask'}, options, {
            body: content,
        }));

    const getRecaptchaTask = (url, key) => Promise.resolve({
        type: 'NoCaptchaTaskProxyless',
        websiteURL: url,
        websiteKey: key,
    });

    const getFuncaptchaTask = (url, key) => Promise.resolve({
        type: 'FunCaptchaTask',
        websiteURL: url,
        websiteKey: key,
    });

    const getCustomTask = (assignment, image_url, fields) => Promise.resolve({
        type: 'CustomCaptchaTask',
        imageUrl: image_url,
        assignment: assignment,
        forms: fields,
    });

    const reportIncorrect = (taskId) => request('reportIncorrectImageCaptcha', {
        taskId: taskId,
        clientKey: client_key,
    })
        .then(body => body.status);

    const getResponse = (value, taskId) => ({
        getValue: () => value,
        reportIncorrect: () => this.reportIncorrect(taskId),
    });

    const getImage = async (file_stream, options = {}) => {
        const task = await getImageTask(file_stream, options.restriction);
        const taskId = await getTaskId(task);
        const result = await getTaskResult(taskId, options);
        return getResponse(result.solution.text, taskId);
    };

    const getRecaptcha = async (website_url, website_key, options = {}) => {
        const task = await getRecaptchaTask(website_url, website_key, options);
        const taskId = await getTaskId(task);
        const result = await getTaskResult(taskId, options);
        return getResponse(result.solution.gRecaptchaResponse, taskId);
    };


    const getFuncaptcha = async (website_url, website_key, options = {}) => {
        const task = await getFuncaptchaTask(website_url, website_key, options);
        const taskId = await getTaskId(task);
        const result = await getTaskResult(taskId, options);
        return getResponse(result.solution.token, taskId);
    };

    const getCustom = async (assignment, image_url, fields, options = {}) => {
        const task = await getCustomTask(assignment, image_url, fields);
        const taskId = await getTaskId(task);
        const result = await getTaskResult(taskId, options);
        return getResponse(result.solution.answers, taskId);
    };

    const getBalance = () => request('getBalance', {
        clientKey: client_key,
    })
        .then(result => result.balance);

    return {
        getTaskId,
        getTaskResult,
        reportIncorrect,
        getBalance,
        getImageTask,
        getRecaptchaTask,
        getFuncaptchaTask,
        getCustomTask,
        getImage,
        getRecaptcha,
        getFuncaptcha,
        getCustom,
    };
};

module.exports = Anticaptcha;
