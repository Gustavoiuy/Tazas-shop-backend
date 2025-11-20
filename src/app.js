import cors from 'cors';
import express from "express";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js"
const app = express();


//config cors
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'cookie', 'set-Cookie'],
    credentials: true
};
app.use(cors(corsOptions));

// Globals Middlewares
app.use(express.json());
app.use(cookieParser());

// --- rutas Definitions API ---
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/products',productsRoutes)


// Not found routes(404)
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
   
