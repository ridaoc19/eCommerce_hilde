import { Router } from "express";
import userServices from './services';
import { middlewareLogin } from "./tools/middlewareLogin";
const { postLoginToken, postVerifyEmail, postRegistre, postLogin, postPassChange, postReset, getAccountAdmin, postAccountInfo, postAccountPass, deleteAccountAdmin, putAccountAdmin } = userServices
// const { createUser, updateUser, deleteUser, getUser, restoreUser } = userServices;

const router = Router();

router.use(middlewareLogin)
router.post('/login', postLogin)
router.post('/registre', postRegistre)
router.post('/change', postPassChange)
router.post('/reset', postReset)

router.get('/accountAdmin', getAccountAdmin)
router.post('/accountInfo', postAccountInfo)
router.post('/accountPass', postAccountPass)

router.delete('/accountAdmin/:_id', deleteAccountAdmin)
router.put('/accountAdmin', putAccountAdmin)

router.post('/token', postLoginToken)
router.post('/verify', postVerifyEmail)


// router.post('/create', createUser);
// router.put('/edit/:user_id', updateUser);
// router.delete('/delete/:user_id', deleteUser);
// router.post('/restore/:user_id', restoreUser);
// router.get('/request/:user_id', getUser);


export { router };

