import * as cors from "cors";
import 'dotenv/config';
import * as express from "express";
import * as morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(cors())


app.use("/", routes)

export default app 