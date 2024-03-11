import { Router } from 'express';
import productServices from './services';
const { getProductView, postProductView, getMenu, getListProduct, getSearch, getListProductStrict, getListProductDashboardEnsayo } = productServices;

const router = Router();

router.get('/list-product/flexible/:id/:skip/:take', getListProduct);
router.get('/list-product/strict/:id/:skip/:take', getListProductStrict);
router.get('/menu', getMenu);
router.get('/search/:search', getSearch)
router.get('/product_view', getProductView)
router.post('/product_view/:productId', postProductView)

router.get('/list-product-dashboard/:id/:entity/:type', getListProductDashboardEnsayo);


export { router };

