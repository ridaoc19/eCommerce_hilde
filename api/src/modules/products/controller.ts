import { Router } from 'express';
import productServices from './services';
const { createProduct, updateProduct, deleteProduct, getProduct } = productServices;

const router = Router();

router.post('/create/:subcategory_id', createProduct);
router.put('/edit/:product_id', updateProduct);
router.delete('/delete/:product_id', deleteProduct);
router.get('/request/:product_id', getProduct);

export { router };
