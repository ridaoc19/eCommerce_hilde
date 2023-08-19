import { Router } from "express";
import { departmentDelete, departmentGet, departmentPost, departmentPut } from "./services";


const router = Router();

router.get('/request', departmentGet);
router.post('/create', departmentPost);
router.put('/edit/:_id', departmentPut);
router.delete('/delete/:_id', departmentDelete);

export { router };

