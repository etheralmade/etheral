const fetch = require('node-fetch');
const { db } = require('./db-admin');
require('regenerator-runtime/runtime');
require('dotenv').config();

const { LAMBDA_ENV } = process.env;

// check for transaction ID from ipaymu!
exports.handler = async event => {
    const { queryStringParameters } = event;

    const { oid } = queryStringParameters;

    if (!oid) {
        return await {
            statusCode: 404,
            body: JSON.stringify({
                message: 'ERROR, no oid found.',
            }),
        };
    } else {
        // set db ref
        const dbRef = db.collection('order').doc(oid);
        const docRef = await dbRef.get();

        // check if document exists
        if (await !docRef.exists) {
            return await {
                statusCode: 404,
                body: JSON.stringify({ message: 'Order ID does not exists.' }),
            };
        } else {
            const sendEmailUrl =
                LAMBDA_ENV === 'production'
                    ? 'https://fervent-minsky-bc0840.netlify.app/.netlify/functions/send-email' // error: only absolute url is supported..
                    : 'http://localhost:9000/send-email';
            try {
                // if it exists, set to TRUE.
                await dbRef.update({
                    paid: true,
                });

                const req = await fetch(
                    `${sendEmailUrl}?type=PAYMENT_NOTIF&oid=${oid}`,
                    {
                        method: 'POST',
                        body: '{ "to": "" }',
                    }
                );

                console.log(await req);

                return await {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'Success',
                    }),
                };
            } catch (e) {
                console.error(e);
                fetch(`${sendEmailUrl}?type=ERROR`, JSON.stringify(e));
                return await {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Error' }),
                };
            }
        }
    }
};
