// import sha256, { hmac } from 'fast-sha256';
import { sha256 } from 'js-sha256';

// https://ipaymu-storage.s3.amazonaws.com/fdoc/api/payment-api-v2.pdf -> signature needed for ipaymu header request.

const stringToSign = (reqBody: any) =>
    `POST:${process.env.GATSBY_PAYMENT_VA_NUMBER}:${sha256(
        JSON.stringify(reqBody)
    ).toLowerCase()}:${process.env.GATSBY_PAYMENT_API_KEY}`;

const generateSignature = (reqBody: any) => {
    console.log(`string to sign: ${stringToSign(reqBody)}`);

    return sha256.hmac(
        stringToSign(reqBody),
        process.env.GATSBY_PAYMENT_API_KEY || ''
    );
};

export type initPaymentReturnVal = {
    success: boolean;
};

const initPayment = async (
    price: number,
    name: string,
    phone: string,
    email: string,
    oid: string,
    paymentMethod: string,
    paymentChannel: string,
    debug?: boolean
): Promise<initPaymentReturnVal> => {
    // fetch ipaymu!
    // link: https://my.ipaymu.com/api/v2/payment/direct
    // docs: https://documenter.getpostman.com/view/7508947/SWLfanD1?version=latest#1f2a5633-a988-4ada-baba-00200b67158e

    if (debug) {
        return { success: true };
    }

    const sandboxUrl = 'http://sandbox.ipaymu.com/api/v2/payment/direct';
    const productionUrl = 'https://my.ipaymu.com/api/v2/payment/direct';

    const url =
        process.env.NODE_ENV === 'production' ? productionUrl : sandboxUrl; // sandbox env

    const reqBody = {
        name,
        email,
        phone,
        amount: price,
        notifyUrl: 'https://mywebsite.com', // set to webhook
        expired: 24,
        paymentMethod,
        paymentChannel,
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('va', process.env.GATSBY_PAYMENT_VA_NUMBER || '');
    headers.append('signature', generateSignature(reqBody));
    headers.append('timestamp', new Date().getTime().toString()); // generate timestamp to now.

    try {
        const req = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers,
            body: JSON.stringify(reqBody),
        });

        console.log(req);
        console.log(JSON.stringify(reqBody));
        console.log(headers.get('signature'));
        console.log(headers.get('va'));

        return {
            success: true,
        };
    } catch (e) {
        console.error(e);
        return {
            success: false,
        };
    }
};

// sandbox link: http://sandbox.ipaymu.com/api/v2/payment
export default initPayment;
