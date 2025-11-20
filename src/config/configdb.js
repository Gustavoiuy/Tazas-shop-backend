import  { connect } from "mongoose";

export const conectDB = async () => {
    try {
        const dbURI = process.env.MONGO_DB_URI;
        
        
          await connect(dbURI);
          
        }
          catch (error){
         
    }
    
    }

  
