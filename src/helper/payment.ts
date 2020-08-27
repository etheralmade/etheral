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

const initPayment = async (
    price: number,
    name: string,
    phone: string,
    email: string,
    oid: string,
    paymentMethod: string,
    paymentChannel: string
    // product: string[], // string of pids.
    // qty: number[], // arr of qtys
    // deliveryArea: number,
    // deliveryAddress: string
) => {
    // fetch ipaymu!
    // link: https://my.ipaymu.com/api/v2/payment/direct
    // docs: https://documenter.getpostman.com/view/7508947/SWLfanD1?version=latest#1f2a5633-a988-4ada-baba-00200b67158e

    const url = 'http://sandbox.ipaymu.com/api/v2/payment/direct'; // sandbox env

    const reqBody = {
        name,
        email,
        phone,
        amount: price,
        notifyUrl: '', // set to webhook
        expired: 24,
        // expiredType: 'hours', // expect payment max in a day
        paymentMethod,
        paymentChannel,
        // product,
        // qty,
        // deliveryArea,
        // deliveryAddress,
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
        console.log(reqBody);
        console.log(headers.get('signature'));
        console.log(headers.get('va'));

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

// sandbox link: http://sandbox.ipaymu.com/api/v2/payment
export default initPayment;
