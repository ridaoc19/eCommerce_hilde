import { Router } from "express";
import { categoryCreate, categoryDelete, categoryEdit } from "./services";


const router = Router();

// router.get('/request', departmentGet);
router.post('/create/:departmentId', categoryCreate);
router.put('/edit/:_id', categoryEdit);
router.delete('/delete/:categoriesId', categoryDelete);

export { router };

