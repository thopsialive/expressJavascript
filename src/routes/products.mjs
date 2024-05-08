// 11.3 Products Router
import { Router } from "express";

const router = Router();

router.get('/api/products', (request, response) => {
    // 12.2 Using the cookie in browser
    console.log(request.headers.cookie); //OUTPUT: "cookieName=chocolate" as a single string, need a cookie parser
    // "npm i cookie-parser" in terminal
    console.log(request.cookies); //OUTPUT: "{ cookieName: 'chocolate' }" properly parsed

    //12.3 Signed Cookies
    console.log(request.signedCookies); //OUTPUT: 'cookieName=s%3Achocolate.NQiiqUlnt%2BvEsaWFJ...' is a signed cookie
    //console.log(request.signedCookies.cookieName); //OUTPUT: 'chocolate'

    //lets assume we need a specific cookie for products to be returned"
//    if (request.cookies.cookieName && request.cookies.cookieName === "chocolate")
    if (request.signedCookies.cookieName && request.signedCookies.cookieName === "chocolate")
        return response.send([
            {id: 1, name: "chocolate coated almonds", unitPrice: "10.95"},
            {id: 2, name: "biltong", unitPrice: "32.95"},
            {id: 3, name: "dried fruit", unitPrice: "18.95"}]);
    return response.status(403).send( {msg:"Sorry you need the correct cookie. It might've expired."})
});


export default router;