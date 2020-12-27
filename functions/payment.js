require('regenerator-runtime/runtime');
require('dotenv').config();
const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');

const {
    GATSBY_PAYMENT_VA_NUMBER,
    GATSBY_PAYMENT_API_KEY,
    LAMBDA_ENV,
} = process.env;

exports.handler = async event => {
    const url =
        LAMBDA_ENV === 'production'
            ? 'https://my.ipaymu.com/api/v2/payment/direct'
            : 'https://sandbox.ipaymu.com/api/v2/payment/direct';

    const { body } = event;
    const {
        name,
        amount,
        email,
        phone,
        paymentMethod,
        paymentChannel,
        oid,
    } = JSON.parse(body);

    const notifyUrl =
        'https://fervent-minsky-bc0840.netlify.app/.netlify/functions/notify-order';

    const bodyReq = {
        notifyUrl: `${notifyUrl}?oid=${oid}`,
        // notifyUrl,
        name,
        email,
        phone,
        amount,
        paymentMethod,
        paymentChannel,
    };

    console.log(bodyReq);

    const apiKey = GATSBY_PAYMENT_API_KEY;
    const va = GATSBY_PAYMENT_VA_NUMBER;

    const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(bodyReq));
    const stringtosign = `POST:${va}:${bodyEncrypt}:${apiKey}`;
    const signature = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(stringtosign, apiKey)
    );

    try {
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                va: va,
                signature: signature,
                timestamp: '20150201121045',
            },
            body: JSON.stringify(bodyReq),
        }).then(rsp => rsp.json());

        console.log(await req);

        const {
            Data: { SessionId, PaymentNo, PaymentName, Expired, Fee, Total },
        } = await req;

        return await {
            statusCode: 200,
            body: JSON.stringify({
                SessionId,
                PaymentNo,
                PaymentName,
                Expired,
                Fee,
                Total,
            }),
        };
    } catch (e) {
        console.error(e);

        return await {
            statusCode: 404,
            body: JSON.stringify(e),
        };
    }
};
