import { Router } from "express";
import departmentServices from './services';
const { createDepartment, updateDepartment, deleteDepartment, getDepartment, restoreDepartment } = departmentServices;

const router = Router();

router.post('/create', createDepartment);
router.get('/request/:department_id', getDepartment);
router.put('/edit/:department_id', updateDepartment);
router.delete('/delete/:department_id', deleteDepartment);
router.put('/restore/:department_id', restoreDepartment);

export { router };

