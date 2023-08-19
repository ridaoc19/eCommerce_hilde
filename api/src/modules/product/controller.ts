import { Router } from "express";
import { uploadImages } from "../images/middleware";
import { postRegistre, productGet } from "./services";


const router = Router();
// const { upload } = uploadImages()

router.post('/registre/:subcategoryId', postRegistre);
// router.post('/registre', upload.array('images'), postRegistre);
router.get('/request', productGet);


export { router };

