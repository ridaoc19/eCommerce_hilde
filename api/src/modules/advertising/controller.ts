import { Router } from "express";
import departmentServices from './services';
import { uploadImages } from "../developer/middleware";
const { createAdvertising, updateAdvertising, getAdvertising } = departmentServices;

const router = Router();
const { upload } = uploadImages()

router.post('/create', upload.array('images'), createAdvertising);
router.get('/request', getAdvertising);
router.put('/edit/:advertising_id', updateAdvertising);
// router.delete('/delete', deleteAdvertising);
// router.put('/restore', restoreAdvertising);

export { router };

