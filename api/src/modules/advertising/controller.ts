import { Router } from "express";
import departmentServices from './services';
const { createAdvertising, updateAdvertising, deleteAdvertising, getAdvertising } = departmentServices;

const router = Router();

router.post('/create', createAdvertising);
router.get('/request', getAdvertising);
router.put('/edit/:advertising_id', updateAdvertising);
router.delete('/delete', deleteAdvertising);
// router.put('/restore', restoreAdvertising);

export { router };

