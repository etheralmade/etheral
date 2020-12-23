require('regenerator-runtime/runtime');
require('dotenv').config();

const fetch = require('node-fetch');

const { LAMBDA_ENV } = process.env;

/**
 * Cloud function to verify when an order is made..
 * @param {*} event
 */
exports.handler = async event => {
    // params that should be passed to the function
    const {
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerAddr,
        buyerPostal,
        channel,
        total,
        currency,
        date,
        oid,
        paymentNo,
        paymentName,
    } = JSON.parse(event.body);

    const webRoot =
        LAMBDA_ENV === 'production'
            ? 'https://fervent-minsky-bc0840.netlify.app'
            : 'http://localhost:8000';

    const template = `
        <div>
            <div style="color: #000 !important; font-size: 16px;">
    
                <img style="height: 50px; width: 150px;" src="https://firebasestorage.googleapis.com/v0/b/etheral-dev-f86af.appspot.com/o/flamelink%2Fmedia%2FEtheral.png?alt=media&token=334b253c-ad82-4cca-809c-a7ee225ae5cb" />
                <h2>Thank you for your order!</h2>
                <p>
                    Hello ${buyerName}, please make a payment to:
                </p>

                <strong style="margin: 16px 0;">
                    ${paymentNo} - ${channel.toUpperCase()}
                    <br />
                    Account Name: ${paymentName}
                    <br />
                    Total: ${currency} ${total}
                </strong>

                <p>
                    You have 24 hours to complete your transfer. Please make sure that you transfer the 
                    right amount. If you transfer incorrectly, the system will not automatiocally mark your
                    order as paid.                
                </p>

                <p>
                    Once we have checked your payment, you will be notified via email. Please allow up
                    to 24 hours after your payment confirmation for your order status to be “paid”.
                </p>

                <a href=${webRoot}/order?oid=${oid}>
                    <button style="border-radius: 0px; background-color: #000; color: #fff; border: none; padding: 8px 4px;">View my order</button>
                </a>

                <div style="display: flex; justify-content: center; width: 100%; margin-top: 16px;">
                    <div style="margin-right: 32px;">
                        <h4>CUSTOMER INFORMATION</h4>
                        <p>
                            ${buyerName} <br />
                            ${buyerPhone} <br />
                            ${buyerEmail} <br />
                            Order date: ${date}
                        </p>
                    </div>
                    <div>
                        <h4>SHIPPING ADDRESS</h4>
                        <p>
                            ${buyerAddr} <br />
                            ${buyerPostal}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const emailFunctionUrl =
        'https://fervent-minsky-bc0840.netlify.app/.netlify/functions';

    try {
        const req = await fetch(
            `${emailFunctionUrl}/send-email?type=VERIFY_ORDER`,
            {
                method: 'POST',
                body: JSON.stringify({
                    template,
                    to: buyerEmail,
                }),
            }
        );

        return await {
            statusCode: 200,
            body: JSON.stringify({ msg: 'Success' }),
        };
    } catch (e) {
        return await {
            statusCode: 400,
            body: JSON.stringify({ msg: 'Verify order not successful' }),
        };
    }
};
