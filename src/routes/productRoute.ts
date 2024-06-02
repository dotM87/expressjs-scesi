import express, { Request, Response } from 'express';
const productRoute = express.Router();
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  patchProductById,
  deleteProductById,
  queryProducts
} from '@/controllers/productController';

productRoute.post('/', createProduct);
productRoute.get('/', queryProducts);
productRoute.get('/:id', getProductById);
productRoute.put('/:id', updateProductById);
productRoute.patch('/:id', patchProductById);
productRoute.delete('/:id', deleteProductById);

export default productRoute;
