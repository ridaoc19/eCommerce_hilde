import cors from "cors";
import 'dotenv/config';
import express from "express";
import morgan from 'morgan';
import { validatorsMiddlewareGlobal } from './core/utils/validations/validatorsMiddlewareGlobal';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(cors())

app.use(validatorsMiddlewareGlobal)

app.use("/", routes)

export default app 