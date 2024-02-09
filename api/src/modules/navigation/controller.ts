import { Router } from 'express';
import productServices from './services';
const { getMenu, getListProduct, getSearch, getListProductStrict, getListProductDashboardEnsayo } = productServices;

const router = Router();

router.get('/list-product/flexible/:id/:skip/:take', getListProduct);
router.get('/list-product/strict/:id/:skip/:take', getListProductStrict);
router.get('/menu', getMenu);
router.get('/search/:search', getSearch)

router.get('/list-product-dashboard/:id/:entity/:type', getListProductDashboardEnsayo);


export { router };

