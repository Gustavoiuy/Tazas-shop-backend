import mongoose, { connect } from "mongoose";

export const conectDB = async () => {
    try {
        const dbURI = process.env.MONGO_DB_URI;
        
        console.log("URI:", dbURI);
          await connect(dbURI);
          
        }
          catch (error){
            console.error("Database connection error:", error);
    }
    
    }

    export const disconnectDB = async () => {
        try {
            await mongoose.disconnect();    
            console.log("Database disconnected successfully");
        } catch (error) {
            console.error("Database disconnection error:", error);
        }
    };

