// 1.1 Intro and Setup
import express from 'express';

const app = express();
let PORT = process.env.PORT || 3000; // 3000 is assigned if env variable is undefined
/*
// 2. GET Requests
app.get('/', (request, response) => {
    request();
    response.send('Hello World');
});
*/

// 1.2 Intro & Setup
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
    // 'npm run start:dev' in terminal
    // terminal output is 'Running on Port 3000'

    // 'http://localhost:3000' in browser
    // browser ouput is 'Cannot Get /' b/c we dont have a route registered yet
});
