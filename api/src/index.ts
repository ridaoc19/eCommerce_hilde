import app from "./app";
import { AppDataSource } from "./core/db/postgres";
import { checkFolderAccess } from "./modules/developer/middleware";

const PORT = process.env.PORT || 3000;

checkFolderAccess({ folderPath: './uploads' }).catch(err => console.log({err: `erro al crear la carpeta ${err}`}))
AppDataSource.initialize().then(async () => {

    
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    console.log("Conexión base de datos exitosa")
}).catch(error => console.log(error))


app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });
