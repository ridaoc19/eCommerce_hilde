import { Router } from "express";
import { postLogin, postPassChange, postRegistre, postLoginToken, postReset, postAccount, postVerifyEmail } from "./services";

const router = Router();

router.post('/registre', postRegistre)
router.post('/login', postLogin)
router.post('/token', postLoginToken)
router.post('/change', postPassChange)
router.post('/reset', postReset)
router.post('/account', postAccount)
router.post('/verify', postVerifyEmail)


export { router };
