// 1.1 Intro and Setup
import express, { request, response } from 'express';

const app = express();
let PORT = process.env.PORT || 3000; // 3000 is assigned if env variable is undefined
const mockUsers = [
    {id: 1, userName: "andre johnson jr.", displayName: "junior"},
    {id: 2, userName: "jack johnson", displayName: "jack"},
    {id: 3, userName: "andre johnson sr.", displayName: "dre"},
    {id: 4, userName: "dr. rainbow johnson", displayName: "bow"},
    {id: 5, userName: "zoe johnson", displayName: "zozo"},
    {id: 6, userName: "diane johnson", displayName: "diane johnson"},
    {id: 7, userName: "martin payne", displayName: "whaa-dup!"},
    {id: 8, userName: "anson", displayName: "anson"}
];

// 1.2 Intro & Setup
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
    // 'npm run start:dev' in terminal
    // terminal output is 'Running on Port 3000'

    // 'http://localhost:3000' in browser
    // browser ouput is 'Cannot Get /' b/c we dont have a route registered yet
});


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
app.get('/api/users', (request, response) => {

    // 4.1 Query Parameters

    //Browser INPUT: http://localhost:3000/api/users?filter=userName&value=johnson
    console.log(request.query);
    //Terminal OUTPUT: {filter: 'userName', value: 'johnson'}

    //Browser INPUT: http://localhost:3000/api/users?filter=userName&value=johnson
    const {filter, value} = request.query
    if (filter && value) {
        return response.send(
            mockUsers.filter((user) => user[filter].includes(value))
        );
        //Browser OUTPUT: filtered mockUsers array
    } else {
        return response.send(mockUsers);
        //Browser OUTPUT: full mockUsers array
    }
});

// 2.3 lets define one more route
app.get('/api/products', (request, response) => { // 'http://localhost:3000/api/products' in browser
    response.send([
        {id: 1, name: "chocolate coated almonds", unitPrice: "10.95"},
        {id: 2, name: "biltong", unitPrice: "32.95"},
        {id: 3, name: "dried fruit", unitPrice: "18.95"}]); // browser output is this array
});

// 3. Route Parameters

/* 
    what if i wanted a specific user or product, e.g. based on id?
    ROUTE PARAMS    
*/

app.get("/api/users/:id", (request, response) => {
    console.log(request.params); //'http://localhost:3000/api/users/X' in browser leads to {id: 'X'} in terminal
    const parsedId = parseInt(request.params.id); // convert string to integer
    console.log(parsedId);

    // NaN is 'not a number' e.g. 'http://localhost:3000/api/users/yes' in browser
    // (A) if NaN is inputed in route address
    if (isNaN(parsedId)) return response.status(400).send({msg : 'Bad Request. Invalid ID.'});

    const findUser = mockUsers.find((user) => user.id === parsedId);

    // (B) if the user does not exist (i.e. parsedID is not found in users array)
    if (!findUser) return response.sendStatus(404); 
    
    // (C) if the user is found
    return response.send(findUser);
});

/* Statues
    200 => Ok
    400 => Bad Request   
    403 => Forbidden
    404 => Not Found
    500 => Internal Server Error
*/


// 4. Query Parameters

/*
    http://localhost:3000/products?key=value&key2=values2
    the above is a query string
    
    query params work form one page to another, i.e. data being passed between these pages
    
    e.g. wanting to sort all mockUsers in alphabetical order OR filtering out users without an 'a' in their userName field
*/

