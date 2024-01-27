import http from 'http';

export default async function (path, options = {}) {
    try {
        const socketPath = '/var/run/docker.sock';

        // Define the request options
        const requestOptions = {
            socketPath,
            path,
            method: options.method || 'GET',
            headers: {
                ...options.headers,
                Host: 'localhost',
            },
        };

        // Create an HTTP request
        const req = http.request(requestOptions);

        // Initialize response data as an empty string
        let responseData = '';

        // Send the request and wait for the response
        const response = await new Promise((resolve, reject) => {
            req.on('response', (res) => {
                res.on('data', (chunk) => {
                    // Append data chunks to responseData
                    responseData += chunk;
                });

                res.on('end', () => {
                    // Parse responseData as JSON
                    try {
                        let jsonResponse = {};

                        jsonResponse.data = JSON.parse(responseData);

                        jsonResponse.statusCode = res.statusCode;
                        jsonResponse.headers = res.headers;

                        resolve(jsonResponse);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        reject(error);
                    }
                });
            });

            req.on('error', (error) => {
                console.error('Error:', error);
                reject({ message: 'error: unable to communicate' });
            });

            req.end();
        });

        return response;

    } catch (error) {
        console.error('Error:', error);
        throw { message: 'error: unable to establish comms' };
    }
}
