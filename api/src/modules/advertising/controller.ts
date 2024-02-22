import { Router } from "express";
import departmentServices from './services';
const { createAdvertising, updateAdvertising, getAdvertising, deleteAdvertising } = departmentServices;

const router = Router();
// const { upload } = uploadImages()

router.post('/create', createAdvertising);
// router.post('/create', upload.array('images'), createAdvertising);
router.get('/request', getAdvertising);
router.put('/edit/:advertising_id', updateAdvertising);
router.delete('/delete/:advertising_id', deleteAdvertising);
// router.put('/restore', restoreAdvertising);

export { router };

