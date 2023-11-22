import { Router } from "express";
import { getAccountAdmin, postAccountInfo, postAccountPass, postLogin, postLoginToken, postPassChange, postRegistre, postReset, postVerifyEmail, putAccountAdmin } from "./services";
import { middlewareLogin } from "./tools/middlewareLogin";

const router = Router();

router.use(middlewareLogin)

router.get('/accountAdmin', getAccountAdmin)
router.put('/accountAdmin', putAccountAdmin)
router.post('/registre', postRegistre)
router.post('/login', postLogin)
router.post('/token', postLoginToken)
router.post('/change', postPassChange)
router.post('/reset', postReset)
router.post('/accountInfo', postAccountInfo)
router.post('/accountPass', postAccountPass)
router.post('/verify', postVerifyEmail)


export { router };

