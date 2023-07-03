import 'dotenv/config';
import express from "express";
import morgan from 'morgan';
import cors from "cors";
import { router } from './router';

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())
app.use(router)

// app.use("/", import("./routes.js"))


export default app 