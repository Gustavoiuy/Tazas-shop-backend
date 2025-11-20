import productModel from "../models/productModel.js";
import { productSchema } from "../schemas/ProductSchema.js"
import { ZodError } from "zod";

export const createProduct = async (req,res)=>{
    try {
        const {name,description,price,stock,imageUrl} = productSchema.parse(req.body)
        const product = await productModel.create({
            name,description,price,stock,imageUrl
        })
    
        return res.status(200).json({message:'producto creado exitosamente',product})
    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json(error.issues.map(issue=>({message:issue.message})))
        }
        res.status(500).json({message:'Error al crear el producto'})
    }
}

export const updateProduct = async (req,res)=>{
    try {
        //step 1- validate data with zod
        const validateData = productSchema.partial().parse(req.body)
        //step 2- find and updated product for id
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            validateData,
            {new: true, runValidators:true}
        )
        //step 3- handle case if  error product doesnt exist
        if(!updatedProduct){
            return res.status(404).json({message:'Producto no encontrado'})
        }
        //return product apdated
        
        return res.status(200).json({updatedProduct})

    } catch (error) {
        res.json({message:"Error al actualizar el prodccto"})
    }
}

export const getProductById = async (req,res)=>{
    try {
        const product = await productModel.findById(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:'Error al obtener el producto'})
    }
}

export const getAllProducts = async (req,res)=>{
    try {
        const products = await productModel.find()
        return res.status(200).json(products)
    } catch (error) {
        res.status(500)
        .json({message:"Error al obtener los productos"})
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Producto eliminado correctamente",product})
    } catch (error) {
        res.status(500).json({message:'Error al eliminar el producto'})
    }
}
