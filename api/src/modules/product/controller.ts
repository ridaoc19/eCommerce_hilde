import { Router } from "express";
import { uploadImages } from "../images/middleware";
import { getProduct, postRegistre } from "./services";


const router = Router();
const { upload } = uploadImages()

router.post('/registre', upload.array('images'), postRegistre);
router.get('/request', getProduct);


export { router };

