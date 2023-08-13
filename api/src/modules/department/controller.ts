import { Router } from "express";
import { postRegistre } from "./services";


const router = Router();

router.post('/registre', postRegistre);

export { router };

