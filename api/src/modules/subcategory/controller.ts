import { Router } from 'express';
import subcategoryServices from './services';
const { createSubcategory, updateSubcategory, deleteSubcategory, getSubcategory } = subcategoryServices;

const router = Router();

router.post('/create/:category_id', createSubcategory);
router.put('/edit/:subcategory_id', updateSubcategory);
router.delete('/delete/:subcategory_id', deleteSubcategory);
router.get('/request/:subcategory_id', getSubcategory);

export { router };
