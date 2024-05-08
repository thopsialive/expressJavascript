// 'npm run start:dev' in terminal

// 1.1 Intro and Setup
import express, { request, response } from 'express';


// 11.1 Router Importing
/*
import usersRouter from "./routes/users.mjs"
import productsRouter from "./routes/products.mjs"
*/
//OR
// 11.4 Barrel Routers File
import routes from "./routes/index.mjs"

// 11.2 Users Router
// the below is commented out, since we have the router
/*
// 10.1 Validation
import { 
    query, 
    validationResult, 
    body, 
    matchedData, 
    checkSchema, 
} from 'express-validator';
//10.4 Validation Schema Importing
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";
import { mockUsers } from './utils/constants.mjs';
import { resolveIndexByUserId } from './utils/middlewares.mjs';
*/

// 12.2 Using the cookie in browser
import cookieParser from "cookie-parser";

// 13 Sessions Pt1.
import session from 'express-session';

const app = express();

// 5. POST Requests: Register Middleware for linking post request to json type of data
app.use(express.json());

// 12.2 Using the cookie in browser
app.use(cookieParser("cookieSignature")); //'app.use(cookieParser('secret'));' secret is needed for signed cookies

// 13 Sessions Pt1.
app.use(
    session({ 
        secret: "password123",
        saveUninitialized: false, // for users just visiting the site, nothing will be stored
        resave: false,
        cookie: {
            maxAge: 60000*60, // milliseconds, i.e. 1hr expiry time
        },
    })
);

/*
// 11.2 Users Router
app.use(usersRouter);
// 11.3 Products Router
app.use(productsRouter);
*/
//OR
// 11.4 Barrel Routers File
app.use(routes);

// 9. Middleware
const logggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};
// 9.1 Global Middleware
/*
app.use(
    logggingMiddleware,
    (request, response, next) => {
        console.log("This is middleware, within the loggingMiddleware middleware.");
        next(); // DONT FORGET TO CALL 'next()'
    }
);
*/

// 11.2 Users Router
// the below is commented out, since we have the router
// middleware is a request handler, therefore must have request, response and next callback functions in it
/*
const resolveIndexByUserId = (request, response, next) => {
    const { body, params: {id} } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400); // Status code: Bad Request
    const findUserIndex = mockUsers.findIndex(
        (user) => user.id === parsedId // automatically returns -1 if user.id !=== parsedId
    );
    if(findUserIndex === -1) return response.sendStatus(404); // Status code: Not Found
    
    //this next line is so we can pass the output of this middleware onto the next function
    //we will attach the findUserIndex property to the request object
    
    request.findUserIndex = findUserIndex;

    next();
};
*/

let PORT = process.env.PORT || 3000; // 3000 is assigned if env variable is undefined
/*
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
*/
// 11.2 Users Router
// the above is commented out, since we have the router

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

//app.get('/', (request, response) => { // app.get("route", callBackFn i.e. (requestHandler, responseObject))
// 9.2 Local Middleware
app.get('/', 
    logggingMiddleware,
    (request, response, next) => {
        console.log("This is the second middleware.");
        next();
    }, 
    (request, response) => { // app.get("route", callBackFn i.e. (requestHandler, responseObject))
        // 13 Sessions Pt.1
        console.log(request.session);
        console.log(request.sessionID); // this regenerates after every request
        request.session.visited = true; // keeps sessionID constant

        // 12.1 Cookie Setup
        response.cookie("cookieName", "chocolate", { maxAge: 60000*60, signed: true}); //this cookie will expire after 1 hour, 1minute = 60000milliseconds
        // 12.3 Note this is now a signed cookie

        //response.send("Hello World"); // browser output is "Hello World"
        //response.send( {msg:"Hello There!"}); // browser output is this json object
        response.status(201).send( {msg:"Hello"}); // browser output is this json object + status change under Inspect> Network> localhost
    }
);

/*
// 2.2 lets define another route
app.get('/api/users', 
    // 10.2 Validation chain, passed in as middleware
    query('filter').isString().withMessage('Must be a string input').notEmpty().withMessage('Must not be empty').isLength({ min: 3, max: 10}).withMessage('Must be at within 3-10 characters'), 
    (request, response) => {
        const result = validationResult(request); // extracts validation errors from request object
        console.log(result);

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
    }
);
*/
// 11.2 Users Router
// the above is commented out, since we have the router


// 5. Post HTTP Requests

/*
    if you want to save data in the background? e.g. users filling out a form
    POST REQUESTS

    could use Postman
    we'll use Thunder Client, vs-code extension, a REST API tool allowing us to make API calls to server
    Thunder Icon > New Request button > GET > url: localhost:3000/api/users > click Send button > should get normal results

    Thunder Icon > New Request button > GET > url: localhost:3000/api/users > Body tab > JSON fill in {"userName":"david", "displayName" : "Man After God's Heart"} > 
    index.mjs > push this new data to the mockUser's array
    Thunder Client > click Send button > should get json data saved
    
*/

// 11.2 Users Router
// the below is commented out, since we have the router
//app.post('/api/users', 
        // 10.3 Validation w/ body function passed in as middleware
        /*
        [body('userName')
            .notEmpty().withMessage('Username cannot be empty.')
            .isLength({ min: 5, max: 32}).withMessage('Username must be within 5-32 characters.')
            .isString().withMessage('Username must be a string!'),
        body('displayName').notEmpty().withMessage('Displayname cannot be empty.')],
        */ 
        // 10.4 Validation Schema
/*
        checkSchema(createUserValidationSchema),

        (request, response) => {
            const result = validationResult(request);
            console.log(result);
            // check for errors with the result object 
            if (!result.isEmpty()) return response.status(400).send({ errors: result.array() });

            const data =matchedData(request); //lets grab all the data that's been validated
            console.log(data);

            const newUser = {id: mockUsers[mockUsers.length-1].id + 1, ...data };
            mockUsers.push(newUser);
            return response.status(201).send(newUser);
        }
);
*/

// 11.3 Products Router
// the above is commented out, since we have the router
/*
// 2.3 lets define one more route
app.get('/api/products', (request, response) => { // 'http://localhost:3000/api/products' in browser
    response.send([
        {id: 1, name: "chocolate coated almonds", unitPrice: "10.95"},
        {id: 2, name: "biltong", unitPrice: "32.95"},
        {id: 3, name: "dried fruit", unitPrice: "18.95"}]); // browser output is this array
});
*/

// 3. Route Parameters

/* 
    what if i wanted a specific user or product, e.g. based on id?
    ROUTE PARAMS    
*/

/*
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
*/

// 11.2 Users Router
// the below is commented out, since we have the router
/*
// 9.2 Local Middleware
app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { findUserIndex } = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.sendStatus(404); 
    return response.send(findUser);
});
*/

/* Status Codes
    200 => Ok
    201 => Post Resource Created
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


// 6. PUT Requests

/*
    entire upgrade of a record or resource
    e.g. {id: 1, userName: "andre johnson jr.", displayName: "junior"} BECOMES {id: 1, userName: "junior", displayName: "jr"}
    id, userName and displayName all get updated

    E.g.
    Thunder Icon > New Request button > PUT > url: localhost:3000/api/users/8 > Body tab > JSON fill in { "userName":"Hakeem Lyon", "displayName" : "Keem"} > click Send button 
    Can check new record with GET localhost:3000/api/users/8 SEND

*/

// 11.2 Users Router
// the below is commented out, since we have the router
/*
app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body}; // update all record fields
    return response.sendStatus(200); // Status code: Ok
});
*/

// 7. PATCH Requests

/* 
    partial updrage of a record
    e.g. {id: 1, userName: "andre johnson jr.", displayName: "junior"} BECOMES {id: 1, userName: "andre johnson jr.", displayName: "junior123"},
    only a part of the displayName was updated

    E.g.
    Thunder Icon > New Request button > PATCH > url: localhost:3000/api/users/1 > Body tab > JSON fill in { "displayName":"Junior"} > click Send button 
    Can check new record with GET localhost:3000/api/users/1 SEND

*/

// 11.2 Users Router
// the below is commented out, since we have the router
/*
app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body}; // {...keep current record data ...overide current record fields, but not all of them}
    return response.sendStatus(200); // Status code: Ok
});
*/

// 8. DELETE Requests

/*
    used to delete records from the database
*/

// 11.2 Users Router
// the below is commented out, since we have the router
/*
app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { findUserIndex } = request;
    // lets remove user from array
    mockUsers.splice(findUserIndex, 1); // 1 is the delete count, so only the id record is deleted, and not everything after the id'ed record
    return response.sendStatus(200); // Status code: Ok
});
*/

// 10. Validation

/*
    sometimes, the data you getExpectedBodyHash, is not the data you Receive
    E.g. a post request, with a body of 32 characters or less

    It is server-side validation.

    In the terminal type:
    npm i express-validator
    npm run start:dev
 */

// 11. Routers

/*
    As our application grows we can have more and more requests
    Routers help organize 'em according to their domains, e.g. '/api/users' or '/api/products'
*/

// 12. HTTP Cookies

/*
    These are small pieces of data that the webserver sends to the browser
    HTTP is stateless, meaning the server does not know who makes requests when they are made
    E.g. having a user place items in a cart, cookies are used to remember that so when the user logs out then in again, their items are still in their cart

    Lets Check for cookies:
    Go to "localhost:3000" on browser > Inspect > Application tab > Cookies
    OR
    Thunder client > GET request > Next to "Response" there should be Cookies
*/

// 13. Sessions Pt1.

/*
    Sessions represent the duration of a user on a website.
    npm i express-session
*/