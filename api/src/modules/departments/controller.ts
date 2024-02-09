import { Router } from "express";
import departmentServices from './services';
const { createDepartment, updateDepartment, deleteDepartment, restoreDepartment } = departmentServices;

const router = Router();

router.post('/create', createDepartment);
router.put('/edit/:department_id', updateDepartment);
router.delete('/delete/:department_id', deleteDepartment);
router.put('/restore/:department_id', restoreDepartment);
// router.get('/request/:department_id', getDepartment);

export { router };

