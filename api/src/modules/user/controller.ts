import { Router, Request, Response } from "express";
import { postUser } from "./services";

const router = Router();

router.post('/', postUser)


export {router}