export interface CreateProduct {
  productName: string;
  price: number;
  storeId: number;
}

export interface CreateProductForm {
  productName: string;
  price: string;
  storeId: string;
}

export interface Product {
  id: number;
  productName: string;
  price: number;
  storeId: number;
}

export interface updateProductForm{
  id: string;
  productName: string;
  price: string;
  storeId: string;
}

export interface editProduct{
  productName: string;
  price: number;
  storeId: number;
}