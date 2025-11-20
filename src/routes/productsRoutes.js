import express from "express";
import { createProduct, getProductById, updateProduct,getAllProducts,deleteProduct } from "../controllers/productController.js";

const router = express.Router()
// Routes publics
router.get('/',getAllProducts)

router.get('/:id',getProductById)



//routes protected
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

export default router