import { Router } from "express";
import { postRegistre } from "./services";
import multer from 'multer';
import { uploadImages } from "../images/middleware";


const router = Router();

const { upload} = uploadImages()

// router.post('/registre', postRegistre);
router.post('/registre',upload.array('images'), postRegistre);


export { router };

