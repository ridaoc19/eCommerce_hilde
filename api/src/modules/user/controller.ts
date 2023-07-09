import { Router, Request, Response } from "express";
import { postUser } from "./services";

const router = Router();

router.get('/', postUser)


export {router}