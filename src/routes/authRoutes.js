import express from "express";
import {  loginUser, logoutService, profile, registerUser } from "../controllers/authController.js";


const router = express.Router();


router.post('/register',registerUser)
router.get('/profile',profile)
router.post('/login',loginUser)
router.post('/logout',logoutService)




export default router
