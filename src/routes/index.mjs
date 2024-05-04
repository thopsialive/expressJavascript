// 11.4 Barrel Routers File
// this is useful if you have many routes
import { Router } from "express";
import usersRouter from "./users.mjs"
import productsRouter from "./products.mjs"

const router = Router();

router.use(usersRouter);
router.use(productsRouter);

export default router;