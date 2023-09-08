import { Router } from "express";
import { uploadImages } from "./middleware";
import { imageCreate, imageDelete, imageEdit } from "./services";


const router = Router();
const { upload } = uploadImages()

router.post('/create', upload.single('image'), imageCreate);
router.put('/edit/:imageId', upload.single('image'), imageEdit);
router.delete('/delete/:imageId', imageDelete);

export { router };

