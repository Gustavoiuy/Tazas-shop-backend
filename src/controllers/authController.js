
import { ZodError } from 'zod';
import UserModel from '../models/userModel.js';
import {loginSchema, registerSchema} from '../schemas/UserSchema.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const registerUser = async(req,res)=>{
    try{
        const JWT_SECRET = process.env.JWT_SECRET;
       
         const {username,email,password}= registerSchema.parse(req.body)
         
        //comprobar si el usuario ya existe
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"El usuario ya existe"})
        }
        //Encriptar la contrasena
        const hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword)
        
        const isFirsUser = (await UserModel.countDocuments())===0
        //crear y guardar user en la bd
        const newUser = await UserModel.create({
            username,
            email,
            password:hashedPassword,
            isAdmin:isFirsUser,
        })
            console.log(newUser)

        //Generar un  jwt
        //payload
        const token = jwt.sign({userId:newUser._id}, JWT_SECRET,
            {expiresIn:'1h'},)
            //enviar el token como una cookie al navegador
            res.cookie('accesToken',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production', //true,
                sameSite: process.env.NODE_ENV === 'production'? 'none': 'lax',
                maxAge:60*60*1000
            })
            .status(200)
            .json({
                message:'Usuario registrado con exito!!'
            })

       
    }
    catch (error){
        res.json(error)
    }
}
// get profile user
export const profile = async(req,res)=>{
    // extract access token send client
    console.log('req.cookies',req.cookies)
    const token = req.cookies.accesToken;
    console.log('token',token)
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        if(!user){
            return res.status(404).json({message:'usuario no encontreado'});
        }
        
        res.status(200).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username 
        })
    console.log('usuario encontrado',user)
    } catch (error) {
         
          res.json(error)
        
    }
    
   
}
export const loginUser = async (req,res)=>{
    try {
         const JWT_SECRET = process.env.JWT_SECRET
    // extract email and password in the petition
    const {email,password} = loginSchema.parse(req.body)
    const user = await UserModel.findOne({email})

    if(!user ){
        return res.status(400).res({message:'Credenciales invalidas'})
    }
    //compare password
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json('credenciales invalidas')
    }

    //Generate tokje wiht jwt
    const token = jwt.sign({
        userId:user._id, username:user.username},
    JWT_SECRET,
    {
        expiresIn:'1h'
    })
    const userData = {
        id:user._id,
        username:user.username,
        email:user.email,
        isAdmin:user.isAdmin
    }
    res.cookie('accesToken',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'?'none':'lax',
        maxAge: 60*60*1000,
    })
    .status(200)
    .json(userData)

    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400)
                  .json(error.issues.map((issue)=>({message:issue.message})))
        }
        res.status(500).json({message:'Error al iniciar sesion', error:error})
    }
   
}

export const logoutService =  (req,res)=>{
    res.clearCookie('accesToken',{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV ==='production','none':'lax'
    })
    .status(200).json({
        message:'cierre de sesion exitoso'
    })
}
