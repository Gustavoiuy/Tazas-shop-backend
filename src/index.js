import app from './app.js'
import { conectDB, disconnectDB } from "./config/configdb.js";
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT

const startServer = async ()=>{
    try {
        await conectDB();
        console.log('Conexion a la base de datos establecida');
        app.listen(PORT,()=>{
            console.log(`Servidor corriendo en el puerto'${PORT}`)
        })
    } catch (error) {
        console.log('Error critoco al iniciar el servidort')
        procces.exit(1)
        disconnectDB();   
    }
}
startServer();