import { Router } from "express";
import { validatorsMiddlewareGlobal } from "../../core/utils/validations/validatorsMiddlewareGlobal";
import { postAccount, postLogin, postLoginToken, postPassChange, postRegistre, postReset, postVerifyEmail } from "./services";
import { middlewareLogin } from "./tools/middlewareLogin";

const router = Router();

router.use(validatorsMiddlewareGlobal)

router.post('/registre', middlewareLogin, postRegistre)
router.post('/login', middlewareLogin, postLogin)
router.post('/token', middlewareLogin, postLoginToken)
router.post('/change', middlewareLogin, postPassChange)
router.post('/reset', postReset)
router.post('/account', postAccount)
router.post('/verify', postVerifyEmail)


export { router };

