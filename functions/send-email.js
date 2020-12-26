const nodemailer = require('nodemailer');

require('dotenv').config();
// require('regenerator-runtime/runtime');

const { MAIL_ADDR, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
        user: MAIL_ADDR,
        pass: MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const createTimestamp = () => {
    const pad2 = n => (n < 10 ? `0${n}` : `${n}`);

    // convert to WIB timezone.
    const offsetJkt = 7;
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * offsetJkt);

    return `${pad2(nd.getDate())}.${pad2(
        nd.getMonth() + 1
    )}.${nd.getFullYear().toString()} (+7GMT)`;
};

// imported from get-date => no typescript support?

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const getDateReadable = date => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    return `${day} ${monthNames[month]} ${year}`;
};

// template for contact form email body.
const createBodyContact = ({ name, email, phone, message }) => {
    return `
        <div>

            <style>
                * {
                    font-family: sans-serif;
                }

                ul, li {
                    list-style: none;
                }
            </style>

            <h1>New contact form.</h1>
            <h4>Submitted on: ${getDateReadable(new Date())}</h4>

            <br />

            <ul>
                <h3>User Data</h3>
                <li>Name: ${name}</li>
                <li>Email: <a href="mailto:${email}">${email}</a></li>
                <li>Phone: ${phone}</li>
            </ul>

            <br />

            <div>
                <h3>Message: </h3>
                <p>${message.split('//n').join('<br />')}</p>
            </div>
        </div>
    `;
};

exports.handler = (event, context, callback) => {
    const { queryStringParameters } = event;
    const { type = '' } = queryStringParameters;

    let html = '';
    let subject = '';

    // create subject and body based on types.
    switch (type) {
        case 'PAYMENT_NOTIF':
            const { oid } = queryStringParameters;
            subject = `Order ${oid} has been paid`;
            html = `
                <h1>Order ${oid} has been paid on ${createTimestamp()}</h1>
                <br />
                <p>Please procceed to fullfil the order. Click <a href='/'>Here</a> to directly go to the admin link.</p>
            `;
            break;
        case 'ERROR':
            subject = 'ERROR Etheral';
            html = event.body;
            break;
        case 'CONTACT':
            const {
                name,
                email,
                phone,
                subject: subjectData,
                message,
            } = JSON.parse(event.body);

            subject = subjectData;
            html = createBodyContact({ name, email, phone, message });
            break;
        case 'ADD_ADMIN':
            const { invitedBy, webUrl } = JSON.parse(event.body);

            subject = 'You have been invited to join the etheral Admin';
            html = `
                <h1>Hi! ${invitedBy} has invited you to join the etheral admin</h1>
                <br />
                <p>
                    Please go to <a href=${webUrl}>${webUrl}</a> to enter the admin dashboard
                    <br />
                    Your password is set to default <strong>123456</strong>.
                    You can change your password later after signing in.
                </p>
            `;
            break;
        case 'REMOVE_ADMIN':
            subject = 'You have been removed from etheral admin';
            html = `
                <h1>Hi! you have been removed from the etheral admin</h1>
                <br />
                <p>
                    From now on you won't be able to sign in to the etheral admin dashboard.
                    Changes you've made on the admin dashboard would still persist.
                </p>
            `;

            break;
        case 'VERIFY_ORDER':
            // extract template and to from body..
            const { template } = JSON.parse(event.body);
            subject = 'Order confirmation from Etheral.com';
            html = template;

            break;
        default:
            break;
    }

    const { to } = JSON.parse(event.body);

    const mailOptions = {
        from: `"Etheral notification 📿" <${MAIL_ADDR}>`,
        to: to || 'asketheral@gmail.com',
        subject,
        html: `
            <style>
                * {
                    font-family: sans-serif;
                    color: #000;
                }

                ul, li {
                    list-style-type: none;
                }

                a {
                    color: #444;
                }
            </style>

            ${html}
        `,
    };

    try {
        transporter.sendMail(mailOptions, (e, info) => {
            if (e) {
                console.error(e);
                callback(null, {
                    statusCode: 400,
                    body: JSON.stringify(e),
                });
            }

            console.log(info);

            callback(null, {
                statusCode: 200,
                body: 'Success',
            });
        });
    } catch (e) {
        console.error(e);
        console.error(e);
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(e),
        });
    }
};
