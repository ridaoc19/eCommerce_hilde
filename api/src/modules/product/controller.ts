import { Router } from "express";
import { postCreate, productDelete, productEdit, productGet } from "./services";


const router = Router();

router.get('/request', productGet);
router.post('/create/:subcategoryId', postCreate);
router.put('/edit/:productId', productEdit)
router.delete('/delete/:productsId', productDelete);


export { router };

