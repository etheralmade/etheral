const axios = require('axios');
require('regenerator-runtime/runtime');

exports.handler = async event => {
    try {
        const { body, headers } = event;

        const apiKey = headers.key;
        const apiUrl = 'https://api.rajaongkir.com/starter/cost';

        const req = await axios.post(apiUrl, body, {
            headers: {
                key: apiKey,
                'Content-type': 'application/json',
            },
        });

        const data = req.data;

        return await {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify(data),
        };
    } catch (e) {
        return await {
            statusCode: 400,
            body: JSON.stringify(e),
        };
    }
};
