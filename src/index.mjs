// 1.1 Intro and Setup
import express, { request, response } from 'express';

const app = express();
let PORT = process.env.PORT || 3000; // 3000 is assigned if env variable is undefined


// 2. GET Requests

/*
    localhost:3000 is our base route
    localhose:3000/users is the users' route, it gives list of users
    localhose:3000/products is the users' route, it gives list of products

    we need to define these routes and allow our clients to make requests to these routes
    http requests GET, CREATE, UPDATE, DELETE, etc. the data
*/

app.get('/', (request, response) => { // app.get("route", callBackFn i.e. (requestHandler, responseObject))
    //response.send("Hello World"); // browser output is "Hello World"
    //response.send( {msg:"Hello There!"}); // browser output is this json object
    response.status(201).send( {msg:"Hello"}); // browser output is this json object + status change under Inspect> Network> localhost
});

// 2.2 lets define another route
app.get('/api/users', (request, response) => { // 'http://localhost:3000/api/users' in browser
    response.send([
        {id: 1, userName: "Andre Johnson Jr.", displayName: "Junior"},
        {id: 2, userName: "Jack Johnson", displayName: "Jack"},
        {id: 3, userName: "Andre Johnson Sr.", displayName: "Dre"}]); // browser output is this array
});

// 2.3 lets define one more route
app.get('/api/products', (request, response) => { // 'http://localhost:3000/api/products' in browser
    response.send([
        {id: 1, name: "chocolate coated almonds", unitPrice: "10.95"},
        {id: 2, name: "biltong", unitPrice: "32.95"},
        {id: 3, name: "dried fruit", unitPrice: "18.95"}]); // browser output is this array
});

// 1.2 Intro & Setup
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
    // 'npm run start:dev' in terminal
    // terminal output is 'Running on Port 3000'

    // 'http://localhost:3000' in browser
    // browser ouput is 'Cannot Get /' b/c we dont have a route registered yet
});
