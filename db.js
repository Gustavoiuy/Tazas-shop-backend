import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✔ necesario para que Jest cargue .env.test

export const conectDB = async () => {
  const uri = process.env.MONGODB_TEST_URI;
 

  try {
    await mongoose.connect(uri);
    
  } catch (error) {
   
    throw error;
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();

};
