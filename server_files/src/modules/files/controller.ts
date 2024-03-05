import { Router } from "express";
import filesServices from './services';
const { imagesCreateAndDelete, downloadImages, searchImages, requestFiles, addSelected } = filesServices;

const router = Router();

router.post('/create-delete', imagesCreateAndDelete);
router.post('/add-selected', addSelected);
router.get('/request', requestFiles)
router.get('/download', downloadImages)
router.get('/search', searchImages)

export { router };

