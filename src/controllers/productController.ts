import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../assets/data.json');

interface Product {
  name: string;
  brand: string;
  stock: string;
  batch: string;
  expiration: string;
  discount: string;
  id: string;
}

const readProducts = (): Product[] => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

const writeProducts = (products: Product[]): void => {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
};

export const createProduct = (req: Request, res: Response): void => {
  const products = readProducts();
  const newProduct: Product = { ...req.body, id: (products.length + 1).toString() };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
};

export const getAllProducts = (req: Request, res: Response): void => {
  const products = readProducts();
  res.json(products);
};

export const getProductById = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(product);
};

export const updateProductById = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  writeProducts(products);
  return res.json(products[index]);
};

export const patchProductById = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  writeProducts(products);
  return res.json(products[index]);
};

export const deleteProductById = (req: Request, res: Response): Response<any, Record<string, any>> => {
  let products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products = products.filter(p => p.id !== req.params.id);
  writeProducts(products);
  return res.status(204).send();
};

export const queryProducts = (req: Request, res: Response): void => {
  const products = readProducts();
  const { brand, stockover, stockbelow, discountover, discountbelow, expireover, expirebelow } = req.query;

  let result = products;

  if (brand) {
    result = result.filter(p => p.brand.toLowerCase() === (brand as string).toLowerCase());
  }
  if (stockover) {
    result = result.filter(p => parseInt(p.stock) >= parseInt(stockover as string));
  }
  if (stockbelow) {
    result = result.filter(p => parseInt(p.stock) <= parseInt(stockbelow as string));
  }
  if (discountover) {
    result = result.filter(p => parseInt(p.discount) >= parseInt(discountover as string));
  }
  if (discountbelow) {
    result = result.filter(p => parseInt(p.discount) <= parseInt(discountbelow as string));
  }
  if (expireover) {
    result = result.filter(p => new Date(p.expiration) >= new Date(expireover as string));
  }
  if (expirebelow) {
    result = result.filter(p => new Date(p.expiration) <= new Date(expirebelow as string));
  }

  res.json(result);
};
