import { Router } from "express";
import departmentServices from './services';
const { loadBackup, clearEnsayo } = departmentServices;

const router = Router();

router.post('/upload', loadBackup);
router.get('/ensayo', clearEnsayo)

export { router };

