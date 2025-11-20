import app from './app.js';
import { conectDB,  } from "./config/configdb.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

export const startServer = async () => {
  try {
    await conectDB();
    

    return app.listen(PORT, () => {
     
    });

  } catch (error) {
    
    process.exit(1);
  }
};

// Solo arrancar si NO estamos en test
if (process.env.NODE_ENV !== "test") {
  startServer();
}
