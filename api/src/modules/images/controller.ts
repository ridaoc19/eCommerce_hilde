import { Router } from "express";
import { uploadImages } from "./middleware";
import { postRegistre } from "./services";


const router = Router();
const { upload } = uploadImages()

router.post('/registre', upload.single('images'), postRegistre);

export { router };

