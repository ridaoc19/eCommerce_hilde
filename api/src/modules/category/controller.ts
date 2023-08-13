import { Router } from "express";
import { postRegistre } from "./services";


const router = Router();

router.post('/registre/:departmentId', postRegistre);

export { router };

