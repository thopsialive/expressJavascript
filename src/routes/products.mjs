// 11.3 Products Router
import { Router } from "express";

const router = Router();

router.get('/api/products', (request, response) => {
    response.send([
        {id: 1, name: "chocolate coated almonds", unitPrice: "10.95"},
        {id: 2, name: "biltong", unitPrice: "32.95"},
        {id: 3, name: "dried fruit", unitPrice: "18.95"}]);
});


export default router;