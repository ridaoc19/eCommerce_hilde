import { Router } from "express";
import userServices from './services';
import { middlewareLogin } from "./tools/middlewareLogin";
const { postRegistre, postLogin, postPassChange, postReset } = userServices
// const { createUser, updateUser, deleteUser, getUser, restoreUser } = userServices;

const router = Router();

router.use(middlewareLogin)
router.post('/login', postLogin)
router.post('/registre', postRegistre)
router.post('/change', postPassChange)
router.post('/reset', postReset)




// router.post('/create', createUser);
// router.put('/edit/:user_id', updateUser);
// router.delete('/delete/:user_id', deleteUser);
// router.post('/restore/:user_id', restoreUser);
// router.get('/request/:user_id', getUser);


export { router };

