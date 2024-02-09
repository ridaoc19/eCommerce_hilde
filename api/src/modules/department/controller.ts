import { Router } from "express";
import departmentServices from './services';
const { createDepartment, updateDepartment, deleteDepartment, restoreDepartment, getDepartment } = departmentServices;

const router = Router();

router.post('/create', createDepartment);
router.put('/edit/:department_id', updateDepartment);
router.delete('/delete/:department_id', deleteDepartment);
router.put('/restore/:department_id', restoreDepartment);
router.get('/request/:search', getDepartment);

export { router };

