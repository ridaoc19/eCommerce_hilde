
import app from "./app";
import { dbConnect } from "./core/db/mongo";
// import sequelize from "./src/core/database/db.js";



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });
dbConnect().then(() => console.log("Conexion base datos")).catch(error => console.log("Se ha producido un error en db", error))

