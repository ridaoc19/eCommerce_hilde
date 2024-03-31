import { Router } from "express";
import userServices from './services';
import { middlewareLogin } from "./tools/middlewareLogin";
const { postLoginToken, postVerifyEmail, postRegistre, postLogin, postPassChange, postReset, getAccountAdmin, postAccountInfo, postAccountPass, deleteAccountAdmin, putAccountAdmin } = userServices

const router = Router();

router.use(middlewareLogin)
router.post('/login', postLogin)
router.post('/registre', postRegistre)
router.post('/change', postPassChange)
router.post('/reset', postReset)

router.get('/accountAdmin/:email', getAccountAdmin)
router.post('/accountInfo', postAccountInfo)
router.post('/accountPass', postAccountPass)

router.put('/accountAdminPut/:user_id', putAccountAdmin)
router.delete('/accountAdmin/:_id', deleteAccountAdmin)

router.post('/token', postLoginToken)
router.post('/verify', postVerifyEmail)

export { router };

