import { Router } from "express";
import filesServices from './services';
const { imagesCreateAndDelete, downloadImages, searchImages } = filesServices;

const router = Router();

router.post('/', imagesCreateAndDelete);
router.get('/download', downloadImages)
router.get('/search', searchImages)

export { router };

