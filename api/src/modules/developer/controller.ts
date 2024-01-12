import { Router } from "express";
import departmentServices from './services';
const { loadBackup } = departmentServices;

const router = Router();

router.post('/upload', loadBackup);


export { router };

