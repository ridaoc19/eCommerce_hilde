import { Router } from "express";
import { postLogin, postPassChange, postRegistre, postLoginToken } from "./services";

const router = Router();

router.post('/', postRegistre)
router.post('/login', postLogin)
router.post('/login/token', postLoginToken)
router.post('/change', postPassChange)


export { router };
