import axios from "./axios";
import { AxiosResponse } from "axios";

export type Category = {
  _id: string;
  name: string;
  title: any;
  comparison: string;
};
// FOR ADMINS

export async function GetAllProducts(): Promise<AxiosResponse<any>> {
  return await axios.get("/products");
}

export async function AddProduct(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/products`, data);
}
 

export async function GetProductById(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/products/show/${id}`);
}

export async function EditProductById(
  id: string | string[],
  data: FormData
): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/products/update/${id}`, data);
}

export async function DeleteProductById(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.delete(`/products/${id}`);
}

export async function GetProductsByCategory(
  id: string | null | number,
  page?: number
): Promise<AxiosResponse<any>> {
  return await axios.get(`/products?categoryId=${id}`);
}
