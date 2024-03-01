import app from "./app";
// import { AppDataSource } from "./data-source";
import { checkFolderAccess } from "./modules/files/services";

const PORT = process.env.PORT || 8005;

checkFolderAccess({ folderPath: './files' }).catch(err => console.log({ err: `erro al crear la carpeta ${err}` }))

// AppDataSource.initialize().then(async () => {
//     console.log("Conexión base de datos exitosa")
// }).catch(error => console.log(error))

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });
