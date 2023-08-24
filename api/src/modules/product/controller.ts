import { Router } from "express";
import { uploadImages } from "../images/middleware";
import { postRegistre, productGet } from "./services";
import multer from "multer";
import path from "path";


const router = Router();
const { upload } = uploadImages()


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   },
// });
// const upload = multer({ storage });

// router.post('/create/:subcategoryId', upload.array(`images`), postRegistre);
// router.post('/registre/:subcategoryId', postRegistre);
router.post('/create', upload.array('images'), postRegistre);
router.get('/request', productGet);


export { router };

