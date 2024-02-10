import { Router } from "express";
import categoryServices from './services';
const { createCategory, updateCategory, deleteCategory, getCategory } = categoryServices;

const router = Router();

router.post('/create/:department_id', createCategory);
router.put('/edit/:category_id', updateCategory);
router.delete('/delete/:category_id', deleteCategory);
router.get('/request/:category_id', getCategory);

export { router };

