import { Router } from "express";
import { subcategoryCreate, subcategoryDelete, subcategoryEdit } from "./services";


const router = Router();

router.post('/create/:categoryId', subcategoryCreate);
router.put('/edit/:_id', subcategoryEdit);
router.delete('/delete/:_id', subcategoryDelete);

export { router };

