require('regenerator-runtime/runtime');
require('dotenv').config();

const mailchimp = require('@mailchimp/mailchimp_marketing'); // import mailchimp marketing package

const { MAILCHIMP_API_KEY } = process.env;

/**
 * Lambda function to add a user / email to etheralmade's mailing list using mailchimp
 * @param {*} event
 */
exports.handler = async event => {
    const audienceId = '432caee5a8'; // Etheral mailchimp Audience ID
    const { email } = event.queryStringParameters; // POST query = /subscribe-mailing-list?email={EMAIL}

    // mailchimp config needed.
    const mailchimpConfig = {
        apiKey: MAILCHIMP_API_KEY,
        server: 'us7',
    };

    mailchimp.setConfig(mailchimpConfig);
    try {
        const response = await mailchimp.lists.addListMember(audienceId, {
            email_address: email,
            status: 'subscribed',
        });

        // call send Discount code here..

        return await {
            statusCode: 200,
            body: JSON.stringify({ msg: 'Success' }),
        };
    } catch (e) {
        console.error(e);
        return await {
            statusCode: 400,
            body: JSON.stringify({ msg: 'Failed' }),
        };
    }
};
