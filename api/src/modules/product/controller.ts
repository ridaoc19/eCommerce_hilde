import { Router } from "express";
import { postCreate, productDelete, productEdit, productEntry, productGet } from "./services";

const router = Router();

router.get('/request', productGet);
router.post('/create/:subcategoryId', postCreate);
router.put('/edit/:productId', productEdit)
router.delete('/delete/:productsId', productDelete);

router.put('/entry', productEntry)


export { router };

