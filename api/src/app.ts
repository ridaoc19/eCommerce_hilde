import cors from "cors";
import 'dotenv/config';
import express from "express";
import morgan from 'morgan';
import filesMiddleware from "./core/utils/middleware/files";
import { uploadImages } from "./modules/developer/middleware";
import routes from './routes';
const { upload } = uploadImages()

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())
app.use('/uploads', express.static('uploads')); //para mostrar las imágenes

app.use(upload.array('files')) // manipulación de imágenes
// app.use(validatorsMiddlewareGlobal)
app.use(filesMiddleware) // limpiar imágenes


app.use("/", routes)

export default app 