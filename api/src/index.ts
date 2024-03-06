import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 8001;

AppDataSource.initialize().then(async () => {
    console.log("Conexión base de datos exitosa")
}).catch(error => console.log(error))

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });
