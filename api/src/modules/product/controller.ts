import { Router } from "express";
import { uploadImages } from "../images/middleware";
import { postCreate, productGet } from "./services";


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
router.post('/create/:subcategoryId', postCreate);
// router.post('/create', postRegistre);
router.get('/request', productGet);


export { router };

