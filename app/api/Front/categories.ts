import axios from "./axios";
import { AxiosResponse } from "axios";
import { Product } from "./products";

type Category = {
  _id: string;
  name: string;
  products: Product[];
};

export async function GetAllCategories(): Promise<AxiosResponse<Category>> {
  return await axios.get("/category");
}
