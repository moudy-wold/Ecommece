import axios from "./axios";
import { AxiosResponse } from "axios";

export type Product = {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};
// FOR ADMINS

export async function GetAllProducts(): Promise<AxiosResponse<Product[]>> {
  return await axios.get("/products");
}

export async function AddProduct(data: any): Promise<AxiosResponse<string>> {
  return await axios.post(`/products`, data);
}

export async function GetProductById(
  id: string | string[]
): Promise<AxiosResponse<Product>> {
  return await axios.get(`/products/${id}`);
}

export async function EditProductById(
  id: string | string[],
  data: any
): Promise<AxiosResponse<string>> {
  return await axios.put(`/products/${id}`, data);
}

export async function DeleteProductById(
  id: string
): Promise<AxiosResponse<string>> {
  return await axios.delete(`/products/${id}`);
}

export async function GetProductsByCategory(
  id: string | null | number,
  page?: number
): Promise<AxiosResponse<Product[]>> {
  return await axios.get(`/products?categoryId=${id}`);
}
