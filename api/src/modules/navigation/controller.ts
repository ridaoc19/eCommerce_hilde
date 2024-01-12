import { Router } from 'express';
import productServices from './services';
const { getMenu, getListProduct, getSearch } = productServices;

const router = Router();

router.get('/list-product/:id/:skip/:take', getListProduct);
router.get('/menu', getMenu);
router.get('/search/:search', getSearch)

export { router };

