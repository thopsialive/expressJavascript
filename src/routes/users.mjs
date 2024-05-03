// 11. Routers
/*
    Router is an mini-app in the express app, that can group together all http requests
*/

import { Router } from "express";
import { query } from "express-validator";

const router = Router();

router.get("/api/users", 
    query('filter')
        .isString().withMessage('Must be a string input')
        .notEmpty().withMessage('Must not be empty')
        .isLength({ min: 3, max: 10})
        .withMessage('Must be at within 3-10 characters'), 
    (request, response) => {
        const result = validationResult(request);
        console.log(result);
        const {filter, value} = request.query
        if (filter && value) {
            return response.send(
                mockUsers.filter((user) => user[filter].includes(value))
            );
        } else {
            return response.send(mockUsers);
        }
    }
);

export default usersRouter;