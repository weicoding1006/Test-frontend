export interface Product {
  id: number;
  productName: string;
  price: number;
  storeId: number;
}

export interface UpdateProductForm{
  id: string;
  productName: string;
  price: string;
  storeId: string;
}

export interface EditProduct{
  productName: string;
  price: number;
  storeId: number;
}

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