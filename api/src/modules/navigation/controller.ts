import { Router } from 'express';
import productServices from './services';
const { getMenu, getListProduct } = productServices;

const router = Router();

router.get('/list-product/:id/:skip/:take', getListProduct);
router.get('/menu', getMenu);

export { router };

